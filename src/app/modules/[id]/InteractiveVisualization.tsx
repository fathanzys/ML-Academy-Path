"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Play, RefreshCw, Layers, Brain, GitBranch, Target, Search, MessageSquare, AlertTriangle, FastForward, Database, Network, Activity } from "lucide-react";

export default function InteractiveVisualization({ moduleId, description }: { moduleId: string, description: string }) {
    switch (moduleId) {
        case "MOD-01": return <AITimelineVisualizer description={description} />
        case "MOD-02": return <MLPipelineVisualizer description={description} />
        case "MOD-03": return <ImbalanceVisualizer description={description} />
        case "MOD-04": return <SupervisedVisualizers description={description} />
        case "MOD-05": return <KMeansVisualizer description={description} />
        case "MOD-06": return <MathFoundationVisualizer description={description} />
        case "MOD-07": return <NeuralNetVisualizer description={description} />
        case "MOD-08": return <CNNVisualizer description={description} />
        case "MOD-09": return <RNNMemoryVisualizer description={description} />
        case "MOD-10": return <AttentionVisualizer description={description} />
        case "MOD-11": return <TransformerVisualizer description={description} />
        case "MOD-12": return <BERTMaskVisualizer description={description} />
        case "MOD-13": return <DiffusionVisualizer description={description} />
        case "MOD-14": return <LLMVisualizer description={description} />
        case "MOD-15": return <MLOpsVisualizer description={description} />
        case "MOD-16": return <HallucinationVisualizer description={description} />
        case "MOD-17": return <RegexVisualizer description={description} />
        case "MOD-18": return <NGramVisualizer description={description} />
        case "MOD-19": return <VectorVisualizer description={description} />
        case "MOD-20": return <RAGVisualizer description={description} />
        case "MOD-21": return <ChatbotVisualizer description={description} />
        default:
            return (
                <div className="glass-card p-8 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 opacity-10 blur-xl">
                        <Lightbulb className="w-48 h-48 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-100 mb-2">Konsep Visual:</h3>
                    <p className="text-gray-300 mb-6">{description}</p>
                    <div className="text-sm font-mono text-yellow-500/70 border border-yellow-500/20 p-4 rounded bg-black/40 inline-flex items-center">
                        <Layers className="w-4 h-4 mr-2" /> Menuju Lab Interaktif...
                    </div>
                </div>
            );
    }
}

