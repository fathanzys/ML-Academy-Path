"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import curriculumData from "@/data/curriculum.json";

export default function Home() {
  const rumpun = curriculumData.rumpun;

  return (
    <div className="flex flex-col items-center w-full pb-16">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center min-h-[70vh] text-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Versi 2.0 &bull; Dilengkapi Sitasi Akademik</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Pahami AI dari Dasar hingga <br className="hidden md:block" />
          <span className="text-gradient hover:glow-effect transition-shadow inline-block">Masa Depan AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
        >
          Kurikulum bimbingan belajar AI gratis untuk pemula Indonesia.
          Dibangun berdasarkan literatur terpercaya dan visualisasi interaktif yang mudah dipahami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="#kurikulum" className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-violet-600/20">
            Lihat Kurikulum <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/paths" className="px-8 py-4 rounded-xl glass-card text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            Cari Learning Path
          </Link>
        </motion.div>
      </section>

      {/* Curriculum Overview Section */}
      <section id="kurikulum" className="w-full pt-16 mt-8 border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-blue-400 w-8 h-8" />
            Roadmap Pembelajaran
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dari fondasi Machine Learning hingga Arsitektur Transformer, pelajari konsep yang tepat secara terstruktur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rumpun.map((item, index) => (
            <Link href="/modules" key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col h-full group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-violet-300 transition-colors">{item.nama}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{item.deskripsi}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                  <span>⏱️ {item.estimasi_waktu}</span>
                  <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                    Mulai Belajar <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
