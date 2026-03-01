"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, Library, GraduationCap, ChevronRight } from "lucide-react";
import { useState } from "react";
import glossaryData from "@/data/glossary.json";

export default function GlossaryPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // Extract unique categories
    const categories = ["Semua", ...Array.from(new Set(glossaryData.map(item => item.category)))].sort();

    // Filter logic
    const filteredTerms = glossaryData.filter(item => {
        const matchSearch =
            item.term.toLowerCase().includes(search.toLowerCase()) ||
            item.definition.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    // Group by first letter for A-Z index
    const groupedTerms = filteredTerms.reduce((acc, item) => {
        const letter = item.term.charAt(0).toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(item);
        return acc;
    }, {} as Record<string, typeof glossaryData>);

    // Sort letters alphabetically
    const sortedLetters = Object.keys(groupedTerms).sort();

    return (
        <div className="w-full pb-24 pt-8 max-w-5xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
                    <BookOpen className="w-10 h-10 text-cyan-400" />
                    Kamus Istilah AI
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Kumpulan istilah teknis, pustaka kode (libraries), dan rujukan literatur akademik untuk membantu navigasi Anda dalam mempelajari Artificial Intelligence.
                </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12 space-y-4 max-w-3xl mx-auto"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Cari algoritma, singkatan, atau konsep..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-lg focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
                    />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)] border border-cyan-400'
                                : 'bg-black/50 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* A-Z Quick Jump */}
            {sortedLetters.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-12">
                    {sortedLetters.map(letter => (
                        <a
                            key={letter}
                            href={`#letter-${letter}`}
                            className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        >
                            {letter}
                        </a>
                    ))}
                </div>
            )}

            {/* Results */}
            {sortedLetters.length === 0 ? (
                <div className="text-center py-20">
                    <Search className="w-16 h-16 mx-auto mb-4 text-gray-600 opacity-50" />
                    <h3 className="text-xl font-bold text-gray-300">Istilah tidak ditemukan</h3>
                    <p className="text-gray-500">Coba gunakan kata kunci lain (contoh: "Epoch", "ReLU", "Transformer")</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {sortedLetters.map(letter => (
                        <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-3xl font-black text-cyan-500">{letter}</h2>
                                <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {groupedTerms[letter].map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="glass-card p-6 flex flex-col h-full hover:border-cyan-500/30 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.term}</h3>
                                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-white/5 text-gray-400 whitespace-nowrap ml-4">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                                            {item.definition}
                                        </p>

                                        <div className="space-y-3 mt-auto pt-4 border-t border-white/10">
                                            <div className="bg-blue-900/10 rounded-lg p-3 border border-blue-500/10">
                                                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                                                    <Library className="w-3.5 h-3.5" /> Library / FrameWork
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.libraries.map((lib, i) => (
                                                        <span key={i} className="text-xs bg-black/40 text-blue-200 px-2 py-1 rounded font-mono border border-blue-500/20">
                                                            {lib.replace(/`/g, '')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-yellow-900/10 rounded-lg p-3 border border-yellow-500/10">
                                                <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1.5">
                                                    <GraduationCap className="w-4 h-4" /> Sitasi Akademik
                                                </div>
                                                <p className="text-xs text-yellow-200/70 italic leading-relaxed">
                                                    "{item.citation}"
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
