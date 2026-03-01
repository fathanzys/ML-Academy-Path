import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, Lightbulb, Link as LinkIcon, Microscope, HelpCircle, ChevronRight, ChevronLeft, Home } from "lucide-react";
import curriculumData from "@/data/curriculum.json";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import InteractiveVisualization from "./InteractiveVisualization";

// Dynamic SEO metadata per module
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const moduleData = curriculumData.modul.find(m => m.id === id);
    if (!moduleData) return { title: "Modul Tidak Ditemukan" };
    return {
        title: `${moduleData.judul} — AI Curriculum`,
        description: moduleData.objektif,
    };
}

// Text formatter to parse LaTeX, bold text, lists, and keterangan
function FormattedText({ text, variant = 'default' }: { text: string; variant?: 'default' | 'technical' }) {
    if (!text) return null;

    // Split by $$ ... $$ for block math
    const blockParts = text.split(/(\$\$[\s\S]*?\$\$)/g);

    return (
        <>
            {blockParts.map((part, i) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    const rawFormula = part.slice(2, -2).trim();
                    return (
                        <div key={i} className="my-6 mx-auto max-w-full">
                            <div className="relative p-6 bg-gradient-to-br from-violet-950/50 via-[#0c0a1a] to-indigo-950/40 rounded-2xl border border-violet-500/25 shadow-[0_0_30px_rgba(139,92,246,0.08)] overflow-x-auto">
                                <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-400/60 select-none">
                                    📐 Rumus
                                </div>
                                <div className="text-center pt-3 pb-1">
                                    <BlockMath math={rawFormula} />
                                </div>
                            </div>
                        </div>
                    );
                }

                // For non-formula text: split by newlines first to handle paragraphs & lists
                return <TextBlock key={i} text={part} variant={variant} />;
            })}
        </>
    );
}

