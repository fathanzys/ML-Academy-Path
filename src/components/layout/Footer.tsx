import { Github, BookMarked } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-ai-bg/80 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-violet-400" />
                        <span className="text-gray-300 text-sm font-medium">
                            Berbasis Literatur Akademik & Terverifikasi
                        </span>
                    </div>

                    <div className="text-gray-400 text-sm text-center md:text-left">
                        <p>Dibangun sebagai kontribusi pendidikan AI untuk pemula di Indonesia.</p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://github.com/fathanzys/ML-Academy-Path" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-violet-900/10 rounded-lg p-4">
                    <p className="text-xs text-gray-400 max-w-2xl">
                        <strong>Penafian:</strong> Konten ini bersumber dari paper dan textbook akademik. Tautan menuju sumber asli tersedia di setiap modul beserta atribusi. Materi dirancang independen dari framework LLM komersial.
                    </p>
                    <p className="border-t border-white/10 p-2 mt-4 text-center text-xs leading-5 text-gray-500 md:leading-6 md:border-none md:p-0 md:mt-0 md:text-right">
                        &copy; {new Date().getFullYear()} AI Curriculum. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
