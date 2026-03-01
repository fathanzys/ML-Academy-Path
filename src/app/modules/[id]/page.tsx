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

// Text formatter to parse LaTeX and bold text
function FormattedText({ text, variant = 'default' }: { text: string; variant?: 'default' | 'technical' }) {
    if (!text) return null;

    // Split by $$ ... $$ for block math
    const blockParts = text.split(/(\$\$[\s\S]*?\$\$)/g);

    return (
        <>
            {blockParts.map((part, i) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    return (
                        <div key={i} className="my-5 mx-auto max-w-full">
                            <div className="p-5 bg-gradient-to-r from-violet-950/40 via-black/60 to-violet-950/40 rounded-xl border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.08)] overflow-x-auto">
                                <div className="text-center">
                                    <BlockMath math={part.slice(2, -2).trim()} />
                                </div>
                            </div>
                        </div>
                    );
                }

                // Split by $ ... $ for inline math
                const inlineParts = part.split(/(\$[\s\S]*?\$)/g);
                return (
                    <span key={i}>
                        {inlineParts.map((inlinePart, j) => {
                            if (inlinePart.startsWith('$') && inlinePart.endsWith('$')) {
                                return (
                                    <span key={j} className="inline-flex items-baseline mx-0.5 px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/10 text-blue-200">
                                        <InlineMath math={inlinePart.slice(1, -1)} />
                                    </span>
                                );
                            }
                            // Quick bold parsing for markdown **text** and *text*
                            const boldParts = inlinePart.split(/(\*\*[\s\S]*?\*\*)/g);
                            return (
                                <span key={j}>
                                    {boldParts.map((bPart, k) => {
                                        if (bPart.startsWith('**') && bPart.endsWith('**')) {
                                            return <strong key={k} className="text-white font-semibold">{bPart.slice(2, -2)}</strong>;
                                        }
                                        // Process single asterisks (*text*) also as bold, per user request
                                        const singleStarParts = bPart.split(/(\*[\s\S]*?\*)/g);
                                        return (
                                            <span key={k}>
                                                {singleStarParts.map((sPart, l) => {
                                                    if (sPart.startsWith('*') && sPart.endsWith('*') && sPart.length > 2) {
                                                        return <strong key={l} className="text-white font-semibold">{sPart.slice(1, -1)}</strong>;
                                                    }
                                                    return <span key={l}>{sPart}</span>;
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
                    <p className="text-gray-300"><FormattedText text={moduleData.objektif} /></p>
                </div>
            </header>

            {/* Topics & Content Section (Expanded) */}
            <section className="mb-16 space-y-12">
                <h2 className="text-3xl font-bold flex items-center border-b border-white/10 pb-4">
                    <BookOpen className="w-8 h-8 mr-4 text-blue-400" /> Materi Pembahasan
                </h2>

                {moduleData.materi_detail ? (
                    <div className="space-y-16">
                        {moduleData.materi_detail.map((materi: any, idx: number) => (
                            <div key={idx} className="flex flex-col gap-6">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-300 flex items-center justify-center text-sm font-bold border border-violet-500/30">
                                        {idx + 1}
                                    </span>
                                    {materi.judul}
                                </h3>

                                {materi.image && (
                                    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-4 object-cover relative h-64 md:h-96">
                                        <img
                                            src={materi.image}
                                            alt={materi.judul}
                                            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h4 className="text-sm font-mono text-cyan-400 mb-2 uppercase tracking-widest">Penjelasan Awam</h4>
                                            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line"><FormattedText text={materi.penjelasan_awam} /></p>
                                        </div>
                                        <div className="p-6 rounded-xl bg-violet-900/10 border border-violet-500/20">
                                            <h4 className="text-sm font-mono text-violet-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                <Microscope className="w-4 h-4" /> Detail Teknis & Rumus
                                            </h4>
                                            <div className="text-gray-300 leading-[1.85] text-[15px] whitespace-pre-line">
                                                <FormattedText text={materi.penjelasan_teknis} variant="technical" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                            <h4 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">
                                                💡 Analogi Sederhana
                                            </h4>
                                            <p className="text-orange-200/80 text-sm leading-relaxed italic">
                                                "{materi.analogi}"
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                            <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                                🌍 Contoh Nyata
                                            </h4>
                                            <p className="text-emerald-200/80 text-sm leading-relaxed">
                                                {materi.contoh_nyata}
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
            </section>{/* Academic Citations Section */}
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