// Renders a block of text with newline handling, bullet lists, and inline math/bold
function TextBlock({ text, variant }: { text: string; variant: 'default' | 'technical' }) {
    if (!text || !text.trim()) return null;

    // Protect inline math $...$ from newline split breaking LaTeX commands like \nabla
    const mathMap: string[] = [];
    const safe = text.replace(/\$[^$]+\$/g, (m) => {
        mathMap.push(m);
        return `\x00M${mathMap.length - 1}\x00`;
    });

    // Split by literal \n (JSON escaped newline) and real newlines
    const splitLines = safe.split(/\\n|\n/g);

    // Restore math placeholders in each line
    const lines = splitLines.map(l =>
        l.replace(/\x00M(\d+)\x00/g, (_, i) => mathMap[parseInt(i)])
    );

    // Group consecutive list items and regular lines
    const groups: { type: 'p' | 'list' | 'kh'; content: string[] }[] = [];

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        const isKH = /^Keterangan\s*[:：]/i.test(line);
        const isLI = /^[-–•]\s+/.test(line) || /^\d+[.)]\s+/.test(line);

        if (isKH) {
            groups.push({ type: 'kh', content: [line] });
        } else if (isLI) {
            const cleaned = line.replace(/^[-–•]\s+/, '').replace(/^\d+[.)]\s+/, '');
            const last = groups[groups.length - 1];
            if (last && last.type === 'list') last.content.push(cleaned);
            else groups.push({ type: 'list', content: [cleaned] });
        } else {
            const last = groups[groups.length - 1];
            if (last && last.type === 'p') last.content.push(line);
            else groups.push({ type: 'p', content: [line] });
        }
    }

    return (
        <>
            {groups.map((group, gi) => {
                if (group.type === 'kh') {
                    return (
                        <div key={gi} className="mt-4 mb-2 text-xs font-mono uppercase tracking-[0.15em] text-violet-400/80 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-violet-500/40" />
                            📝 {group.content[0].replace(/[:：]/, '').trim()}
                        </div>
                    );
                }
                if (group.type === 'list') {
                    return (
                        <div key={gi} className="my-3 space-y-2.5 pl-1" role="list">
                            {group.content.map((item, li) => (
                                <div key={li} className="flex items-start gap-3 text-gray-300" role="listitem">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400/70 flex-shrink-0" />
                                    <span className="leading-relaxed">
                                        <InlineFormatted text={item} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    );
                }
                return (
                    <span key={gi}>
                        {group.content.map((line, li) => (
                            <span key={li}>
                                {li > 0 && <br />}
                                <InlineFormatted text={line} />
                            </span>
                        ))}
                    </span>
                );
            })}
        </>
    );
}

// Renders inline text with $...$ math and **bold** / *italic* formatting
function InlineFormatted({ text }: { text: string }) {
    const inlineParts = text.split(/(\$[\s\S]*?\$)/g);
    return (
        <>
            {inlineParts.map((inlinePart, j) => {
                if (inlinePart.startsWith('$') && inlinePart.endsWith('$') && inlinePart.length > 2) {
                    return (
                        <span key={j} className="inline-flex items-baseline mx-0.5 px-1.5 py-0.5 bg-blue-500/10 rounded-md border border-blue-500/15 text-blue-200">
                            <InlineMath math={inlinePart.slice(1, -1)} />
                        </span>
                    );
                }
                // Bold **text**
                const boldParts = inlinePart.split(/(\*\*[\s\S]*?\*\*)/g);
                return (
                    <span key={j}>
                        {boldParts.map((bPart, k) => {
                            if (bPart.startsWith('**') && bPart.endsWith('**')) {
                                return <strong key={k} className="text-white font-semibold">{bPart.slice(2, -2)}</strong>;
                            }
                            // Single *text* as emphasis
                            const singleStarParts = bPart.split(/(\*[\s\S]*?\*)/g);
                            return (
                                <span key={k}>
                                    {singleStarParts.map((sPart, l) => {
                                        if (sPart.startsWith('*') && sPart.endsWith('*') && sPart.length > 2) {
                                            return <strong key={l} className="text-white font-semibold">{sPart.slice(1, -1)}</strong>;
                                        }
                                        // Handle backtick code spans
                                        const codeParts = sPart.split(/(`[^`]+`)/g);
                                        return (
                                            <span key={l}>
                                                {codeParts.map((cPart, m) => {
                                                    if (cPart.startsWith('`') && cPart.endsWith('`')) {
                                                        return <code key={m} className="px-1.5 py-0.5 bg-white/5 rounded text-violet-300 text-[0.9em] font-mono border border-white/5">{cPart.slice(1, -1)}</code>;
                                                    }
                                                    return <span key={m}>{cPart}</span>;
                                                })}
                                            </span>
                                        );
                                    })}
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </>
    );
}

export default async function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const allModules = curriculumData.modul;
    const currentIdx = allModules.findIndex(m => m.id === id);
    const moduleData = currentIdx !== -1 ? allModules[currentIdx] : null;
    const rumpunData = moduleData ? curriculumData.rumpun.find(r => r.id === moduleData.rumpun_id) : null;
    const prevModule = currentIdx > 0 ? allModules[currentIdx - 1] : null;
    const nextModule = currentIdx < allModules.length - 1 ? allModules[currentIdx + 1] : null;

    if (!moduleData || !rumpunData) {
        notFound();
    }

    return (
        <div className="w-full pb-24 pt-8 max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" /> Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <Link href="/modules" className="hover:text-white transition-colors">Materi Belajar</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-violet-400">{rumpunData.nama}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-gray-300">Modul {moduleData.nomor}</span>
            </nav>

            {/* Header Section */}
            <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-mono rounded-full border border-violet-500/20">
                        MODUL {moduleData.nomor}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded-full border border-blue-500/20">
                        {rumpunData.nama}
                    </span>
                    <span className={`px-3 py-1 text-xs font-mono rounded-full border ${moduleData.kesulitan.includes("Mudah") ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        moduleData.kesulitan.includes("Menengah") ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                        Tingkat: {moduleData.kesulitan.replace(/🟢|🟡|🔴/g, '').trim()}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{moduleData.judul}</h1>
                <div className="p-6 glass-card border-violet-500/20 bg-violet-500/5">
                    <h3 className="flex items-center text-lg font-semibold text-violet-300 mb-2">
                        <CheckCircle className="w-5 h-5 mr-2" /> Objektif Belajar
                    </h3>
                    <div className="text-gray-300"><FormattedText text={moduleData.objektif} /></div>
                </div>
            </header>

            {/* Topics & Content Section (Expanded) */}
            <section className="mb-16 space-y-12">
                <h2 className="text-3xl font-bold flex items-center border-b border-white/10 pb-4">
                    <BookOpen className="w-8 h-8 mr-4 text-blue-400" /> Materi Pembahasan
                </h2>

                {moduleData.materi_detail ? (
                    <div className="space-y-10">
                        {moduleData.materi_detail.map((materi: any, idx: number) => (
                            <div key={idx}>
                                <div className="glass-card border-white/[0.06] bg-white/[0.01] p-6 md:p-8 space-y-6">
                                    {/* Section Title */}
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600/30 to-indigo-600/30 text-violet-300 flex items-center justify-center text-sm font-bold border border-violet-500/30 shadow-lg shadow-violet-500/5">
                                            {idx + 1}
                                        </span>
                                        {materi.judul}
                                    </h3>

                                    {/* Image */}
                                    {materi.image && (
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl object-cover relative h-64 md:h-96">
                                            <img
                                                src={materi.image}
                                                alt={materi.judul}
                                                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />
                                        </div>
                                    )}

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Main Content Column */}
                                        <div className="lg:col-span-2 space-y-6">
                                            {/* Penjelasan Awam */}
                                            <div>
                                                <h4 className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-[0.15em] flex items-center gap-2">
                                                    <span className="w-3 h-[2px] bg-cyan-500/40" />
                                                    Penjelasan Awam
                                                </h4>
                                                <div className="text-gray-300 leading-relaxed text-[15px]">
                                                    <FormattedText text={materi.penjelasan_awam} />
                                                </div>
                                            </div>

                                            {/* Detail Teknis & Rumus */}
                                            {(materi.penjelasan_teknis || materi.detail_teknis || materi.detail_teknis_rumus) && (
                                                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/15 to-indigo-900/10 border border-violet-500/15 backdrop-blur-sm">
                                                    <h4 className="text-xs font-mono text-violet-400 mb-4 uppercase tracking-[0.15em] flex items-center gap-2">
                                                        <Microscope className="w-4 h-4" />
                                                        Detail Teknis & Rumus
                                                    </h4>
                                                    <div className="text-gray-300 leading-[1.85] text-[15px]">
                                                        <FormattedText text={materi.penjelasan_teknis || materi.detail_teknis || materi.detail_teknis_rumus} variant="technical" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sidebar Column */}
                                        <div className="space-y-5">
                                            {materi.analogi && (
                                                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/15">
                                                    <h4 className="text-xs font-bold text-amber-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                                        💡 Analogi
                                                    </h4>
                                                    <div className="text-amber-200/70 text-sm leading-relaxed italic">
                                                        &ldquo;<FormattedText text={materi.analogi} />&rdquo;
                                                    </div>
                                                </div>
                                            )}

                                            {materi.contoh_nyata && (
                                                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/15">
                                                    <h4 className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                                        🌍 Contoh Nyata
                                                    </h4>
                                                    <div className="text-emerald-200/70 text-sm leading-relaxed">
                                                        <FormattedText text={materi.contoh_nyata} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider between sections */}
                                {idx < moduleData.materi_detail.length - 1 && (
                                    <div className="flex items-center justify-center my-4">
                                        <div className="w-1 h-1 rounded-full bg-violet-500/30" />
                                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent mx-2" />
                                        <div className="w-1 h-1 rounded-full bg-violet-500/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {moduleData.topik.map((t: string, idx: number) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <div className="text-gray-200 pt-1">{t}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Interactive Visualization Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold flex items-center border-b border-white/10 pb-4 mb-6">
                    <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" /> Visualisasi Interaktif
                </h2>
                <InteractiveVisualization moduleId={moduleData.id} description={moduleData.visualisasi_interaktif} />
            </section>

            {/* Academic Citations Section */}
            <section className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-2xl font-bold flex items-center mb-6">
                    <Microscope className="w-6 h-6 mr-3 text-fuchsia-400" /> Sitasi Akademik Modul
                </h2>
                <div className="space-y-4">
                    {moduleData.references.map((ref, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="bg-fuchsia-500/20 text-fuchsia-300 text-xs font-mono font-bold px-2 py-1 rounded mt-1 whitespace-nowrap">
                                    {ref.kode}
                                </div>
                                <div>
                                    <p className="text-gray-200 mb-2 leading-relaxed">{ref.sitasi}</p>
                                    {ref.bab && (
                                        <p className="text-sm text-gray-400 mb-3"><span className="text-gray-500">Relevansi:</span> {ref.bab}</p>
                                    )}
                                    {ref.url && (
                                        <a href={ref.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300">
                                            <LinkIcon className="w-3 h-3 mr-1" /> View Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Prev / Next Module Navigation */}
            <section className="mt-16 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prevModule ? (
                        <Link href={`/modules/${prevModule.id}`} className="group glass-card p-5 flex items-center gap-4 hover:border-violet-500/30 transition-colors">
                            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                            <div className="text-left">
                                <span className="text-xs text-gray-500 block">← Modul Sebelumnya</span>
                                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{prevModule.judul}</span>
                            </div>
                        </Link>
                    ) : <div />}
                    {nextModule ? (
                        <Link href={`/modules/${nextModule.id}`} className="group glass-card p-5 flex items-center gap-4 hover:border-blue-500/30 transition-colors justify-end text-right">
                            <div>
                                <span className="text-xs text-gray-500 block">Modul Selanjutnya →</span>
                                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{nextModule.judul}</span>
                            </div>
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                        </Link>
                    ) : (
                        <Link href="/modules" className="group glass-card p-5 flex items-center gap-4 hover:border-emerald-500/30 transition-colors justify-end text-right">
                            <div>
                                <span className="text-xs text-gray-500 block">Selesai! 🎉</span>
                                <span className="text-sm font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">Kembali ke Daftar Modul</span>
                            </div>
                            <ChevronRight className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        </Link>
                    )}
                </div>
            </section>

        </div >
    );
}
