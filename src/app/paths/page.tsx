"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Map, Layers, Target, ChevronRight, ChartBar, BrainCircuit, Eye, MessageSquareText } from "lucide-react";
import Link from "next/link";
import curriculumData from "@/data/curriculum.json";

const Icons = { ChartBar, BrainCircuit, Eye, MessageSquareText };

export default function PathsPage() {
    const [activeTab, setActiveTab] = useState<"fundamental" | "karir">("fundamental");
    const [selectedKarir, setSelectedKarir] = useState<string | null>(null);

    const fundamentalPath = curriculumData.learning_paths?.tahapan_fundamental || [];
    const karirPath = curriculumData.learning_paths?.peminatan_karir || [];

    // Helper to get module info
    const getModuleInfo = (id: string) => {
        return curriculumData.modul.find((m: any) => m.id === id) || null;
    };

    return (
        <div className="w-full pb-16 pt-8 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 mb-6 border border-indigo-500/20"
                >
                    <Compass className="w-8 h-8" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Peta Jalan Belajar
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg max-w-2xl mx-auto"
                >
                    Pilih metode belajar yang sesuai. Ikuti tahapan terstruktur dari nol, atau fokus pada modul spesifik untuk mengejar target karir impian Anda.
                </motion.p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-black/40 p-1 rounded-xl border border-white/5 inline-flex relative z-10 w-full max-w-md">
                    <button
                        onClick={() => setActiveTab("fundamental")}
                        className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-bold transition-all ${activeTab === "fundamental" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            }`}
                    >
                        <Layers className="w-5 h-5 mr-2" /> Bertahap
                    </button>
                    <button
                        onClick={() => setActiveTab("karir")}
                        className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-bold transition-all ${activeTab === "karir" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            }`}
                    >
                        <Target className="w-5 h-5 mr-2" /> Karir Spesifik
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "fundamental" && (
                    <motion.div
                        key="fundamental"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-12 relative"
                    >
                        {/* Vertical line connecting stages */}
                        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50" />

                        {fundamentalPath.map((stage, idx) => (
                            <div key={stage.tahap} className="relative pl-16 md:pl-28">
                                {/* Stage Node */}
                                <div className="absolute left-6 md:left-12 top-6 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 text-white text-xs font-bold">
                                    {stage.tahap}
                                </div>

                                <div className="glass-card border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-transparent p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">{stage.nama}</h2>
                                    <p className="text-gray-400 mb-6">{stage.deskripsi}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {stage.modul.map((modId) => {
                                            const modInfo = getModuleInfo(modId);
                                            if (!modInfo) return null;

                                            return (
                                                <Link href={`/modules/${modId}`} key={modId} className="block group">
                                                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl hover:border-indigo-500/50 hover:bg-indigo-900/20 transition-all h-full">
                                                        <div className="text-xs text-indigo-400 font-mono mb-2">{modInfo.id}</div>
                                                        <h3 className="font-bold text-gray-200 group-hover:text-white mb-2 leading-snug">{modInfo.judul}</h3>
                                                        <div className="flex justify-between items-center mt-4">
                                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${modInfo.kesulitan.includes('Mudah') ? 'bg-green-500/20 text-green-400' :
                                                                modInfo.kesulitan.includes('Menengah') ? 'bg-yellow-500/20 text-yellow-400' :
                                                                    'bg-red-500/20 text-red-400'
                                                                }`}>
                                                                {modInfo.kesulitan.replace(/🟢|🟡|🔴/g, '').trim()}
                                                            </span>
                                                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === "karir" && (
                    <motion.div
                        key="karir"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!selectedKarir ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {karirPath.map((karir) => {
                                    const IconNode = Icons[karir.ikon as keyof typeof Icons] || Map;
                                    return (
                                        <button
                                            key={karir.karir}
                                            onClick={() => setSelectedKarir(karir.karir)}
                                            className="glass-card p-6 md:p-8 border-white/10 hover:border-emerald-500/50 hover:bg-emerald-900/10 text-left transition-all group flex flex-col h-full cursor-pointer"
                                        >
                                            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-xl flex flex-shrink-0 items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                                                <IconNode className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{karir.karir}</h3>
                                            <p className="text-gray-400 flex-grow mb-6 leading-relaxed bg-clip-text">
                                                {karir.deskripsi}
                                            </p>
                                            <div className="text-emerald-400 text-sm font-bold flex items-center group-hover:translate-x-2 transition-transform">
                                                Lihat {karir.modul_wajib.length} Modul Wajib <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <button
                                    onClick={() => setSelectedKarir(null)}
                                    className="text-gray-400 hover:text-white text-sm font-bold flex items-center transition-colors mb-4"
                                >
                                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Kembali ke Pilihan Karir
                                </button>

                                {(() => {
                                    const karirInfo = karirPath.find((k: any) => k.karir === selectedKarir);
                                    if (!karirInfo) return null;
                                    const IconNode = Icons[karirInfo.ikon as keyof typeof Icons] || Map;

                                    return (
                                        <div className="glass-card border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-transparent p-8 md:p-12 mb-8 relative overflow-hidden">
                                            <div className="absolute right-0 top-0 opacity-5 blur-3xl scale-150 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                                                <IconNode className="w-96 h-96 text-emerald-400" />
                                            </div>

                                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                                                    <IconNode className="w-10 h-10" />
                                                </div>
                                                <div>
                                                    <div className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2">Track Peminatan Khusus</div>
                                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{karirInfo.karir}</h2>
                                                    <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{karirInfo.deskripsi}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}

                                {/* Timeline untuk Karir Spesifik */}
                                <div className="relative pl-6 md:pl-8">
                                    <div className="absolute left-[27px] md:left-[35px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 to-transparent" />

                                    <div className="space-y-6">
                                        {karirPath.find((k: any) => k.karir === selectedKarir)?.modul_wajib.map((modId: string, idx: number) => {
                                            const modInfo = getModuleInfo(modId);
                                            if (!modInfo) return null;
                                            return (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    key={modId}
                                                    className="relative pl-8 md:pl-12"
                                                >
                                                    <div className="absolute left-0 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-black z-10" />

                                                    <Link href={`/modules/${modId}`} className="block group">
                                                        <div className="bg-black/60 border border-white/5 p-5 md:p-6 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                                                            <div className="flex-shrink-0">
                                                                <div className="text-emerald-400 font-mono text-sm bg-emerald-900/30 px-3 py-1 rounded inline-block">
                                                                    {modInfo.id}
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <h3 className="font-bold text-lg text-gray-200 group-hover:text-white mb-2 leading-snug">{modInfo.judul}</h3>
                                                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{modInfo.objektif || ""}</p>
                                                            </div>
                                                            <div className="flex-shrink-0 flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2 mt-2 sm:mt-0">
                                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded w-fit ${modInfo.kesulitan.includes('Mudah') ? 'bg-green-500/20 text-green-400' :
                                                                    modInfo.kesulitan.includes('Menengah') ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {modInfo.kesulitan.replace(/🟢|🟡|🔴/g, '').trim()}
                                                                </span>
                                                                <span className="text-emerald-400 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                                                                    Mulai <ChevronRight className="w-4 h-4 ml-1" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
