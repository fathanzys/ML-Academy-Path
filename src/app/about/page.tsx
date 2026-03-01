"use client";

import { motion } from "framer-motion";
import { BrainCircuit, BookOpen, Code, GraduationCap, Target, Users, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="w-full pb-24 pt-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                    <BrainCircuit className="w-10 h-10 text-violet-400" />
                    Tentang AI Curriculum
                </h1>
                <p className="text-gray-400 text-lg mb-12">
                    Platform edukasi AI gratis dan open-source untuk semua orang Indonesia.
                </p>
            </motion.div>

            <div className="space-y-8">
                {/* Misi */}
                <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Target className="w-6 h-6 text-violet-400" /> Misi Kami
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Menyediakan kurikulum Artificial Intelligence yang <strong className="text-white">komprehensif, terstruktur, dan mudah dipahami</strong> dalam Bahasa Indonesia.
                        Kami percaya bahwa siapapun — dari pelajar SMA hingga profesional — berhak mengakses pendidikan AI berkualitas tinggi secara gratis.
                    </p>
                </motion.section>

                {/* Fitur */}
                <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-blue-400" /> Fitur Utama
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: <BookOpen className="w-5 h-5" />, title: "16+ Modul Lengkap", desc: "Dari Pengantar AI hingga NLP, Computer Vision, dan Etika AI." },
                            { icon: <Code className="w-5 h-5" />, title: "Visualisasi Interaktif", desc: "11 simulator hands-on (Regression, CNN, Transformer, dll)." },
                            { icon: <GraduationCap className="w-5 h-5" />, title: "Rumus LaTeX Akademik", desc: "Setiap konsep dibekali formula matematika LaTeX yang valid." },
                            { icon: <Users className="w-5 h-5" />, title: "Learning Paths", desc: "Jalur karir: Data Scientist, AI Engineer, CV Specialist." },
                        ].map((f, i) => (
                            <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-violet-400 mt-0.5">{f.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                                    <p className="text-sm text-gray-400">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Teknologi */}
                <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Code className="w-6 h-6 text-emerald-400" /> Dibangun Dengan
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "KaTeX", "Lucide Icons"].map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.section>

                {/* Kontribusi */}
                <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Heart className="w-6 h-6 text-pink-400" /> Kontribusi
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Proyek ini bersifat open-source. Kami menerima kontribusi berupa perbaikan konten, penambahan modul baru, visualisasi interaktif, dan pelaporan bug.
                    </p>
                    <div className="flex gap-3">
                        <a href="https://github.com/fathan-ai/ai-curriculum" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors">
                            ⭐ Star di GitHub
                        </a>
                        <Link href="/modules" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                            Mulai Belajar →
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