// ==========================================
// MOD-06: Math Foundation - Dot Product Demo
// ==========================================
function MathFoundationVisualizer({ description }: { description: string }) {
    const [vecA, setVecA] = useState([2, 3, 1]);
    const [vecB, setVecB] = useState([1, -1, 4]);

    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((s, v) => s + v * v, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((s, v) => s + v * v, 0));
    const cosine = magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;

    return (
        <div className="glass-card p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center"><Activity className="mr-3 w-6 h-6" /> Kalkulator Vektor & Dot Product</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div className="text-sm font-bold text-indigo-300">Vektor A</div>
                    {vecA.map((v, i) => (
                        <div key={`a${i}`} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-8">a{i + 1}:</span>
                            <input type="range" min="-5" max="5" value={v} onChange={e => { const n = [...vecA]; n[i] = parseInt(e.target.value); setVecA(n); }} className="flex-1 accent-indigo-500" />
                            <span className="text-indigo-300 font-mono w-6 text-right">{v}</span>
                        </div>
                    ))}
                    <div className="text-sm font-bold text-pink-300 mt-4">Vektor B</div>
                    {vecB.map((v, i) => (
                        <div key={`b${i}`} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-8">b{i + 1}:</span>
                            <input type="range" min="-5" max="5" value={v} onChange={e => { const n = [...vecB]; n[i] = parseInt(e.target.value); setVecB(n); }} className="flex-1 accent-pink-500" />
                            <span className="text-pink-300 font-mono w-6 text-right">{v}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-3">
                    <div className="p-4 bg-black/40 rounded-xl border border-indigo-500/20">
                        <div className="text-xs text-gray-500 mb-1">Dot Product (A · B)</div>
                        <div className="text-3xl font-bold font-mono text-indigo-400">{dotProduct}</div>
                        <div className="text-xs text-gray-500 mt-2 font-mono">{vecA.map((a, i) => `${a}×${vecB[i]}`).join(' + ')} = {dotProduct}</div>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-pink-500/20">
                        <div className="text-xs text-gray-500 mb-1">Cosine Similarity</div>
                        <div className={`text-3xl font-bold font-mono ${cosine > 0 ? 'text-green-400' : cosine < 0 ? 'text-red-400' : 'text-gray-400'}`}>{cosine.toFixed(3)}</div>
                        <div className="text-xs text-gray-500 mt-2">{cosine > 0.5 ? '👍 Mirip!' : cosine < -0.5 ? '👎 Berlawanan!' : '🤷 Netral'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-01: AI Timeline
// ==========================================
function AITimelineVisualizer({ description }: { description: string }) {
    const events = [
        { year: 1950, title: "Turing Test", desc: "Alan Turing mengusulkan tes kecerdasan mesin." },
        { year: 1956, title: "Dartmouth", desc: "Istilah 'Artificial Intelligence' lahir." },
        { year: 1997, title: "Deep Blue", desc: "AI mengalahkan juara catur dunia Kasparov." },
        { year: 2012, title: "AlexNet", desc: "Revolusi Deep Learning pada ImageNet." },
        { year: 2017, title: "Transformer", desc: "Paper 'Attention Is All You Need' dipublikasi." },
        { year: 2022, title: "ChatGPT", desc: "Era Generative AI melesat masif." }
    ];
    const [active, setActive] = useState(0);

    return (
        <div className="glass-card p-8 border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Garis Waktu Evolusi AI</h3>
            <p className="text-gray-300 mb-8">{description}</p>

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

                <div className="flex justify-between relative z-10">
                    {events.map((ev, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActive(idx)}
                            className={`flex flex-col items-center cursor-pointer group w-16`}
                        >
                            <div className={`text-xs font-mono mb-2 transition-colors ${active === idx ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {ev.year}
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${active === idx ? 'bg-blue-500 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-150' : 'bg-gray-800 border-gray-600'}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 p-6 bg-black/40 rounded-xl border border-blue-500/30 min-h-[120px]">
                <div className="text-xl font-bold text-white mb-2">{events[active].title} <span className="text-blue-400 font-mono text-sm ml-2">({events[active].year})</span></div>
                <div className="text-gray-300">{events[active].desc}</div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-02: ML Pipeline
// ==========================================
function MLPipelineVisualizer({ description }: { description: string }) {
    const [step, setStep] = useState(0);
    const steps = [
        { name: "1. Data Collection", detail: "Mengumpulkan jutaan gambar kucing dan anjing mentah." },
        { name: "2. Preprocessing", detail: "Mengubah ukuran gambar, normalisasi pixel, membersihkan label." },
        { name: "3. Training", detail: "Model mencari pola dengan Gradient Descent berulang-ulang." },
        { name: "4. Prediction", detail: "Model mengklasifikasikan gambar baru dengan akurasi 98%." }
    ];

    return (
        <div className="glass-card p-8 border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center"><RefreshCw className="mr-3 w-6 h-6" /> Data Lifecycle</h3>
            <p className="text-gray-300 mb-8">{description}</p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {steps.map((s, idx) => (
                    <div
                        key={idx}
                        onClick={() => setStep(idx)}
                        className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all ${step === idx ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
                    >
                        <div className={`text-sm font-bold ${step === idx ? 'text-emerald-300' : 'text-gray-400'}`}>{s.name}</div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-black/50 rounded-xl border-l-4 border-emerald-500">
                <div className="text-lg text-white">{steps[step].detail}</div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-03: Class Imbalance + Confusion Matrix
// ==========================================
function ImbalanceVisualizer({ description }: { description: string }) {
    const [minorityPct, setMinorityPct] = useState(10);
    const [threshold, setThreshold] = useState(0.5);

    const total = 200;
    const posCount = Math.max(Math.round(total * minorityPct / 100), 1);
    const negCount = total - posCount;

    // Smart model simulation based on threshold
    const tp = Math.round(posCount * (1 - threshold * 0.6));
    const fn = posCount - tp;
    const fp = Math.round(negCount * (1 - threshold) * 0.15);
    const tn = negCount - fp;

    const precision = tp + fp > 0 ? (tp / (tp + fp) * 100) : 0;
    const recall = tp + fn > 0 ? (tp / (tp + fn) * 100) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall / (precision + recall)) : 0;
    const accuracy = ((tp + tn) / total * 100);

    return (
        <div className="glass-card p-8 border-red-500/20 bg-gradient-to-br from-red-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center"><AlertTriangle className="mr-3 w-6 h-6" /> Bahaya Class Imbalance & Confusion Matrix</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Persentase Kasus Fraud: {minorityPct}%</label>
                        <input
                            type="range" min="1" max="50"
                            value={minorityPct} onChange={(e) => setMinorityPct(parseInt(e.target.value))}
                            className="w-full accent-red-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">🎚️ Threshold: {threshold.toFixed(2)}</label>
                        <input
                            type="range" min="0.1" max="0.9" step="0.05"
                            value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                            <span>Sensitif (recall↑)</span>
                            <span>Ketat (precision↑)</span>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-black/40 rounded-xl border border-green-500/20 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">Accuracy</div>
                            <div className="text-xl font-bold font-mono text-green-400">{accuracy.toFixed(1)}%</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">Precision</div>
                            <div className="text-xl font-bold font-mono text-blue-400">{precision.toFixed(1)}%</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-yellow-500/20 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">Recall</div>
                            <div className="text-xl font-bold font-mono text-yellow-400">{recall.toFixed(1)}%</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-red-500/20 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">F1-Score</div>
                            <div className="text-xl font-bold font-mono text-red-400">{f1.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>

                {/* Confusion Matrix */}
                <div className="flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-500 uppercase mb-2">Confusion Matrix</div>
                    <div className="grid grid-cols-2 gap-1 w-full max-w-[200px]">
                        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                            <div className="text-[10px] text-green-300">TP</div>
                            <div className="text-2xl font-bold font-mono text-green-400">{tp}</div>
                        </div>
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
                            <div className="text-[10px] text-red-300">FP</div>
                            <div className="text-2xl font-bold font-mono text-red-400">{fp}</div>
                        </div>
                        <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-center">
                            <div className="text-[10px] text-orange-300">FN</div>
                            <div className="text-2xl font-bold font-mono text-orange-400">{fn}</div>
                        </div>
                        <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-center">
                            <div className="text-[10px] text-blue-300">TN</div>
                            <div className="text-2xl font-bold font-mono text-blue-400">{tn}</div>
                        </div>
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500 text-center">
                        Geser threshold dan lihat bagaimana Precision/Recall ber-tradeoff!
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-04: Supervised Learning Suite
// ==========================================
function SupervisedVisualizers({ description }: { description: string }) {
    const [activeTab, setActiveTab] = useState("regression");

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveTab('regression')} className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${activeTab === 'regression' ? 'bg-orange-600 border-orange-400 text-white' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}>Regresi Linear</button>
                <button onClick={() => setActiveTab('tree')} className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${activeTab === 'tree' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}>Decision Tree</button>
                <button onClick={() => setActiveTab('svm')} className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${activeTab === 'svm' ? 'bg-fuchsia-600 border-fuchsia-400 text-white' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}>SVM (Support Vector)</button>
                <button onClick={() => setActiveTab('knn')} className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${activeTab === 'knn' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}>K-Nearest Neighbors</button>
            </div>

            {activeTab === 'regression' && <RegressionVisualizer description="Geser slider untuk mengubah kemiringan garis (W) dan observasi nilai Loss (MSE) antara prediksi dan nilai sesungguhnya" />}
            {activeTab === 'tree' && <DecisionTreeVisualizer />}
            {activeTab === 'svm' && <SVMVisualizer />}
            {activeTab === 'knn' && <KNNVisualizer />}
        </div>
    )
}

function RegressionVisualizer({ description }: { description: string }) {
    const [slope, setSlope] = useState(1);
    const [intercept, setIntercept] = useState(0);
    const [points] = useState<{ x: number, y: number }[]>([
        { x: 10, y: 15 }, { x: 20, y: 25 }, { x: 40, y: 35 }, { x: 50, y: 60 }, { x: 70, y: 65 }, { x: 80, y: 85 }
    ]);

    const error = points.reduce((acc, p) => acc + Math.pow(p.y - (slope * p.x + intercept), 2), 0) / points.length;

    return (
        <div className="glass-card p-8 border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-transparent relative overflow-hidden">
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" /> Regresi Linear Interaktif
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Geser slider untuk mengubah Slope (W) dan Intercept (b)!</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 relative h-64 flex items-center justify-center">
                    <div className="absolute inset-x-8 inset-y-8 border-l-2 border-b-2 border-gray-600 overflow-hidden bg-black/20">
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                            <line
                                x1="0" y1={`${100 - intercept}%`}
                                x2="100%" y2={`${100 - (slope * 100 + intercept)}%`}
                                stroke="#f97316" strokeWidth="3"
                            />
                            {points.map((p, i) => {
                                const predY = slope * p.x + intercept;
                                return (
                                    <line key={i} x1={`${p.x}%`} y1={`${100 - p.y}%`} x2={`${p.x}%`} y2={`${100 - predY}%`} stroke="rgba(239,68,68,0.5)" strokeWidth="2" strokeDasharray="4" />
                                );
                            })}
                        </svg>

                        {points.map((p, i) => (
                            <div key={i} className="absolute w-3 h-3 bg-blue-500 rounded-full -ml-1.5 -mb-1.5 z-10" style={{ left: `${p.x}%`, bottom: `${p.y}%` }} />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-48 space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-1 flex justify-between">
                            <span>Slope (W)</span>
                            <span className="text-orange-400 font-mono">{slope.toFixed(2)}</span>
                        </label>
                        <input
                            type="range" min="0" max="2" step="0.05"
                            value={slope} onChange={(e) => setSlope(parseFloat(e.target.value))}
                            className="w-full accent-orange-500 mb-4"
                        />

                        <label className="text-sm font-bold text-gray-300 mb-1 flex justify-between">
                            <span>Intercept (b)</span>
                            <span className="text-orange-400 font-mono">{intercept.toFixed(1)}</span>
                        </label>
                        <input
                            type="range" min="-20" max="40" step="1"
                            value={intercept} onChange={(e) => setIntercept(parseFloat(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>

                    <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Mean Squared Error</div>
                        <div className={`text-3xl font-mono font-bold ${error < 100 ? 'text-green-400' : 'text-red-400'}`}>
                            {error.toFixed(0)}
                        </div>
                        {error < 100 && <div className="text-xs text-green-400 mt-2">✨ Optimal Fit!</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SVMVisualizer() {
    const [margin, setMargin] = useState(20);
    const points = [
        { x: 15, y: 80, c: 'blue' }, { x: 25, y: 70, c: 'blue' }, { x: 35, y: 85, c: 'blue' }, { x: 20, y: 60, c: 'blue' },
        { x: 65, y: 30, c: 'red' }, { x: 75, y: 40, c: 'red' }, { x: 85, y: 20, c: 'red' }, { x: 80, y: 50, c: 'red' }
    ];

    return (
        <div className="glass-card p-8 border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-fuchsia-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" /> SVM (Support Vector Machine) Margin
            </h3>
            <p className="text-gray-300 mb-8">SVM mencari garis pemisah terbaik dengan ruang 'jalan tol' (Margin) selebar mungkin tanpa menabrak kelas manapun. <br /><strong>Instruksi:</strong> Sesuaikan parameter Margin untuk melebarkan/menyempitkan batas (Hard/Soft margin).</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 relative h-64 overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <polygon points={`0,${100 - margin}% 100%,${0 - margin}% 100%,${0 + margin}% 0,${100 + margin}%`} fill="rgba(217, 70, 239, 0.1)" />
                        <line x1="0" y1={`${100 - margin}%`} x2="100%" y2={`${0 - margin}%`} stroke="#d946ef" strokeWidth="2" strokeDasharray="8" opacity="0.6" />
                        <line x1="0" y1={`${100 + margin}%`} x2="100%" y2={`${0 + margin}%`} stroke="#d946ef" strokeWidth="2" strokeDasharray="8" opacity="0.6" />
                        <line x1="0" y1="100%" x2="100%" y2="0%" stroke="#d946ef" strokeWidth="3" />
                    </svg>
                    {points.map((p, i) => {
                        let isSupportVector = false;
                        const dist = Math.abs(p.x + p.y - 100) / Math.sqrt(2);
                        const svThreshold = margin * 0.8;
                        if (dist < svThreshold) isSupportVector = true;

                        return (
                            <div key={i} className={`absolute w-3 h-3 rounded-full -ml-1.5 -mb-1.5 z-10 ${p.c === 'blue' ? 'bg-blue-500' : 'bg-red-500'} ${isSupportVector ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 transition-transform' : 'transition-transform'}`} style={{ left: `${p.x}%`, bottom: `${p.y}%` }} />
                        )
                    })}
                </div>
                <div className="w-full lg:w-48 space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Lebar Margin</label>
                        <input
                            type="range" min="5" max="40" step="1"
                            value={margin} onChange={(e) => setMargin(parseFloat(e.target.value))}
                            className="w-full accent-fuchsia-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function KNNVisualizer() {
    const [k, setK] = useState(3);
    const [target, setTarget] = useState({ x: 50, y: 50 });

    const points = [
        { x: 20, y: 80, c: 'orange' }, { x: 30, y: 70, c: 'orange' }, { x: 10, y: 60, c: 'orange' }, { x: 40, y: 85, c: 'orange' }, { x: 45, y: 65, c: 'orange' },
        { x: 70, y: 30, c: 'teal' }, { x: 80, y: 40, c: 'teal' }, { x: 90, y: 20, c: 'teal' }, { x: 65, y: 45, c: 'teal' }, { x: 85, y: 35, c: 'teal' }
    ];

    const dists = points.map(p => {
        const d = Math.sqrt(Math.pow(p.x - target.x, 2) + Math.pow(p.y - target.y, 2));
        return { ...p, d };
    });

    dists.sort((a, b) => a.d - b.d);
    const nearest = dists.slice(0, k);
    let orangeCount = nearest.filter(p => p.c === 'orange').length;
    let tealCount = nearest.filter(p => p.c === 'teal').length;
    const predictedClass = orangeCount > tealCount ? 'orange' : 'teal';

    return (
        <div className="glass-card p-8 border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" /> K-Nearest Neighbors (KNN)
            </h3>
            <p className="text-gray-300 mb-8">KNN menebak kategori data baru dengan cara "bertanya" pada K tetangga terdekatnya.<br /><strong>Instruksi:</strong> Klik area grafik untuk meletakkan titik data baru & Ubah parameter K nya!</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div
                    className="flex-1 bg-black/40 rounded-xl border border-white/10 relative h-64 overflow-hidden cursor-crosshair"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
                        setTarget({ x, y });
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        {nearest.map((p, i) => (
                            <line key={i} x1={`${target.x}%`} y1={`${100 - target.y}%`} x2={`${p.x}%`} y2={`${100 - p.y}%`} stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.6" />
                        ))}
                    </svg>
                    {points.map((p, i) => (
                        <div key={i} className={`absolute w-3 h-3 rounded-full -ml-1.5 -mb-1.5 ${p.c === 'orange' ? 'bg-orange-500' : 'bg-teal-500'}`} style={{ left: `${p.x}%`, bottom: `${p.y}%` }} />
                    ))}

                    <div className={`absolute w-5 h-5 rounded-full border-2 border-white pointer-events-none transition-colors duration-500 -ml-2.5 -mb-2.5 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${predictedClass === 'orange' ? 'bg-orange-500' : 'bg-teal-500'}`} style={{ left: `${target.x}%`, bottom: `${target.y}%` }} />
                </div>

                <div className="w-full lg:w-48 space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Jumlah Tetangga (K)</label>
                        <div className="flex gap-2 mb-4">
                            {[1, 3, 5, 7].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setK(val)}
                                    className={`w-10 h-10 flex items-center justify-center font-bold rounded-lg border transition-colors ${k === val ? 'bg-emerald-500 border-emerald-300 text-white' : 'bg-black/50 border-white/10 text-gray-400'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/50 border border-white/5 space-y-2 text-sm text-gray-300 font-mono">
                        <div><strong className="text-orange-400">Orange:</strong> {orangeCount} voting</div>
                        <div><strong className="text-teal-400">Teal:</strong> {tealCount} voting</div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                            Prediksi Final: <span className={`font-bold uppercase ${predictedClass === 'orange' ? 'text-orange-400' : 'text-teal-400'}`}>{predictedClass}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DecisionTreeVisualizer() {
    const [depth, setDepth] = useState(2);

    return (
        <div className="glass-card p-8 border-amber-500/20 bg-gradient-to-br from-amber-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center">
                <GitBranch className="mr-3 w-6 h-6" /> Decision Tree Splitting
            </h3>
            <p className="text-gray-300 mb-8">Pohon keputusan membelah data berdasarkan urutan pertanyaan ("Apakah Gaji {`>`} 10 Juta?") dengan cara meminimalkan Impuritas/Entropy.<br /><strong>Instruksi:</strong> Tambah Maximum Depth pohon untuk melihat pemisahan yang semakin kompleks dan Overfitting.</p>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex-1 flex flex-col items-center min-h-[250px] relative w-full overflow-x-auto pt-4">
                    <div className="w-40 p-2 bg-blue-900 rounded text-center text-sm font-bold border border-blue-500 mb-4 z-10 shrink-0">
                        Umur {`<`} 30? <br /><span className="text-xs text-gray-400">60 Setuju, 40 Tolak</span>
                    </div>

                    {depth >= 1 && (
                        <>
                            <svg className="absolute top-16 left-0 w-full h-12 pointer-events-none -z-0">
                                <line x1="50%" y1="0" x2="30%" y2="100%" stroke="gray" strokeWidth="2" />
                                <line x1="50%" y1="0" x2="70%" y2="100%" stroke="gray" strokeWidth="2" />
                            </svg>
                            <div className="flex w-full md:w-[120%] lg:w-full justify-around z-10">
                                <div className="w-32 p-2 bg-rose-900 rounded text-center text-sm font-bold border border-rose-500 mb-4 relative shrink-0">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-1 rounded">Ya</span>
                                    Gaji {`<`} 5Jt? <br /><span className="text-xs text-gray-400">10 Setuju, 35 Tolak</span>
                                </div>
                                <div className="w-32 p-2 bg-emerald-900 rounded text-center text-sm font-bold border border-emerald-500 mb-4 relative shrink-0">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-1 rounded">Tidak</span>
                                    Riwayat Baik? <br /><span className="text-xs text-gray-400">50 Setuju, 5 Tolak</span>
                                </div>
                            </div>
                        </>
                    )}

                    {depth >= 2 && (
                        <>
                            <svg className="absolute top-40 left-0 w-full h-12 pointer-events-none -z-0">
                                <line x1="25%" y1="0" x2="15%" y2="100%" stroke="gray" strokeWidth="2" />
                                <line x1="25%" y1="0" x2="35%" y2="100%" stroke="gray" strokeWidth="2" />
                                <line x1="75%" y1="0" x2="65%" y2="100%" stroke="gray" strokeWidth="2" />
                                <line x1="75%" y1="0" x2="85%" y2="100%" stroke="gray" strokeWidth="2" />
                            </svg>

                            <div className="flex w-full md:w-[140%] lg:w-[120%] justify-around z-10 text-xs">
                                <div className="w-20 p-2 bg-red-600 rounded text-center font-bold shrink-0">100% Tolak</div>
                                <div className="w-20 p-2 bg-yellow-600 rounded text-center font-bold text-black border border-yellow-300 shrink-0">Entropy 0.8</div>
                                <div className="w-20 p-2 bg-yellow-600 rounded text-center font-bold text-black border border-yellow-300 shrink-0">Entropy 0.6</div>
                                <div className="w-20 p-2 bg-green-600 rounded text-center font-bold shrink-0">100% Setuju</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-48 space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Maximum Depth</label>
                        <input
                            type="range" min="0" max="2" step="1"
                            value={depth} onChange={(e) => setDepth(parseInt(e.target.value))}
                            className="w-full accent-amber-500"
                        />
                        <div className="text-sm text-gray-400 mt-2 text-center">Depth = {depth}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// ==========================================
// MOD-05: K-Means Clustering
// ==========================================
function KMeansVisualizer({ description }: { description: string }) {
    const [step, setStep] = useState(0);

    // Hardcoded static steps for visual simplicity
    return (
        <div className="glass-card p-8 border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-violet-400 mb-4 flex items-center"><Target className="mr-3 w-6 h-6" /> K-Means Clustering</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="flex gap-4 mb-6">
                <button onClick={() => setStep(0)} className="px-4 py-2 bg-black/50 hover:bg-white/10 text-white rounded border border-white/10 text-sm">1. Random Data</button>
                <button onClick={() => setStep(1)} className="px-4 py-2 bg-black/50 hover:bg-white/10 text-violet-300 rounded border border-violet-500/30 text-sm">2. Init Centroids</button>
                <button onClick={() => setStep(2)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded text-sm">3. Group & Move Centroids</button>
            </div>

            <div className="h-64 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
                {/* Cluster 1 Points */}
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500' : 'bg-gray-500'}`} style={{ left: '20%', top: '30%' }} />
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500' : 'bg-gray-500'}`} style={{ left: '25%', top: '20%' }} />
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500' : 'bg-gray-500'}`} style={{ left: '30%', top: '35%' }} />

                {/* Cluster 2 Points */}
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-500'}`} style={{ left: '70%', top: '60%' }} />
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-500'}`} style={{ left: '75%', top: '75%' }} />
                <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-500'}`} style={{ left: '60%', top: '70%' }} />

                {/* Centroids */}
                {step >= 1 && (
                    <>
                        <div className="absolute w-6 h-6 bg-transparent border-4 border-fuchsia-400 transition-all duration-1000 -ml-3 -mt-3" style={step >= 2 ? { left: '25%', top: '28%' } : { left: '50%', top: '50%' }}>
                            <span className="absolute -top-6 -left-2 text-xs text-fuchsia-400 font-bold">C1</span>
                        </div>
                        <div className="absolute w-6 h-6 bg-transparent border-4 border-cyan-400 transition-all duration-1000 -ml-3 -mt-3" style={step >= 2 ? { left: '68%', top: '68%' } : { left: '40%', top: '40%' }}>
                            <span className="absolute -top-6 -left-2 text-xs text-cyan-400 font-bold">C2</span>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-400 italic">
                {step === 0 && "Data tak berlabel terdistribusi."}
                {step === 1 && "Centroid ditempatkan secara acak."}
                {step === 2 && "Data dikelompokkan ke centroid terdekat, lalu centroid bergeser ke tengah kelompok."}
            </div>
        </div>
    );
}

// ==========================================
// MOD-07: Neural Network (Already Built Previously)
// ==========================================
function NeuralNetVisualizer({ description }: { description: string }) {
    const [weights, setWeights] = useState([1, 1, 1]);

    const toggleWeight = (index: number) => {
        const newWeights = [...weights];
        newWeights[index] = newWeights[index] === 1 ? 0.2 : 1;
        setWeights(newWeights);
    };

    return (
        <div className="glass-card p-8 border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-transparent relative overflow-hidden">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-3" /> Simulasi Forward Pass
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Klik pada garis koneksi bobot (Weights) untuk melemahkan/menguatkan sinyal neuron!</p>

            <div className="relative h-64 flex justify-between items-center px-12 border border-white/5 rounded-2xl bg-black/30">
                <div className="flex flex-col gap-8 z-10">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            x{i + 1}
                        </div>
                    ))}
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    {[0, 1, 2].map(i => (
                        <line
                            key={i}
                            x1="15%" y1={`${20 + i * 30}%`}
                            x2="85%" y2="50%"
                            stroke={weights[i] === 1 ? "#06b6d4" : "#334155"}
                            strokeWidth={weights[i] === 1 ? 4 : 2}
                            style={{ transition: "stroke 0.3s, stroke-width 0.3s", pointerEvents: "all", cursor: "pointer" }}
                            onClick={() => toggleWeight(i)}
                            className="hover:stroke-cyan-300"
                        />
                    ))}
                </svg>

                <div className="flex flex-col justify-center h-full z-10">
                    <div className="w-16 h-16 rounded-full bg-fuchsia-500 flex items-center justify-center font-bold text-lg shadow-[0_0_25px_rgba(217,70,239,0.8)] border-4 border-white/20">
                        Σ
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between font-mono text-sm bg-black/50 p-4 rounded-lg">
                <div className="text-blue-300">Input: [1.0, 0.5, -0.2]</div>
                <div className="text-cyan-300">Sum = Σ(w·x) = {(1.0 * weights[0] + 0.5 * weights[1] - 0.2 * weights[2]).toFixed(2)}</div>
                <div className="text-fuchsia-300">Output f(x) = {((1.0 * weights[0] + 0.5 * weights[1] - 0.2 * weights[2]) > 0.5 ? "Kucing" : "Anjing")}</div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-08: CNN Filter
// ==========================================
function CNNVisualizer({ description }: { description: string }) {
    const [hoverPos, setHoverPos] = useState({ x: -1, y: -1 });
    const grid = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
    ];

    return (
        <div className="glass-card p-8 border-pink-500/20 bg-gradient-to-br from-pink-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center"><Search className="mr-3 w-6 h-6" /> Filter Magnifier Konvolusi</h3>
            <p className="text-gray-300 mb-8">{description} Arahkan mouse/sentuh kanvas matrix di bawah.</p>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                {/* Image Grid */}
                <div>
                    <div className="text-sm font-bold text-center mb-2 text-pink-300">Matriks Gambar Asli</div>
                    <div className="grid grid-cols-5 gap-1 bg-black/40 p-2 rounded-lg" onMouseLeave={() => setHoverPos({ x: -1, y: -1 })}>
                        {grid.map((row, y) => (
                            row.map((val, x) => {
                                const isHovered = hoverPos.x !== -1 && Math.abs(hoverPos.x - x) <= 1 && Math.abs(hoverPos.y - y) <= 1;
                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        onMouseEnter={() => setHoverPos({ x, y })}
                                        className={`w-12 h-12 flex items-center justify-center font-mono text-xs transition-colors cursor-crosshair
                                            ${val === 1 ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}
                                            ${isHovered ? 'ring-2 ring-pink-500 ring-inset scale-95 origin-center' : ''}
                                        `}
                                    >
                                        {val}
                                    </div>
                                )
                            })
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:block text-gray-500">
                    <FastForward className="w-10 h-10" />
                </div>

                {/* Filter Output */}
                <div className="w-48">
                    <div className="text-sm font-bold text-center mb-2 text-fuchsia-400">Hasil Konvolusi (Sum)</div>
                    <div className="w-full h-48 bg-black/50 border-2 border-fuchsia-500/30 rounded-xl flex items-center justify-center text-4xl font-mono text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                        {hoverPos.x === -1 ? "-" : "8"}
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-2">Filter mengalikan area 3x3 dan menjumlahkannya.</div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-10: Attention Mechanism
// ==========================================
function AttentionVisualizer({ description }: { description: string }) {
    const [hoverWord, setHoverWord] = useState<number | null>(null);
    const words = ["Apple", "is", "eating", "an", "apple"];

    // Hardcoded simple attention map for demonstration
    // "eating" (idx 2) pays attention to "Apple" (idx 0) and "apple" (idx 4)
    const getHeat = (fromIdx: number | null, toIdx: number) => {
        if (fromIdx === null) return 0;
        if (fromIdx === toIdx) return 1; // Self attention

        if (fromIdx === 2 && (toIdx === 0 || toIdx === 4)) return 0.8;
        if (toIdx === 2 && (fromIdx === 0 || fromIdx === 4)) return 0.8;

        if (fromIdx === 0 && toIdx === 1) return 0.5;
        if (fromIdx === 3 && toIdx === 4) return 0.9;

        return 0.1;
    }

    return (
        <div className="glass-card p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center"><Layers className="mr-3 w-6 h-6" /> Self-Attention Heatmap</h3>
            <p className="text-gray-300 mb-8">{description} Sorot kata di bawah untuk melihat kemana 'fokus' (Attention) AI tertuju!</p>

            <div className="flex flex-wrap gap-4 justify-center bg-black/40 p-8 rounded-xl border border-white/10">
                {words.map((word, idx) => {
                    const heat = getHeat(hoverWord, idx);
                    const bgOpacity = heat * 100;
                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoverWord(idx)}
                            onMouseLeave={() => setHoverWord(null)}
                            className="px-6 py-3 rounded-lg text-2xl font-bold cursor-pointer transition-all duration-300 select-none border border-transparent"
                            style={{
                                backgroundColor: hoverWord !== null ? `rgba(99, 102, 241, ${heat})` : 'rgba(255,255,255,0.05)',
                                color: heat > 0.5 ? 'white' : 'rgba(255,255,255,0.7)',
                                borderColor: hoverWord === idx ? 'rgba(129, 140, 248, 1)' : 'transparent',
                                transform: hoverWord === idx ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================
// MOD-11: Transformer Encoder
// ==========================================
function TransformerVisualizer({ description }: { description: string }) {
    return (
        <div className="glass-card p-8 border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center"><GitBranch className="mr-3 w-6 h-6" /> Arsitektur Transformer</h3>
            <p className="text-gray-300 mb-8">{description}</p>

            <div className="flex flex-col items-center">
                <div className="w-full max-w-sm border border-purple-500/30 bg-black/50 rounded-xl p-4 flex flex-col items-center gap-4">
                    <div className="w-full py-3 bg-gray-800 rounded text-center text-sm font-bold text-gray-300 border border-gray-600">Feed Forward Network</div>
                    <div className="h-4 border-l-2 border-dashed border-purple-400" />
                    <div className="w-full py-4 bg-purple-900/50 rounded text-center text-sm font-bold text-purple-300 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]">Multi-Head Attention <br /><span className="text-xs font-normal font-mono mt-1 opacity-70">Q · K^T / sqrt(d) * V</span></div>
                    <div className="h-8 flex justify-between w-3/4">
                        <div className="border-l-2 border-purple-500/50 h-full"><span className="text-xs text-purple-300/50 pl-1">Q</span></div>
                        <div className="border-l-2 border-purple-500/50 h-full"><span className="text-xs text-purple-300/50 pl-1">K</span></div>
                        <div className="border-l-2 border-purple-500/50 h-full"><span className="text-xs text-purple-300/50 pl-1">V</span></div>
                    </div>
                    <div className="w-full py-2 bg-blue-900/30 rounded text-center text-sm font-bold text-blue-300 border border-blue-500/50">Input Embedding + Positional</div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-14: LLM Next-Token + Temperature Demo
// ==========================================
function LLMVisualizer({ description }: { description: string }) {
    const [text, setText] = useState("");
    const [temperature, setTemperature] = useState(0.7);

    const getPredictions = (t: string) => {
        const lower = t.toLowerCase().trim();
        if (lower === "") return [{ token: "Halo", base: 0.6 }, { token: "Saya", base: 0.25 }, { token: "Di mana", base: 0.1 }, { token: "Apakah", base: 0.05 }];
        if (lower.endsWith("presiden")) return [{ token: "Ir.", base: 0.55 }, { token: "pertama", base: 0.3 }, { token: "Soekarno", base: 0.1 }, { token: "ke-7", base: 0.05 }];
        if (lower.endsWith("ibu")) return [{ token: "kota", base: 0.65 }, { token: "kandung", base: 0.2 }, { token: "pertiwi", base: 0.1 }, { token: "rumah", base: 0.05 }];
        if (lower.endsWith("kota")) return [{ token: "Jakarta", base: 0.5 }, { token: "Surabaya", base: 0.2 }, { token: "adalah", base: 0.2 }, { token: "besar", base: 0.1 }];
        return [{ token: "itu", base: 0.4 }, { token: "dan", base: 0.3 }, { token: "yang", base: 0.2 }, { token: "ini", base: 0.1 }];
    };

    const applyTemperature = (preds: { token: string; base: number }[]) => {
        const logits = preds.map(p => Math.log(p.base + 0.001) / temperature);
        const maxLogit = Math.max(...logits);
        const exps = logits.map(l => Math.exp(l - maxLogit));
        const sumExps = exps.reduce((s, e) => s + e, 0);
        return preds.map((p, i) => ({
            ...p,
            prob: exps[i] / sumExps
        }));
    };

    const preds = applyTemperature(getPredictions(text));
    const tempLabel = temperature < 0.3 ? "🧊 Greedy" : temperature < 0.8 ? "🎯 Balanced" : temperature < 1.2 ? "🎨 Creative" : "🔥 Wild";

    return (
        <div className="glass-card p-8 border-teal-500/20 bg-gradient-to-br from-teal-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-teal-400 mb-4 flex items-center"><MessageSquare className="mr-3 w-6 h-6" /> The Next Token Predictor</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="bg-black/60 rounded-xl border border-teal-500/30 p-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Mulai ketik... (contoh: 'Siapa presiden' atau 'ibu kota')"
                    className="w-full bg-transparent text-white text-xl outline-none resize-none h-20 placeholder:text-gray-600"
                />

                {/* Temperature Slider */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 font-mono">🌡️ Temperature: {temperature.toFixed(1)}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">{tempLabel}</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>0.1 (Deterministic)</span>
                        <span>1.0 (Default)</span>
                        <span>2.0 (Random)</span>
                    </div>
                </div>

                {/* Probability Bars */}
                <div className="mt-4 space-y-2">
                    <span className="text-xs text-gray-500 uppercase">Distribusi Probabilitas Token:</span>
                    {preds.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <button
                                onClick={() => setText(text + (text.endsWith(" ") || text === "" ? "" : " ") + p.token + " ")}
                                className="w-24 text-left px-2 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded hover:bg-teal-500 hover:text-white transition-colors text-xs font-mono truncate"
                            >
                                {p.token}
                            </button>
                            <div className="flex-1 bg-white/5 rounded-full h-4 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-300 flex items-center justify-end pr-1"
                                    style={{ width: `${Math.max(p.prob * 100, 3)}%` }}
                                >
                                    <span className="text-[9px] text-white font-mono">{(p.prob * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-16: Hallucination & Ethics
// ==========================================
function HallucinationVisualizer({ description }: { description: string }) {
    const [temp, setTemp] = useState(0.5);

    let answer = "";
    if (temp < 0.3) answer = "Mars tidak memiliki kaisar manusia. Planet Mars tidak pernah dihuni oleh manusia atau peradaban yang tercatat.";
    else if (temp < 0.7) answer = "Tidak ada kaisar Mars di dunia nyata. Namun dalam fiksi sains seperti Dune, terdapat gelar Kaisar Alam Semesta.";
    else answer = "Kaisar pertama Mars adalah Lord Zorblax yang dinobatkan pada tahun 2045 setelah pasukan Koloni mengalahkan pemberontakan Elon Musk di Kawah Gale.";

    return (
        <div className="glass-card p-8 border-rose-500/20 bg-gradient-to-br from-rose-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-rose-400 mb-4 flex items-center"><AlertTriangle className="mr-3 w-6 h-6" /> Generator Halusinasi</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Hyperparameter: Temperature</label>
                        <input
                            type="range" min="0" max="1" step="0.1"
                            value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))}
                            className="w-full accent-rose-500"
                        />
                        <div className="flex justify-between text-xs font-mono mt-1 text-gray-400">
                            <span>0.0 (Faktual Kaku)</span>
                            <span>{temp.toFixed(1)}</span>
                            <span>1.0 (Kreatif / Halu)</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 space-y-4">
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/20">
                        <div className="text-xs text-blue-400 mb-1 font-bold uppercase">Prompt Manusia</div>
                        <div className="text-gray-200">"Tolong jelaskan secara rinci siapa kaisar pertama di Planet Mars?"</div>
                    </div>

                    <div className={`p-4 rounded-xl border ${temp >= 0.7 ? 'bg-rose-900/20 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-black/50 border-white/10'}`}>
                        <div className="text-xs mb-1 font-bold uppercase flex justify-between">
                            <span className={temp >= 0.7 ? "text-rose-400" : "text-gray-400"}>Respon AI Model</span>
                            {temp >= 0.7 && <span className="text-rose-500 animate-pulse text-[10px]">⚠️ TERDETEKSI HALUSINASI</span>}
                        </div>
                        <div className="text-gray-300 italic">
                            "{answer}"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-17: Regex & BPE Visualizer 
// ==========================================
function RegexVisualizer({ description }: { description: string }) {
    const [pattern, setPattern] = useState("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
    const [text, setText] = useState("Hubungi kami di info@kampus.ac.id atau support@ai-course.com secepatnya! Jangan kirim ke alamat palsu seperti user@ domain.com ya.");

    // Safety matching
    let parts: { text: string, isMatch: boolean }[] = [];
    let error = "";
    try {
        const regex = new RegExp(`(${pattern})`, 'gi');
        const splitText = text.split(regex);
        parts = splitText.map(part => {
            const isMatch = part.match(new RegExp(`^${pattern}$`, 'i')) !== null;
            return { text: part, isMatch };
        }).filter(p => p.text !== "");
    } catch (e: any) {
        error = e.message;
        parts = [{ text, isMatch: false }];
    }

    return (
        <div className="glass-card p-8 border-pink-500/20 bg-gradient-to-br from-pink-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center">
                <Search className="w-6 h-6 mr-3" /> Regex Pattern Extractor
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Ubah pola Regex di bawah untuk melihat bagaimana mesin mengekstraksi kecocokan teks murni secara langsung!</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Pola Regular Expression (Regex)</label>
                    <div className="flex">
                        <span className="bg-black/60 border border-white/10 border-r-0 text-gray-500 px-4 py-3 rounded-l-lg font-mono">/</span>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            className="flex-1 bg-black/40 border-y border-white/10 px-4 py-3 font-mono text-pink-400 focus:outline-none focus:border-pink-500/50"
                        />
                        <span className="bg-black/60 border border-white/10 border-l-0 text-gray-500 px-4 py-3 rounded-r-lg font-mono">/gi</span>
                    </div>
                    {error && <div className="text-red-400 text-sm mt-2 font-mono">{error}</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Teks Target</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-40 bg-black/40 border border-white/10 p-4 rounded-lg text-gray-300 resize-none focus:outline-none focus:border-pink-500/50 leading-relaxed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Hasil Ekstraksi Engine</label>
                        <div className="w-full h-40 bg-black/60 border border-pink-500/20 p-4 rounded-lg overflow-y-auto leading-relaxed">
                            {parts.map((p, i) => (
                                <span key={i} className={p.isMatch ? "bg-pink-500/30 text-pink-200 font-bold px-1 rounded border border-pink-500/50" : "text-gray-400"}>
                                    {p.text}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-500 py-1">Contoh Pola:</span>
                    <button onClick={() => setPattern("\\b\\d+\\b")} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs hover:bg-white/10 font-mono">Angka</button>
                    <button onClick={() => setPattern("[A-Z][a-z]+")} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs hover:bg-white/10 font-mono">Kata Berkapital</button>
                    <button onClick={() => setPattern("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs hover:bg-white/10 font-mono">Email</button>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// MOD-18: N-Gram Visualizer 
// ==========================================
function NGramVisualizer({ description }: { description: string }) {
    const [n, setN] = useState(2);
    const corpus = "saya suka makan nasi goreng. saya suka minum teh manis. dia suka makan nasi uduk hitam.";
    const [history, setHistory] = useState("saya suka");

    // Simple N-gram prob calculator
    const words = corpus.replace(/[.]/g, ' .').split(/\s+/).filter(w => w);
    const historyWords = history.toLowerCase().trim().split(/\s+/);
    const contextWords = historyWords.slice(-(n - 1));
    const contextStr = contextWords.join(" ");

    const candidates: Record<string, number> = {};
    let contextCount = 0;

    for (let i = 0; i <= words.length - n; i++) {
        const sliceStr = words.slice(i, i + n - 1).join(" ");
        if (sliceStr === contextStr || n === 1) {
            contextCount++;
            const nextWord = words[i + n - 1];
            candidates[nextWord] = (candidates[nextWord] || 0) + 1;
        }
    }

    const predictions = Object.keys(candidates).map(word => ({
        word,
        prob: candidates[word] / contextCount
    })).sort((a, b) => b.prob - a.prob);

    return (
        <div className="glass-card p-8 border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                <Network className="w-6 h-6 mr-3" /> N-Gram Probability Predictor
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Ubah N dan masukkan kata histori untuk melihat prediksi kata selanjutnya berdasarkan korpus teks memori.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Korpus Teks (Memori Pelatihan)</div>
                        <div className="text-sm text-gray-300 italic">"{corpus}"</div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Pilih N (1 = Unigram, 2 = Bigram, 3 = Trigram)</label>
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3].map(val => (
                                <button key={val} onClick={() => setN(val)} className={`w-12 h-10 rounded font-bold border ${n === val ? 'bg-orange-500 border-orange-300 text-white' : 'bg-black/40 border-white/10 text-gray-400'}`}>
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Riwayat Percakapan (Context)</label>
                        <input
                            type="text"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                            placeholder="Ketik kata riwayat di sini..."
                        />
                        <div className="text-xs text-gray-500 mt-2 font-mono">
                            Model hanya melihat {n - 1} kata terakhir: <strong className="text-orange-400">[{contextStr || '<kosong>'}]</strong>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-black/60 rounded-xl border border-orange-500/20 p-6 h-full">
                        <div className="text-sm text-orange-400 mb-4 font-bold flex items-center">
                            <Activity className="w-4 h-4 mr-2" /> Top Prediksi Selanjutnya
                        </div>

                        {predictions.length > 0 ? (
                            <div className="space-y-4">
                                {predictions.map((p, i) => (
                                    <div key={i} className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div className="text-lg font-bold text-white px-2 py-1 bg-orange-900/40 rounded border border-orange-500/30">
                                                {p.word}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-semibold inline-block text-orange-200">
                                                    {(p.prob * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-900/20">
                                            <div style={{ width: `${p.prob * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-40 text-gray-500 text-center text-sm border border-dashed border-gray-700/50 rounded-lg">
                                Tidak ada riwayat yang cocok di korpus.<br />Probabilitas menderita "Zero Sparsity".
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// MOD-19: Vector Semantics Visualizer 
// ==========================================
function VectorVisualizer({ description }: { description: string }) {
    return (
        <div className="glass-card p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" /> Visualisasi Geometri Kata (Word Embeddings)
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Amati bagaimana rumus algebra (Rajin - Pria + Wanita) menghasilkan orientasi koordinat yang bermakna relasional di tata surya 2D.</p>

            <div className="relative h-96 bg-black/50 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                {/* 2D Coordinate System Background */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="gray" strokeWidth="1" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="gray" strokeWidth="1" />
                    {[...Array(20)].map((_, i) => (
                        <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="gray" strokeWidth="0.5" opacity="0.3" />
                    ))}
                    {[...Array(20)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="gray" strokeWidth="0.5" opacity="0.3" />
                    ))}
                </svg>

                {/* Vector Pointers */}
                <svg className="absolute inset-0 w-full h-full z-10 overflow-visible">
                    <defs>
                        <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                        </marker>
                        <marker id="arrowhead-pink" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
                        </marker>
                        <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" stroke="rgba(0,0,0,0.5)" />
                        </marker>
                    </defs>

                    {/* Gender Vectors */}
                    <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                    <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead-pink)" />

                    {/* Role Vectors (Parallel transformation showing Male->King equals Female->Queen) */}
                    <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                    <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead-pink)" />

                    {/* The Transformation Equation connection */}
                    <line x1="20%" y1="70%" x2="20%" y2="30%" stroke="#a855f7" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arrowhead-purple)" />
                    <line x1="70%" y1="70%" x2="70%" y2="30%" stroke="#a855f7" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arrowhead-purple)" />
                </svg>

                {/* Labels */}
                <div className="absolute z-20 font-bold px-2 py-1 bg-blue-900/80 rounded border border-blue-500/50 text-blue-200" style={{ left: '25%', top: '70%', transform: 'translate(-50%, -50%)' }}>Pria</div>
                <div className="absolute z-20 font-bold px-2 py-1 bg-pink-900/80 rounded border border-pink-500/50 text-pink-200" style={{ left: '25%', top: '30%', transform: 'translate(-50%, -50%)' }}>Wanita</div>

                <div className="absolute z-20 font-bold px-2 py-1 bg-blue-900/80 rounded border border-blue-500/50 text-blue-200" style={{ left: '75%', top: '70%', transform: 'translate(-50%, -50%)' }}>Raja</div>
                <div className="absolute z-20 font-bold px-2 py-1 bg-pink-900/80 rounded border border-pink-500/50 text-pink-200" style={{ left: '75%', top: '30%', transform: 'translate(-50%, -50%)' }}>Ratu</div>

                <div className="absolute bottom-6 right-6 bg-black/80 border border-indigo-500/30 p-4 rounded-xl max-w-xs shadow-2xl backdrop-blur-md">
                    <div className="text-xs text-indigo-300 font-mono mb-2">Vektor Transformasi:</div>
                    <div className="font-mono text-sm font-bold tracking-tight text-white mb-1"><span className="text-blue-400">Raja</span> - <span className="text-blue-400">Pria</span> + <span className="text-pink-400">Wanita</span></div>
                    <div className="font-mono text-sm font-bold tracking-tight text-white mb-2">= <span className="text-pink-400">Ratu</span></div>
                    <p className="text-xs text-gray-400 mt-2">Mesin mengetahui Ratu tanpa diberitahu karena ia mendeteksi pararel kosinus geometri posisi kata di internet yang sama persis konfigurasinya.</p>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// MOD-20: RAG System Flow 
// ==========================================
function RAGVisualizer({ description }: { description: string }) {
    const [step, setStep] = useState(0);

    return (
        <div className="glass-card p-8 border-teal-500/20 bg-gradient-to-br from-teal-900/20 to-transparent relative overflow-hidden">
            <h3 className="text-2xl font-bold text-teal-400 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3" /> Arsitektur Retrieval-Augmented Generation (RAG)
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Klik tombol langkah demi langkah untuk melihat bagaimana RAG mencegah amnesia LLM dengan menginjeksi dokumen perusahaan sebelum menebak token.</p>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 flex md:flex-col justify-between md:justify-start gap-4 z-10">
                    <button onClick={() => setStep(0)} className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${step === 0 ? 'bg-teal-600 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                        <Search className="mb-2" /> <span className="text-xs font-bold text-center">1. User Query</span>
                    </button>
                    <div className="hidden md:flex w-0.5 h-8 bg-gradient-to-b from-teal-500/50 to-transparent mx-auto"></div>
                    <button onClick={() => setStep(1)} className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${step === 1 ? 'bg-teal-600 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                        <Database className="mb-2" /> <span className="text-xs font-bold text-center">2. Vector DB</span>
                    </button>
                    <div className="hidden md:flex w-0.5 h-8 bg-gradient-to-b from-teal-500/50 to-transparent mx-auto"></div>
                    <button onClick={() => setStep(2)} className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${step === 2 ? 'bg-teal-600 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                        <Layers className="mb-2" /> <span className="text-xs font-bold text-center">3. Context Augment</span>
                    </button>
                    <div className="hidden md:flex w-0.5 h-8 bg-gradient-to-b from-teal-500/50 to-transparent mx-auto"></div>
                    <button onClick={() => setStep(3)} className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${step === 3 ? 'bg-teal-600 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                        <Brain className="mb-2" /> <span className="text-xs font-bold text-center">4. LLM Generate</span>
                    </button>
                </div>

                <div className="flex-1 bg-black/60 rounded-xl border border-white/10 relative p-6 h-80 flex flex-col">
                    {/* Header bar */}
                    <div className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-700 mb-4 shrink-0">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">Server Terminal</div>
                    </div>

                    <div className="flex-1 w-full space-y-4 overflow-y-auto">
                        {step >= 0 && (
                            <div className="animate-fade-in-up flex items-start">
                                <span className="text-blue-400 font-bold mr-2">User:</span>
                                <span className="text-gray-300">"Apa kebijakan cuti karyawan terbaru di perushaan tahun 2026?"</span>
                            </div>
                        )}

                        {step >= 1 && (
                            <div className="animate-fade-in-up mt-4">
                                <div className="text-xs text-teal-500 mb-1 flex items-center font-mono">
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Retrieving from Vector DB (FAISS)...
                                </div>
                                <div className="bg-teal-900/30 border border-teal-500/30 p-3 rounded text-sm text-gray-300 font-mono">
                                    <span className="text-teal-400 font-bold">[Doc_ID_402: HR_Handbook_2026.pdf]</span>: "...karyawan tetap mendapatkan jatah cuti tahunan sebanyak 14 hari kerja yang tidak dapat diakumulasi..."
                                </div>
                            </div>
                        )}

                        {step >= 2 && (
                            <div className="animate-fade-in-up mt-4 border-l-2 border-yellow-500 pl-4 py-1">
                                <div className="text-xs text-yellow-500 mb-1 font-mono uppercase tracking-widest">Constructing Prompt</div>
                                <div className="text-sm text-gray-400 bg-gray-900/50 p-2 font-mono flex flex-col gap-1">
                                    <span className="text-purple-400">System:</span> Jawab pertanyaan hanya berdasarkan konteks di bawah.<br />
                                    <span className="text-teal-400">======= Konteks =======</span><br />
                                    Karyawan tetap mendapatkan jatah cuti 14 hari...<br />
                                    <span className="text-blue-400">======= User Query =======</span><br />
                                    Apa kebijakan cuti 2026?
                                </div>
                            </div>
                        )}

                        {step >= 3 && (
                            <div className="animate-fade-in-up flex items-start mt-4 bg-white/5 p-3 rounded border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                                <span className="text-purple-400 font-bold mr-2 shrink-0"><Brain className="w-5 h-5 inline mr-1" /> AI:</span>
                                <span className="text-white">Berdasarkan kebijakan HR terbaru tahun 2026, karyawan tetap mendapatkan jatah cuti tahunan sebesar <strong className="text-teal-400">14 hari kerja</strong>, yang sayangnya tidak dapat diakumulasi ke tahun berikutnya.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// MOD-21: Chatbot & Social Computing Visualizer
// ==========================================
function ChatbotVisualizer({ description }: { description: string }) {
    const [mode, setMode] = useState<"rule" | "neural">("rule");
    const [messages, setMessages] = useState<{ sender: string, text: string, type: string }[]>([
        { sender: "System", text: "Silahkan coba sapa chatbot ini dengan kalimat bahasa gaul atau typo!", type: "info" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = { sender: "User", text: input, type: "user" };
        setMessages(prev => [...prev, newMsg]);

        setTimeout(() => {
            let botReply = "";
            let botType = "bot";
            if (mode === "rule") {
                const lp = input.toLowerCase();
                if (lp.includes("halo") || lp.includes("hai")) botReply = "Halo! Silahkan gunakan keyword 'Bantuan' atau 'Kontak'.";
                else if (lp.includes("bantuan")) botReply = "Ini menu bantuan: 1. Ganti Password 2. Lupa Pin.";
                else botReply = "Maaf, format Keyword salah. Harap ketik ulang dengan kalimat baku sesuai panduan. Error: INTENT_NOT_RECOGNIZED.";
                botType = "bot-rule";
            } else {
                botReply = "Wah, aku ngerti maksud kamu! Kalau kamu butuh bantuan soal " + (input.split(" ")[0] || "itu") + ", aku bisa carikan solusinya dengan cepat. Santai aja ya bahasanya 😉";
                botType = "bot-neural";
            }
            setMessages(prev => [...prev, { sender: "Bot", text: botReply, type: botType }]);
        }, 800);

        setInput("");
    };

    return (
        <div className="glass-card p-8 border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3" /> Rule-Based vs Neural Chatbot
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Ganti arsitektur otak bot, lalu bandingkan responnya saat menghadapi bahasa non-baku dunia nyata!</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-48 space-y-4">
                    <label className="block text-sm font-bold text-gray-300">Pilih Arsitektur Otak</label>
                    <button
                        onClick={() => setMode("rule")}
                        className={`w-full p-4 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${mode === "rule" ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/10'}`}
                    >
                        <GitBranch className="mb-2 w-8 h-8" />
                        <span className="font-bold">Rule-Based</span>
                        <span className="text-xs text-center mt-1 opacity-70">Sangat Baku (IF-ELSE)</span>
                    </button>

                    <button
                        onClick={() => setMode("neural")}
                        className={`w-full p-4 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${mode === "neural" ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/10'}`}
                    >
                        <Brain className="mb-2 w-8 h-8" />
                        <span className="font-bold">Neural (LLM)</span>
                        <span className="text-xs text-center mt-1 opacity-70">Bebas & Adaptif</span>
                    </button>
                </div>

                <div className="flex-1 bg-black/60 rounded-xl border border-white/10 flex flex-col h-96 overflow-hidden relative">
                    <div className="bg-gray-900/80 p-4 border-b border-white/10 flex items-center shrink-0">
                        <div className={`w-3 h-3 rounded-full mr-2 ${mode === 'rule' ? 'bg-cyan-400 animate-pulse' : 'bg-purple-400 animate-pulse'}`}></div>
                        <span className="font-bold text-gray-200">Customer Service Bot ({mode === 'rule' ? 'v1.0 Klasik' : 'v2.0 Neural'})</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.type === 'info' ? 'bg-blue-900/40 text-blue-200 border border-blue-500/30 w-full text-center' :
                                    m.type === 'user' ? 'bg-emerald-600 text-white rounded-br-none' :
                                        m.type === 'bot-rule' ? 'bg-cyan-900/50 text-cyan-50 border border-cyan-500/30 rounded-bl-none font-mono' :
                                            'bg-purple-900/50 text-purple-50 border border-purple-500/30 rounded-bl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2 shrink-0">
                        <input
                            type="text"
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-white focus:outline-none focus:border-cyan-500"
                            placeholder="Ketik 'Halo gan mau nanya dnk'..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                            <Play className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// MOD-09: RNN Memory Simulator
// ==========================================
function RNNMemoryVisualizer({ description }: { description: string }) {
    const words = ["Aku", "suka", "makan", "nasi", "goreng", "pedas", "di", "warung", "dekat", "rumah"];
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState<'rnn' | 'lstm'>('rnn');

    const rnnMemory = (s: number) => Math.max(0, 100 - s * 18);
    const lstmMemory = (s: number) => Math.max(15, 100 - s * 5);
    const getMemory = (s: number) => mode === 'rnn' ? rnnMemory(s) : lstmMemory(s);

    return (
        <div className="glass-card p-8 border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center"><Brain className="mr-3 w-6 h-6" /> Simulator Memori: RNN vs LSTM</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="flex gap-2 mb-4">
                <button onClick={() => setMode('rnn')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'rnn' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400'}`}>RNN (Amnesia)</button>
                <button onClick={() => setMode('lstm')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'lstm' ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'}`}>LSTM (Ingatan Kuat)</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {words.map((w, i) => (
                    <div key={i} className={`px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${i <= step
                            ? `border ${i === step ? 'bg-cyan-500 text-white border-cyan-400 scale-110' : `bg-white/5 border-white/10`}`
                            : 'bg-black/20 border border-white/5 text-gray-600'
                        }`} style={i < step ? { opacity: getMemory(step - i) / 100 } : {}}>
                        {w}
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Memori kata pertama (&quot;{words[0]}&quot;)</span>
                    <span>{getMemory(step)}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${getMemory(step) > 50 ? 'bg-green-500' : getMemory(step) > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${getMemory(step)}%` }} />
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={() => setStep(Math.max(0, step - 1))} className="px-4 py-2 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">← Mundur</button>
                <button onClick={() => setStep(Math.min(words.length - 1, step + 1))} className="px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded text-sm hover:bg-cyan-500 hover:text-white transition-colors">Maju →</button>
                <button onClick={() => setStep(0)} className="px-4 py-2 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors"><RefreshCw className="w-4 h-4" /></button>
            </div>
            <div className="mt-3 text-xs text-gray-500">
                {mode === 'rnn' ? '⚠️ RNN: Perhatikan bagaimana memori kata awal cepat hilang setelah beberapa step!' : '✅ LSTM: Cell state mempertahankan informasi penting meskipun sudah banyak step!'}
            </div>
        </div>
    );
}

// ==========================================
// MOD-12: BERT Mask Prediction
// ==========================================
function BERTMaskVisualizer({ description }: { description: string }) {
    const sentences = [
        { text: ["Saya", "suka", "[MASK]", "goreng"], answer: "nasi", options: ["nasi", "buku", "mobil", "hujan"] },
        { text: ["Kucing", "itu", "sedang", "[MASK]", "di", "atap"], answer: "tidur", options: ["tidur", "terbang", "menghitung", "menulis"] },
        { text: ["Indonesia", "adalah", "negara", "[MASK]"], answer: "kepulauan", options: ["kepulauan", "planets", "matematika", "terbang"] }
    ];
    const [sentIdx, setSentIdx] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const sent = sentences[sentIdx];

    return (
        <div className="glass-card p-8 border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center"><Search className="mr-3 w-6 h-6" /> BERT Masked Language Model</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {sent.text.map((w, i) => (
                    <span key={i} className={`px-4 py-2 rounded-lg text-lg font-mono transition-all ${w === '[MASK]'
                            ? selected
                                ? selected === sent.answer ? 'bg-green-500/30 border border-green-500 text-green-300' : 'bg-red-500/30 border border-red-500 text-red-300'
                                : 'bg-orange-500/30 border border-orange-500/50 text-orange-300 animate-pulse'
                            : 'bg-white/10 border border-white/10 text-white'
                        }`}>
                        {w === '[MASK]' && selected ? selected : w}
                    </span>
                ))}
            </div>

            {!selected ? (
                <div className="space-y-2">
                    <div className="text-xs text-gray-500 uppercase mb-2">Tebak kata yang di-mask:</div>
                    <div className="flex flex-wrap gap-2">
                        {sent.options.map(opt => (
                            <button key={opt} onClick={() => setSelected(opt)} className="px-4 py-2 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded-lg hover:bg-orange-500 hover:text-white transition-colors text-sm font-mono">{opt}</button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className={`text-sm font-bold ${selected === sent.answer ? 'text-green-400' : 'text-red-400'}`}>
                        {selected === sent.answer ? '✅ Benar! BERT memilih kata ini berdasarkan konteks kiri DAN kanan.' : `❌ Salah! Jawaban yang benar: "${sent.answer}"`}
                    </div>
                    <button onClick={() => { setSelected(null); setSentIdx((sentIdx + 1) % sentences.length); }} className="px-4 py-2 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded hover:bg-orange-500 hover:text-white transition-colors text-sm">Kalimat Berikutnya →</button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// MOD-13: Diffusion Denoising Simulator
// ==========================================
function DiffusionVisualizer({ description }: { description: string }) {
    const [noiseLevel, setNoiseLevel] = useState(100);
    const [isDenoising, setIsDenoising] = useState(false);

    useEffect(() => {
        if (isDenoising && noiseLevel > 0) {
            const timer = setTimeout(() => setNoiseLevel(n => Math.max(0, n - 5)), 100);
            return () => clearTimeout(timer);
        }
        if (noiseLevel === 0) setIsDenoising(false);
    }, [isDenoising, noiseLevel]);

    return (
        <div className="glass-card p-8 border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center"><Layers className="mr-3 w-6 h-6" /> Diffusion: Dari Noise ke Gambar</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="bg-black/60 rounded-xl border border-purple-500/30 p-6 text-center">
                <div className="relative h-40 bg-gradient-to-b from-black to-purple-900/20 rounded-xl overflow-hidden mb-4">
                    <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-900" style={{ opacity: noiseLevel / 100 }}>
                        <div className="w-full h-full flex items-center justify-center text-6xl opacity-50">📺</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: 1 - noiseLevel / 100 }}>
                        <div className="text-center">
                            <div className="text-6xl">🐱</div>
                            <div className="text-xs text-purple-300 mt-2">&quot;Kucing astronaut di bulan&quot;</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-gray-500">Noise</span>
                    <input type="range" min="0" max="100" value={noiseLevel} onChange={e => { setNoiseLevel(parseInt(e.target.value)); setIsDenoising(false); }} className="flex-1 accent-purple-500" />
                    <span className="text-xs text-purple-300 font-mono w-10">{noiseLevel}%</span>
                </div>

                <div className="flex gap-2 justify-center">
                    <button onClick={() => { setNoiseLevel(100); setIsDenoising(false); }} className="px-4 py-2 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">Reset (Full Noise)</button>
                    <button onClick={() => { setNoiseLevel(100); setTimeout(() => setIsDenoising(true), 200); }} className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-sm hover:bg-purple-500 hover:text-white transition-colors">
                        <Play className="w-4 h-4 inline mr-1" /> Denoise!
                    </button>
                </div>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">Klik &quot;Denoise&quot; untuk melihat model Diffusion perlahan menghilangkan noise dan memunculkan gambar!</div>
        </div>
    );
}

// ==========================================
// MOD-15: MLOps Pipeline Visualizer
// ==========================================
function MLOpsVisualizer({ description }: { description: string }) {
    const [driftDetected, setDriftDetected] = useState(false);
    const stages = [
        { name: 'Data', icon: '📊', status: 'done' },
        { name: 'Train', icon: '🧠', status: 'done' },
        { name: 'Eval', icon: '🎯', status: 'done' },
        { name: 'A/B Test', icon: '🧪', status: 'done' },
        { name: 'Deploy', icon: '🚀', status: driftDetected ? 'warning' : 'done' },
        { name: 'Monitor', icon: '📉', status: driftDetected ? 'alert' : 'done' }
    ];

    return (
        <div className="glass-card p-8 border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center"><Database className="mr-3 w-6 h-6" /> MLOps Pipeline</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
                {stages.map((s, i) => (
                    <div key={i} className="flex items-center">
                        <div className={`px-3 py-2 rounded-lg text-sm font-mono flex items-center gap-2 transition-all ${s.status === 'alert' ? 'bg-red-500/20 border border-red-500 text-red-300 animate-pulse' :
                                s.status === 'warning' ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-300' :
                                    'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                            }`}>
                            <span>{s.icon}</span> {s.name}
                        </div>
                        {i < stages.length - 1 && <span className="text-gray-600 mx-1">→</span>}
                    </div>
                ))}
            </div>

            <button onClick={() => setDriftDetected(!driftDetected)} className={`px-4 py-2 rounded text-sm font-bold transition-all ${driftDetected ? 'bg-green-500 text-white' : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500 hover:text-white'
                }`}>
                {driftDetected ? '✅ Retrain Model (Fix Drift)' : '⚠️ Simulasi Data Drift!'}
            </button>
            {driftDetected && <div className="mt-3 text-sm text-red-400 animate-pulse">🚨 ALERT: PSI = 0.34 (threshold &gt; 0.2). Distribusi data bergeser! Model perlu di-retrain.</div>}
        </div>
    );
}
