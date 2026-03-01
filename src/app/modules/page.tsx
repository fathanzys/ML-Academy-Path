"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Layers, Search, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import curriculumData from "@/data/curriculum.json";

export default function ModulesPage() {
    const { rumpun, modul } = curriculumData;
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("Semua");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const difficulties = [
        { id: "Semua", label: "Semua Tingkat", icon: "🎯" },
        { id: "Mudah", label: "Mudah", icon: "🟢" },
        { id: "Menengah", label: "Menengah", icon: "🟡" },
        { id: "Sulit", label: "Sulit", icon: "🔴" }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = modul.filter(m => {
        const matchSearch = !search || m.judul.toLowerCase().includes(search.toLowerCase()) || m.objektif.toLowerCase().includes(search.toLowerCase());
        const matchDiff = difficulty === "Semua" || m.kesulitan.includes(difficulty);
        return matchSearch && matchDiff;
    });

    // Group filtered modules by Rumpun
    const groupedModules = rumpun.map(r => ({
        ...r,
        modules: filtered.filter(m => m.rumpun_id === r.id)
    })).filter(g => g.modules.length > 0);

    return (
        <div className="w-full pb-16 pt-8">
            <div className="mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-4 flex items-center gap-3"
                >
                    <Layers className="w-10 h-10 text-violet-400" />
                    Materi Belajar (Kurikulum Lengkap)
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg max-w-3xl"
                >
                    Telusuri semua modul dari awal hingga akhir. Kurikulum ini dirancang berjenjang untuk memastikan pemahaman yang kokoh.
                </motion.p>
            </div>

            {/* Search & Filter Bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Cari modul berdasarkan judul atau deskripsi..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors"
                    />
                </div>
                <div className="relative min-w-[200px]" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                    >
                        <span className="flex items-center gap-2">
                            <span>{difficulties.find(d => d.id === difficulty)?.icon}</span>
                            <span>{difficulties.find(d => d.id === difficulty)?.label}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-violet-400' : 'text-gray-500'}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute right-0 top-full mt-2 w-full bg-gray-900 border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                            >
                                <div className="py-1">
                                    {difficulties.map((diff) => (
                                        <button
                                            key={diff.id}
                                            onClick={() => {
                                                setDifficulty(diff.id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                                        >
                                            <span className={`flex items-center gap-3 ${difficulty === diff.id ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                <span className="text-lg">{diff.icon}</span>
                                                {diff.label}
                                            </span>
                                            {difficulty === diff.id && <Check className="w-4 h-4 text-violet-400" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {groupedModules.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Tidak ada modul yang cocok dengan pencarian Anda.</p>
                </div>
            )}

            <div className="space-y-16">
                {groupedModules.map((rumpunItem, index) => (
                    <motion.div
                        key={rumpunItem.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        {/* Rumpun Header */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
                            <div>
                                <span className="text-violet-400 font-medium text-sm tracking-widest uppercase block mb-1">Tahap {index + 1}</span>
                                <h2 className="text-2xl font-bold flex items-center gap-2">{rumpunItem.nama}</h2>
                            </div>
                            <p className="text-gray-400 text-sm md:max-w-md text-left md:text-right">
                                {rumpunItem.deskripsi}
                            </p>
                        </div>

                        {/* Module Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-6 border-l-0 md:border-l-2 border-white/5">
                            {rumpunItem.modules.map((m, mIdx) => (
                                <Link href={`/modules/${m.id}`} key={m.id}>
                                    <div className="glass-card p-5 h-full flex flex-col group cursor-pointer hover:border-violet-500/30 transition-colors relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex justify-between items-start mb-3">
                                            <span className="bg-white/5 px-2 py-1 rounded text-xs font-mono text-gray-300">Modul {m.nomor}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${m.kesulitan.includes("Mudah") ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                m.kesulitan.includes("Menengah") ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                {m.kesulitan.replace(/🟢|🟡|🔴/g, '').trim()}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">{m.judul}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2 mt-auto mb-4">{m.objektif}</p>

                                        <div className="flex items-center text-sm text-violet-400 font-medium group-hover:text-violet-300">
                                            Pelajari Modul <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {rumpunItem.modules.length === 0 && (
                                <div className="col-span-1 md:col-span-2 p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500 flex flex-col items-center justify-center">
                                    <BookOpen className="w-8 h-8 opacity-50 mb-2" />
                                    <p>Modul dalam tahap pengembangan.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
