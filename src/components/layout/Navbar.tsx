"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/modules", label: "Materi Belajar", icon: <BookOpen className="w-4 h-4" /> },
        { href: "/paths", label: "Learning Paths" },
        { href: "/glossary", label: "Kamus AI" },
        { href: "/about", label: "Tentang" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full glass-card border-x-0 border-t-0 rounded-none bg-ai-bg/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="w-8 h-8 text-violet-500" />
                        <Link href="/" className="font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity">
                            AI Curriculum
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => {
                                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                                return (
                                    <Link key={link.href} href={link.href} className={`transition-colors flex items-center gap-2 text-sm font-medium border-b-2 pb-0.5 ${isActive ? 'text-white border-violet-500' : 'text-gray-300 hover:text-white border-transparent'}`}>
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden border-t border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ai-bg">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                            <Link href="/modules" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Materi Belajar
                            </Link>
                            <Link href="/paths" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Learning Paths
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
