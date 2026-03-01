"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Play, RefreshCw, Layers, Brain, GitBranch, Target, Search, MessageSquare, AlertTriangle, FastForward, Database, Network, Activity } from "lucide-react";

export default function InteractiveVisualization({ moduleId, description }: { moduleId: string, description: string }) {
    switch (moduleId) {
        case "MOD-01": return <AITimelineVisualizer description={description} />
        case "MOD-02": return <MLPipelineVisualizer description={description} />
        case "MOD-03": return <BiasVarianceVisualizers description={description} />
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
        case "MOD-14": return <RAGVisualizer description={description} />
        case "MOD-15":
        case "MOD-16": return <QLearningVisualizer description={description} />
        case "MOD-17": return <DQNVisualizer description={description} />
        case "MOD-18": return <LLMVisualizer description={description} />
        case "MOD-19": return <NLPVisualizers description={description} />
        case "MOD-20": return <ViTVisualizer description={description} />
        case "MOD-21": return <MLOpsVisualizer description={description} />
        case "MOD-22": return <ActorCriticVisualizer description={description} />
        case "MOD-23": return <TimeSeriesVisualizer description={description} />
        case "MOD-24": return <ViTVisualizer description={description} />
        case "MOD-25": return <AudioSpectrogramVisualizer description={description} />
        case "MOD-26": return <MultimodalCLIPVisualizer description={description} />
        case "MOD-27": return <GNNVisualizer description={description} />
        case "MOD-28": return <BayesianOptVisualizer description={description} />
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
// MOD-25: Audio Spectrogram Synthesizer
// ==========================================
function AudioSpectrogramVisualizer({ description }: { description: string }) {
    const ROWS = 24; // freq bins
    const COLS = 60; // time frames
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPos, setPlayPos] = useState(0);
    const [waveType, setWaveType] = useState<'human' | 'music' | 'noise'>('human');
    const [volume, setVolume] = useState(80);

    const generateSpec = (type: 'human' | 'music' | 'noise') => {
        return Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => {
                if (type === 'human') {
                    const f1 = Math.exp(-((r - 5) ** 2) / 4) * Math.sin(c * 0.3) * 0.5 + 0.5;
                    const f2 = Math.exp(-((r - 11) ** 2) / 5) * Math.cos(c * 0.2) * 0.4 + 0.3;
                    return Math.max(0, Math.min(1, f1 * 0.7 + f2 * 0.5 + (Math.sin(c + r) * 0.05)));
                } else if (type === 'music') {
                    const harmonics = [2, 4, 6, 8, 12, 16].map(h =>
                        Math.exp(-((r - h) ** 2) / 1.5) * (0.6 + 0.4 * Math.sin(c * 0.5 + h))
                    );
                    return Math.max(0, Math.min(1, harmonics.reduce((a, b: number) => a + b, 0) * 0.5));
                } else {
                    return Math.max(0, Math.min(1, Math.abs(Math.sin(r * 7.3 + c * 3.1 + r * c * 0.01)) * 0.8));
                }
            })
        );
    };

    const spec = generateSpec(waveType);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            setPlayPos(p => {
                if (p >= COLS - 1) { setIsPlaying(false); return 0; }
                return p + 1;
            });
        }, 60);
        return () => clearInterval(id);
    }, [isPlaying]);

    return (
        <div className="glass-card p-6 border-green-500/20 bg-gradient-to-br from-green-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-green-400 mb-1 flex items-center">
                <Activity className="mr-3 w-6 h-6" /> Audio Spectrogram Visualizer
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <div className="text-xs text-green-400/70 font-mono mb-2 flex justify-between">
                        <span>Frekuensi (Mel Scale) ↑</span>
                        <span className={isPlaying ? 'text-green-400 animate-pulse' : 'text-gray-500'}>
                            {isPlaying ? '▶ PLAYING...' : '■ STOPPED'} frame {playPos}/{COLS}
                        </span>
                    </div>
                    <div className="relative border border-green-500/20 rounded overflow-hidden" style={{ fontSize: 0 }}>
                        {spec.slice().reverse().map((row, ri) => (
                            <div key={ri} className="flex">
                                {row.map((val, ci) => {
                                    const isHead = ci === playPos && isPlaying;
                                    const brightness = val * (volume / 100);
                                    return (
                                        <div key={ci} style={{
                                            width: `${100 / COLS}%`,
                                            height: 6,
                                            background: isHead
                                                ? 'rgba(255,255,255,0.9)'
                                                : `hsl(${Math.round(120 - brightness * 120)}, 90%, ${Math.round(15 + brightness * 55)}%)`,
                                            transition: 'background 0.05s'
                                        }} />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>t=0</span><span>← Waktu (frame) →</span><span>t={COLS}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-green-400 mb-2 font-bold">Tipe Sinyal Audio</div>
                        {(['human', 'music', 'noise'] as const).map(t => (
                            <button key={t} onClick={() => { setWaveType(t); setPlayPos(0); setIsPlaying(false); }}
                                className={`w-full mb-1 px-3 py-2 rounded text-sm text-left font-medium border transition-all ${waveType === t ? 'bg-green-500/20 text-green-300 border-green-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:border-green-500/30'
                                    }`}>
                                {t === 'human' ? '🗣️ Suara Manusia' : t === 'music' ? '🎵 Musik (Harmonik)' : '📻 Noise (Acak)'}
                            </button>
                        ))}
                    </div>

                    <div className="bg-black/30 rounded p-3 border border-white/5">
                        <div className="text-xs text-green-400 mb-1 font-bold">Volume: {volume}%</div>
                        <input type="range" min={10} max={100} value={volume} onChange={(e: any) => setVolume(Number(e.target.value))} className="w-full accent-green-500" />
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => { setPlayPos(0); setIsPlaying(true); }}
                            disabled={isPlaying}
                            className="flex-1 px-3 py-2 bg-green-500/20 text-green-300 border border-green-500/40 rounded text-sm font-bold hover:bg-green-500 hover:text-black transition-all disabled:opacity-40">
                            ▶ Play
                        </button>
                        <button onClick={() => { setIsPlaying(false); setPlayPos(0); }}
                            className="flex-1 px-3 py-2 bg-white/5 text-gray-400 border border-white/10 rounded text-sm hover:bg-white/10 transition-all">
                            ■ Stop
                        </button>
                    </div>

                    <div className="bg-black/20 rounded p-3 border border-white/5 text-xs text-gray-400 leading-relaxed">
                        <span className="text-green-400 font-bold">Mel Scale:</span> Sumbu frekuensi dikompres sesuai persepsi manusia.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-26: Multimodal CLIP Similarity Demo
// ==========================================
function MultimodalCLIPVisualizer({ description }: { description: string }) {
    const ITEMS = [
        { image: '🐕', label: 'Anjing berlari', tags: ['anjing', 'hewan', 'berlari', 'mamalia'] },
        { image: '🍕', label: 'Pizza margherita', tags: ['pizza', 'makanan', 'Italia', 'lezat'] },
        { image: '🌅', label: 'Matahari terbenam', tags: ['alam', 'langit', 'matahari', 'indah'] },
        { image: '🚗', label: 'Mobil sport merah', tags: ['mobil', 'kendaraan', 'merah', 'cepat'] },
        { image: '📚', label: 'Tumpukan buku', tags: ['buku', 'pengetahuan', 'belajar', 'perpustakaan'] },
        { image: '🏔️', label: 'Puncak gunung bersalju', tags: ['gunung', 'alam', 'salju', 'tinggi'] },
    ];

    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(false);

    const computeSimilarity = (q: string, tags: string[], label: string) => {
        if (!q.trim()) return 0;
        const qLow = q.toLowerCase();
        const allTerms = [...tags, ...label.toLowerCase().split(' ')];
        const exact = allTerms.filter(t => t.includes(qLow) || qLow.includes(t)).length;
        const partial = allTerms.filter(t => t.slice(0, 3) === qLow.slice(0, 3)).length;
        return Math.min(1, (exact * 0.4 + partial * 0.15) + (Math.random() * 0.05));
    };

    const scores = searched && query
        ? ITEMS.map(item => ({ ...item, score: computeSimilarity(query, item.tags, item.label) }))
            .sort((a, b) => b.score - a.score)
        : ITEMS.map(item => ({ ...item, score: 0 }));

    const handleSearch = () => setSearched(true);

    return (
        <div className="glass-card p-6 border-pink-500/20 bg-gradient-to-br from-pink-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-pink-400 mb-1 flex items-center">
                <Search className="mr-3 w-6 h-6" /> CLIP: Multimodal Text-Image Search
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>

            <div className="flex gap-2 mb-5">
                <input
                    value={query}
                    onChange={(e: any) => { setQuery(e.target.value); setSearched(false); }}
                    onKeyDown={(e: any) => e.key === 'Enter' && handleSearch()}
                    placeholder="Ketik teks query (contoh: 'anjing', 'makanan', 'alam')..."
                    className="flex-1 bg-black/40 border border-pink-500/30 rounded px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-400"
                />
                <button onClick={handleSearch}
                    className="px-4 py-2 bg-pink-500/20 text-pink-300 border border-pink-500/40 rounded text-sm font-bold hover:bg-pink-500 hover:text-white transition-all">
                    🔍 Cari
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {scores.map((item, i) => (
                    <div key={item.label} className={`relative rounded-xl border p-4 text-center transition-all duration-300 ${searched && item.score > 0.3 ? 'border-pink-400 bg-pink-500/10 scale-105 shadow-lg shadow-pink-500/20'
                        : searched && item.score > 0.1 ? 'border-pink-500/30 bg-pink-900/10'
                            : 'border-white/10 bg-white/5 opacity-60'
                        }`}>
                        {searched && i === 0 && <div className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">TOP</div>}
                        <div className="text-4xl mb-2">{item.image}</div>
                        <div className="text-xs text-gray-300 mb-2">{item.label}</div>
                        {searched && (
                            <div className="mt-2">
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-700"
                                        style={{ width: `${item.score * 100}%` }} />
                                </div>
                                <div className="text-xs text-pink-400 font-mono mt-1">
                                    sim = {item.score.toFixed(2)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-xs text-gray-500 bg-black/20 rounded p-3 border border-white/5 text-xs text-gray-400 leading-relaxed">
                <span className="text-pink-400 font-bold">CLIP Principle:</span> Model mengembedding teks dan gambar ke ruang vektor yang sama.
            </div>
        </div>
    );
}

// ==========================================
// MOD-27: GNN Message Passing Visualizer
// ==========================================
function GNNVisualizer({ description }: { description: string }) {
    const NODES = [
        { id: 0, x: 200, y: 80, label: 'A', feature: 1.0, color: '#8b5cf6' },
        { id: 1, x: 80, y: 200, label: 'B', feature: 0.6, color: '#06b6d4' },
        { id: 2, x: 320, y: 200, label: 'C', feature: 0.8, color: '#10b981' },
        { id: 3, x: 130, y: 330, label: 'D', feature: 0.3, color: '#f59e0b' },
        { id: 4, x: 270, y: 330, label: 'E', feature: 0.9, color: '#ef4444' },
        { id: 5, x: 200, y: 420, label: 'F', feature: 0.5, color: '#ec4899' },
    ];
    const EDGES = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5]];

    const [layer, setLayer] = useState(0);
    const [activeEdge, setActiveEdge] = useState<number[] | null>(null);
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    const computeFeatures = (l: number) => {
        let feats = NODES.map(n => n.feature);
        for (let i = 0; i < l; i++) {
            const newFeats = feats.map((f, n) => {
                const neighbors = EDGES.filter(([a, b]: any) => a === n || b === n)
                    .map(([a, b]: any) => a === n ? b : a);
                if (neighbors.length === 0) return f;
                const agg = neighbors.reduce((sum: number, nb: number) => sum + feats[nb], 0) / neighbors.length;
                return Math.min(1, (f + agg) / 2 * 1.05);
            });
            feats = newFeats;
        }
        return feats;
    };

    const feats = computeFeatures(layer);

    const getNodeNeighbors = (id: number) =>
        EDGES.filter(([a, b]: any) => a === id || b === id).map(([a, b]: any) => a === id ? b : a);

    return (
        <div className="glass-card p-6 border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-cyan-400 mb-1 flex items-center">
                <Network className="mr-3 w-6 h-6" /> GNN — Message Passing Simulator
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <svg viewBox="0 0 400 500" className="w-full max-h-80 border border-cyan-500/20 rounded bg-black/30">
                    {EDGES.map(([a, b], i) => {
                        const na = NODES[a], nb = NODES[b];
                        const isActive = activeEdge && ((activeEdge[0] === a && activeEdge[1] === b) || (activeEdge[0] === b && activeEdge[1] === a));
                        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={isActive ? '#22d3ee' : 'rgba(255,255,255,0.1)'} strokeWidth={isActive ? 2.5 : 1} />;
                    })}
                    {NODES.map(n => (
                        <g key={n.id} onMouseEnter={() => setHoveredNode(n.id)} onMouseLeave={() => setHoveredNode(null)}>
                            <circle cx={n.x} cy={n.y} r={22 + feats[n.id] * 10} fill={n.color} opacity={0.2 + feats[n.id] * 0.7} />
                            <text x={n.x} y={n.y} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">{n.label}</text>
                        </g>
                    ))}
                </svg>
                <div className="flex flex-col gap-3">
                    <div className="bg-black/30 rounded p-3 border border-white/5">
                        <div className="text-xs text-cyan-400 mb-2 font-bold">Layer GNN: {layer}</div>
                        <input type="range" min={0} max={4} value={layer} onChange={(e: any) => setLayer(Number(e.target.value))} className="w-full accent-cyan-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-28: Bayesian HPO Optimizer Visualizer
// ==========================================
function BayesianOptVisualizer({ description }: { description: string }) {
    const [observations, setObservations] = useState<{ x: number, y: number }[]>([]);
    const [step, setStep] = useState(0);
    const [best, setBest] = useState<{ x: number, y: number } | null>(null);

    const trueFunc = (x: number) => 0.4 * Math.sin(x * 0.8) + 0.3 * Math.cos(x * 2.1) + 0.2 * Math.sin(x * 4.5) + 0.6;

    const sampleNext = () => {
        const nextX = Math.random() * 10;
        const nextY = trueFunc(nextX);
        const newObs = [...observations, { x: nextX, y: nextY }];
        setObservations(newObs);
        if (!best || nextY > best.y) setBest({ x: nextX, y: nextY });
        setStep(s => s + 1);
    };

    return (
        <div className="glass-card p-6 border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-orange-400 mb-1 flex items-center">
                <Brain className="mr-3 w-6 h-6" /> Bayesian HPO Simulator
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>
            <div className="flex gap-4 items-center">
                <button onClick={sampleNext} className="px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded font-bold">Lakukan Evaluasi (Step {step})</button>
                {best && <div className="text-amber-400 font-mono text-sm">Best Accuracy: {best.y.toFixed(3)}</div>}
            </div>
        </div>
    );
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
// ==========================================
// MOD-03: Bias-Variance Tabbed Visualizers
// ==========================================
function BiasVarianceVisualizers({ description }: { description: string }) {
    const tabs = [
        { id: 'bv', label: '⚖️ Bias-Variance' },
        { id: 'roc', label: '📈 ROC Curve' },
        { id: 'imbalance', label: '🎯 Class Imbalance' },
    ];
    const [activeTab, setActiveTab] = useState('bv');

    return (
        <div className="glass-card p-6 md:p-8 border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-orange-400 mb-2 flex items-center">
                <Target className="w-6 h-6 mr-3" /> Demo Interaktif: Bias, Variance & Evaluasi Model
            </h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'bv' && <BiasVarianceDemo />}
            {activeTab === 'roc' && <ROCCurveDemo />}
            {activeTab === 'imbalance' && <ImbalanceVisualizer description={description} />}
        </div>
    );
}

function BiasVarianceDemo() {
    const [complexity, setComplexity] = useState(5);

    const bias = Math.max(0.05, 1 - complexity * 0.12);
    const variance = Math.max(0.05, complexity * 0.1);
    const totalError = bias + variance;
    const sweet = totalError < 0.75;

    return (
        <div className="space-y-5">
            <div>
                <label className="text-xs font-mono text-cyan-400 mb-2 block uppercase tracking-wider">
                    Kompleksitas Model (1 = Underfitting, 10 = Overfitting)
                </label>
                <input type="range" min={1} max={10} value={complexity} onChange={e => setComplexity(+e.target.value)}
                    className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Sederhana (Linear)</span>
                    <span>Kompleksitas: {complexity}</span>
                    <span>Kompleks (Polinomial tinggi)</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-xl border border-blue-500/20 p-4 text-center">
                    <div className="text-xs font-mono text-blue-400 mb-1 uppercase">Bias²</div>
                    <div className="text-3xl font-bold text-blue-300">{bias.toFixed(2)}</div>
                    <div className="h-3 bg-black/50 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-blue-500/60 rounded-full transition-all duration-300" style={{ width: `${bias * 100}%` }} />
                    </div>
                </div>
                <div className="bg-black/40 rounded-xl border border-red-500/20 p-4 text-center">
                    <div className="text-xs font-mono text-red-400 mb-1 uppercase">Variance</div>
                    <div className="text-3xl font-bold text-red-300">{variance.toFixed(2)}</div>
                    <div className="h-3 bg-black/50 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-red-500/60 rounded-full transition-all duration-300" style={{ width: `${variance * 100}%` }} />
                    </div>
                </div>
                <div className={`bg-black/40 rounded-xl border p-4 text-center ${sweet ? 'border-emerald-500/30' : 'border-amber-500/30'}`}>
                    <div className="text-xs font-mono text-gray-400 mb-1 uppercase">Total Error</div>
                    <div className={`text-3xl font-bold ${sweet ? 'text-emerald-300' : 'text-amber-300'}`}>{totalError.toFixed(2)}</div>
                    <div className="h-3 bg-black/50 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${sweet ? 'bg-emerald-500/60' : 'bg-amber-500/60'}`} style={{ width: `${Math.min(totalError * 50, 100)}%` }} />
                    </div>
                </div>
            </div>

            <div className={`p-4 rounded-xl text-sm ${complexity <= 2 ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300' : complexity >= 8 ? 'bg-red-500/10 border border-red-500/20 text-red-300' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'}`}>
                {complexity <= 2 && '⚠️ Underfitting — Model terlalu sederhana, Bias tinggi. Model tidak mampu menangkap pola data.'}
                {complexity >= 3 && complexity <= 7 && '✅ Sweet Spot — Model cukup kompleks untuk menangkap pola tanpa menghafal noise.'}
                {complexity >= 8 && '⚠️ Overfitting — Model terlalu kompleks, Variance tinggi. Model menghafal noise pada data training.'}
            </div>
        </div>
    );
}

function ROCCurveDemo() {
    const [threshold, setThreshold] = useState(0.5);

    // Simulated data for ROC
    const points = [
        { fpr: 0, tpr: 0 },
        { fpr: 0.05, tpr: 0.35 },
        { fpr: 0.1, tpr: 0.55 },
        { fpr: 0.15, tpr: 0.65 },
        { fpr: 0.2, tpr: 0.72 },
        { fpr: 0.3, tpr: 0.82 },
        { fpr: 0.4, tpr: 0.88 },
        { fpr: 0.5, tpr: 0.92 },
        { fpr: 0.6, tpr: 0.95 },
        { fpr: 0.7, tpr: 0.97 },
        { fpr: 0.8, tpr: 0.98 },
        { fpr: 0.9, tpr: 0.99 },
        { fpr: 1, tpr: 1 },
    ];

    // Calculate current point based on threshold
    const idx = Math.min(Math.floor((1 - threshold) * (points.length - 1)), points.length - 1);
    const current = points[idx];

    // AUC approximation
    const auc = 0.87;

    // Confusion matrix values based on threshold
    const totalP = 50; const totalN = 50;
    const tp = Math.round(current.tpr * totalP);
    const fp = Math.round(current.fpr * totalN);
    const fn = totalP - tp;
    const tn = totalN - fp;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? 2 * precision * recall / (precision + recall) : 0;

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ROC Curve SVG */}
                <div className="bg-black/50 rounded-xl border border-white/10 p-4">
                    <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">ROC Curve (AUC = {auc})</div>
                    <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
                        {/* Grid */}
                        {[0.25, 0.5, 0.75].map(v => (
                            <g key={v}>
                                <line x1={v * 180 + 10} y1={10} x2={v * 180 + 10} y2={190} stroke="gray" strokeWidth="0.3" opacity="0.3" />
                                <line x1={10} y1={190 - v * 180} x2={190} y2={190 - v * 180} stroke="gray" strokeWidth="0.3" opacity="0.3" />
                            </g>
                        ))}
                        {/* Diagonal */}
                        <line x1={10} y1={190} x2={190} y2={10} stroke="gray" strokeWidth="0.5" strokeDasharray="4" opacity="0.4" />
                        {/* AUC fill */}
                        <polygon
                            points={points.map(p => `${p.fpr * 180 + 10},${190 - p.tpr * 180}`).join(' ') + ' 190,190 10,190'}
                            fill="rgba(59,130,246,0.15)" stroke="none"
                        />
                        {/* ROC line */}
                        <polyline
                            points={points.map(p => `${p.fpr * 180 + 10},${190 - p.tpr * 180}`).join(' ')}
                            fill="none" stroke="#3b82f6" strokeWidth="2"
                        />
                        {/* Current point */}
                        <circle cx={current.fpr * 180 + 10} cy={190 - current.tpr * 180} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                        {/* Labels */}
                        <text x={100} y={205} textAnchor="middle" fill="#9ca3af" fontSize="8">False Positive Rate (FPR)</text>
                        <text x={-100} y={6} textAnchor="middle" fill="#9ca3af" fontSize="8" transform="rotate(-90)">True Positive Rate (TPR)</text>
                    </svg>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-mono text-cyan-400 mb-1 block uppercase tracking-wider">
                            Threshold Klasifikasi: {threshold.toFixed(2)}
                        </label>
                        <input type="range" min={0.05} max={0.95} step={0.05} value={threshold}
                            onChange={e => setThreshold(+e.target.value)} className="w-full accent-amber-500" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Semua Positif</span><span>Semua Negatif</span>
                        </div>
                    </div>

                    {/* Confusion Matrix */}
                    <div className="bg-black/40 rounded-xl border border-white/10 p-3">
                        <div className="text-xs font-mono text-gray-500 mb-2">Confusion Matrix</div>
                        <div className="grid grid-cols-2 gap-1 text-center text-xs font-mono">
                            <div className="bg-emerald-500/15 text-emerald-300 p-2 rounded">TP: {tp}</div>
                            <div className="bg-red-500/15 text-red-300 p-2 rounded">FP: {fp}</div>
                            <div className="bg-amber-500/15 text-amber-300 p-2 rounded">FN: {fn}</div>
                            <div className="bg-blue-500/15 text-blue-300 p-2 rounded">TN: {tn}</div>
                        </div>
                    </div>

                    {/* Metrics display */}
                    <div className="space-y-2">
                        {[
                            { label: 'Precision', value: precision, color: 'violet' },
                            { label: 'Recall (TPR)', value: recall, color: 'blue' },
                            { label: 'F1-Score', value: f1, color: 'emerald' },
                        ].map(m => (
                            <div key={m.label} className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-400 w-24">{m.label}</span>
                                <div className="flex-1 h-5 bg-black/50 rounded overflow-hidden border border-white/5 relative">
                                    <div className={`h-full bg-${m.color}-500/50 rounded transition-all duration-300`} style={{ width: `${m.value * 100}%` }} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-300">{(m.value * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-17: DQN Interactive Demo
// ==========================================
function DQNVisualizer({ description }: { description: string }) {
    const [step, setStep] = useState(0);
    const [replayBuffer, setReplayBuffer] = useState<{ s: string; a: string; r: number; s2: string }[]>([]);

    const actions = ['⬆️ Atas', '➡️ Kanan', '⬇️ Bawah', '⬅️ Kiri'];
    const states = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

    const takeAction = () => {
        const s = states[Math.floor(Math.random() * states.length)];
        const a = actions[Math.floor(Math.random() * actions.length)];
        const r = Math.random() > 0.7 ? +(Math.random() * 10).toFixed(1) : -(Math.random() * 3).toFixed(1);
        const s2 = states[Math.floor(Math.random() * states.length)];
        const entry = { s, a, r: +r, s2 };
        setReplayBuffer(prev => [...prev.slice(-9), entry]);
        setStep(prev => prev + 1);
    };

    const trainBatch = () => {
        if (replayBuffer.length < 3) return;
        setStep(prev => prev + 1);
    };

    return (
        <div className="glass-card p-6 md:p-8 border-red-500/20 bg-gradient-to-br from-red-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-red-400 mb-2 flex items-center">
                <Brain className="w-6 h-6 mr-3" /> Demo DQN: Experience Replay & Neural Q-Network
            </h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <button onClick={takeAction}
                            className="flex-1 px-4 py-3 bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 rounded-xl text-red-200 font-bold text-sm transition-all flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" /> Agen Ambil Aksi
                        </button>
                        <button onClick={trainBatch} disabled={replayBuffer.length < 3}
                            className="flex-1 px-4 py-3 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 rounded-xl text-violet-200 font-bold text-sm transition-all disabled:opacity-30 flex items-center justify-center gap-2">
                            <Brain className="w-4 h-4" /> Train Mini-Batch
                        </button>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-gray-500">
                        <span>Episode Step: {step}</span>
                        <span>Buffer Size: {replayBuffer.length}/10</span>
                    </div>

                    {/* Neural Network Q-Values */}
                    <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                        <div className="text-xs font-mono text-violet-400 mb-3 uppercase tracking-wider">Neural Network Q(s, a)</div>
                        <div className="space-y-2">
                            {actions.map((a, i) => {
                                const qval = (Math.sin(step * 0.3 + i) * 3 + 5).toFixed(2);
                                const isMax = i === (step % 4);
                                return (
                                    <div key={a} className="flex items-center gap-3">
                                        <span className="text-xs font-mono w-20 text-gray-400">{a}</span>
                                        <div className="flex-1 h-6 bg-black/50 rounded overflow-hidden border border-white/5 relative">
                                            <div className={`h-full rounded transition-all duration-300 ${isMax ? 'bg-emerald-500/60' : 'bg-violet-500/30'}`}
                                                style={{ width: `${(+qval / 10) * 100}%` }} />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-300">
                                                Q={qval} {isMax && '← argmax'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Experience Replay Buffer */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                    <div className="text-xs font-mono text-red-400 mb-3 uppercase tracking-wider">
                        Experience Replay Buffer D
                    </div>
                    {replayBuffer.length === 0 ? (
                        <div className="text-gray-500 text-sm italic text-center py-8">Klik &ldquo;Agen Ambil Aksi&rdquo; untuk mengisi buffer...</div>
                    ) : (
                        <div className="space-y-1.5 max-h-72 overflow-y-auto">
                            {replayBuffer.map((entry, i) => (
                                <div key={i} className={`flex items-center gap-2 text-xs font-mono p-2 rounded-lg border transition-all ${i === replayBuffer.length - 1 ? 'bg-red-500/10 border-red-500/20' : 'bg-black/30 border-white/5'}`}>
                                    <span className="text-gray-500 w-4">#{i}</span>
                                    <span className="text-blue-300">{entry.s}</span>
                                    <span className="text-gray-600">→</span>
                                    <span className="text-amber-300">{entry.a}</span>
                                    <span className="text-gray-600">→</span>
                                    <span className={entry.r >= 0 ? 'text-emerald-300' : 'text-red-300'}>R:{entry.r}</span>
                                    <span className="text-gray-600">→</span>
                                    <span className="text-blue-300">{entry.s2}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-3 pt-2 border-t border-white/5 text-xs text-gray-500 italic">
                        Saat training, mini-batch acak diambil dari buffer ini untuk memutus korelasi temporal (i.i.d. sampling).
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-22: Actor-Critic Interactive Demo
// ==========================================
function ActorCriticVisualizer({ description }: { description: string }) {
    const [state, setState] = useState(0);
    const [history, setHistory] = useState<{ s: number; a: string; r: number; v: number; adv: number }[]>([]);

    const stateNames = ['Mulai', 'Persimpangan A', 'Jalan Sempit', 'Lorong Gelap', 'Dekat Target', 'TARGET 🏆'];

    const takeStep = () => {
        const s = state;
        const actions = ['Maju', 'Belok', 'Tunggu'];
        const a = actions[Math.floor(Math.random() * 3)];

        // Critic estimates value
        const v = +(s * 1.5 + Math.random() * 2).toFixed(2);

        // Reward
        const r = a === 'Maju' ? +(2 + Math.random() * 3).toFixed(1) : +(Math.random() * 1.5 - 0.5).toFixed(1);

        // Advantage = R - V (TD error)
        const adv = +(r - v + (state < 5 ? state * 0.5 : 0)).toFixed(2);

        setHistory(prev => [...prev.slice(-7), { s, a, r: +r, v, adv }]);

        // Progress state
        if (a === 'Maju' && state < 5) {
            setState(prev => prev + 1);
        } else if (Math.random() > 0.7 && state > 0) {
            setState(prev => prev - 1);
        }
    };

    const reset = () => {
        setState(0);
        setHistory([]);
    };

    return (
        <div className="glass-card p-6 md:p-8 border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center">
                <Network className="w-6 h-6 mr-3" /> Demo Actor-Critic: Policy & Value Estimation
            </h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State + Controls */}
                <div className="space-y-4">
                    {/* State Progress */}
                    <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                        <div className="text-xs font-mono text-purple-400 mb-3 uppercase tracking-wider">State Agen</div>
                        <div className="flex items-center gap-1">
                            {stateNames.map((name, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i === state
                                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30 scale-110'
                                        : i < state ? 'bg-emerald-600/30 border-emerald-500/30 text-emerald-300' : 'bg-black/30 border-white/10 text-gray-500'
                                        }`}>
                                        {i}
                                    </div>
                                    {i < stateNames.length - 1 && <div className={`w-3 h-0.5 ${i < state ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-300 mt-2 font-mono">{stateNames[state]}</div>
                    </div>

                    {/* Actor (Policy) */}
                    <div className="bg-black/40 rounded-xl border border-violet-500/15 p-4">
                        <div className="text-xs font-mono text-violet-400 mb-2 uppercase tracking-wider">🎭 Actor — Policy π(a|s)</div>
                        {['Maju', 'Belok', 'Tunggu'].map(a => {
                            const prob = a === 'Maju' ? 0.5 + state * 0.05 : a === 'Belok' ? 0.3 - state * 0.02 : 0.2 - state * 0.03;
                            return (
                                <div key={a} className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-gray-400 w-14">{a}</span>
                                    <div className="flex-1 h-4 bg-black/50 rounded overflow-hidden">
                                        <div className="h-full bg-violet-500/40 rounded transition-all" style={{ width: `${Math.max(prob, 0.05) * 100}%` }} />
                                    </div>
                                    <span className="text-xs font-mono text-gray-400 w-12">{(Math.max(prob, 0.05) * 100).toFixed(0)}%</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Critic (Value) */}
                    <div className="bg-black/40 rounded-xl border border-cyan-500/15 p-4">
                        <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">🧑‍⚖️ Critic — Value V(s)</div>
                        <div className="text-2xl font-bold text-cyan-300">V(s{state}) = {(state * 1.5 + 1).toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">Estimasi total reward yang diharapkan dari state saat ini</div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={takeStep}
                            className="flex-1 px-4 py-3 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 rounded-xl text-purple-200 font-bold text-sm transition-all flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" /> Langkah Berikutnya
                        </button>
                        <button onClick={reset}
                            className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 text-sm transition-all">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* History / Advantage */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                    <div className="text-xs font-mono text-amber-400 mb-3 uppercase tracking-wider">
                        Advantage A(s,a) = R + γV(s&apos;) − V(s)
                    </div>
                    {history.length === 0 ? (
                        <div className="text-gray-500 text-sm italic text-center py-8">Klik &ldquo;Langkah Berikutnya&rdquo; untuk memulai...</div>
                    ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {history.map((h, i) => (
                                <div key={i} className={`p-3 rounded-lg border text-xs font-mono ${h.adv >= 0 ? 'bg-emerald-500/5 border-emerald-500/15' : 'bg-red-500/5 border-red-500/15'}`}>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <span className="text-blue-300">S{h.s}</span>
                                        <span className="text-gray-600">→</span>
                                        <span className="text-amber-300">{h.a}</span>
                                        <span className="text-gray-600">|</span>
                                        <span className={h.r >= 0 ? 'text-emerald-300' : 'text-red-300'}>R={h.r}</span>
                                        <span className="text-gray-600">|</span>
                                        <span className="text-cyan-300">V={h.v}</span>
                                    </div>
                                    <div className={`mt-1 font-bold ${h.adv >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        Advantage = {h.adv >= 0 ? '+' : ''}{h.adv} {h.adv >= 0 ? '→ Perkuat aksi ini' : '→ Kurangi probabilitas aksi ini'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-3 pt-2 border-t border-white/5 text-xs text-gray-500 italic">
                        Advantage positif → Actor meningkatkan probabilitas aksi tersebut. Negatif → probabilitas diturunkan.
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    const [alg, setAlg] = useState<'kmeans' | 'dbscan'>('kmeans');
    const [step, setStep] = useState(0);

    return (
        <div className="glass-card p-8 border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-violet-400 mb-4 flex items-center">
                <Target className="mr-3 w-6 h-6" /> Unsupervised Learning: Clustering
            </h3>
            <p className="text-gray-300 mb-6">{description}</p>

            {/* Algorithm Toggle */}
            <div className="flex bg-black/50 p-1 rounded-lg w-fit border border-white/10 mb-6">
                <button
                    onClick={() => { setAlg('kmeans'); setStep(0); }}
                    className={`px-4 py-1.5 text-sm rounded ${alg === 'kmeans' ? 'bg-violet-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                    K-Means
                </button>
                <button
                    onClick={() => { setAlg('dbscan'); setStep(0); }}
                    className={`px-4 py-1.5 text-sm rounded ${alg === 'dbscan' ? 'bg-violet-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                    DBSCAN
                </button>
            </div>

            {alg === 'kmeans' ? (
                // --- K-MEANS DEMO ---
                <>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={() => setStep(0)} className="px-3 py-1.5 bg-black/50 hover:bg-white/10 text-white rounded border border-white/10 text-xs shadow-sm">1. Random Data</button>
                        <button onClick={() => setStep(1)} className="px-3 py-1.5 bg-black/50 hover:bg-white/10 text-violet-300 rounded border border-violet-500/30 text-xs shadow-sm">2. Init Centroids</button>
                        <button onClick={() => setStep(2)} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded text-xs shadow-sm">3. Group & Move Centroids</button>
                    </div>

                    <div className="h-64 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
                        {/* Cluster 1 Points */}
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '20%', top: '30%', transition: 'background 0.5s' }} />
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '25%', top: '20%', transition: 'background 0.5s' }} />
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '30%', top: '35%', transition: 'background 0.5s' }} />

                        {/* Cluster 2 Points */}
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '70%', top: '60%', transition: 'background 0.5s' }} />
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '75%', top: '75%', transition: 'background 0.5s' }} />
                        <div className={`absolute w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '60%', top: '70%', transition: 'background 0.5s' }} />

                        {/* Centroids */}
                        {step >= 1 && (
                            <>
                                <div className="absolute w-6 h-6 bg-transparent border-4 border-fuchsia-400 rounded-full transition-all duration-1000 ease-in-out -ml-3 -mt-3 shadow-[0_0_15px_#d946ef]" style={step >= 2 ? { left: '25%', top: '28%' } : { left: '50%', top: '50%' }}>
                                    <span className="absolute -top-6 -left-2 text-xs text-fuchsia-400 font-bold bg-black/50 px-1 rounded">C1</span>
                                </div>
                                <div className="absolute w-6 h-6 bg-transparent border-4 border-cyan-400 rounded-full transition-all duration-1000 ease-in-out -ml-3 -mt-3 shadow-[0_0_15px_#06b6d4]" style={step >= 2 ? { left: '68%', top: '68%' } : { left: '40%', top: '40%' }}>
                                    <span className="absolute -top-6 -left-2 text-xs text-cyan-400 font-bold bg-black/50 px-1 rounded">C2</span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-black/30 border border-white/5 rounded text-sm text-gray-300 font-mono">
                        {step === 0 && "🔵 Data mentah belum dikelompokkan (Unlabeled). Titik abu-abu tersebar acak."}
                        {step === 1 && "📌 2 Centroid inisial (C1 & C2) dijatuhkan secara acak ke kanvas."}
                        {step === 2 && "✨ Data menempel ke centroid terdekatnya. Centroid lalu bergeser mencari pusat gravitasi kelompok barunya!"}
                    </div>
                </>
            ) : (
                // --- DBSCAN DEMO ---
                <>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={() => setStep(0)} className="px-3 py-1.5 bg-black/50 hover:bg-white/10 text-white rounded border border-white/10 text-xs shadow-sm">1. Density Check</button>
                        <button onClick={() => setStep(1)} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded text-xs shadow-sm">2. Expand & Isolate Noise</button>
                    </div>

                    <div className="h-64 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
                        {/* Core Points (Dense Region A) */}
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-fuchsia-500 shadow-[0_0_15px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '20%', top: '40%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-fuchsia-500 shadow-[0_0_15px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '22%', top: '45%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-fuchsia-500 shadow-[0_0_15px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '25%', top: '38%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-fuchsia-500 shadow-[0_0_15px_#d946ef]' : 'bg-gray-500'}`} style={{ left: '18%', top: '42%' }} />

                        {/* Core Points (Dense Region B - non-spherical) */}
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '60%', top: '20%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '65%', top: '25%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '70%', top: '35%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '75%', top: '45%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-500'}`} style={{ left: '80%', top: '55%' }} />

                        {/* Noise Points */}
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 border-2 ${step >= 1 ? 'bg-transparent border-red-500 z-10' : 'bg-gray-500 border-transparent'}`} style={{ left: '40%', top: '80%' }} />
                        <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 border-2 ${step >= 1 ? 'bg-transparent border-red-500 z-10' : 'bg-gray-500 border-transparent'}`} style={{ left: '10%', top: '80%' }} />

                        {step >= 1 && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                {/* Connect B */}
                                <polyline points="60%,20% 65%,25% 70%,35% 75%,45% 80%,55%" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4" />
                            </svg>
                        )}

                        {/* Epsilon Radius visual helper */}
                        {step === 0 && (
                            <div className="absolute w-16 h-16 rounded-full border border-white/20 bg-white/5 -ml-8 -mt-8 animate-pulse" style={{ left: '22%', top: '42%' }}></div>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-black/30 border border-white/5 rounded text-sm text-gray-300 font-mono">
                        {step === 0 && "🔍 DBSCAN memindai radius sekeliling titik (Epsilon). Jika banyak teman di dekatnya, ia menjadi Core Point."}
                        {step === 1 && "🔗 Cluster meluas menularkan warnanya ke tetangga yang rapat. Titik yang jauh sendirian (merah) dibuang sebagai 'Noise'!"}
                    </div>
                </>
            )}
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
                {/* Input Layer */}
                <div className="flex flex-col gap-6 z-10 relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-300 uppercase tracking-widest whitespace-nowrap bg-black/50 px-2 py-1 rounded">Input Layer</div>
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white/20">
                            x{i + 1}
                        </div>
                    ))}
                </div>

                {/* Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    {[0, 1, 2].map(i => (
                        <line
                            key={i}
                            x1="15%" y1={`${23 + i * 27}%`}
                            x2="85%" y2="50%"
                            stroke={weights[i] === 1 ? "#06b6d4" : "#334155"}
                            strokeWidth={weights[i] === 1 ? 4 : 2}
                            style={{ transition: "stroke 0.3s, stroke-width 0.3s", pointerEvents: "all", cursor: "pointer" }}
                            onClick={() => toggleWeight(i)}
                            className="hover:stroke-cyan-300"
                        />
                    ))}
                    {/* Weight Labels */}
                    {[0, 1, 2].map(i => (
                        <text
                            key={`w-${i}`}
                            x="45%" y={`${30 + i * 20}%`}
                            fill={weights[i] === 1 ? "#06b6d4" : "#64748b"}
                            className="text-[10px] font-mono select-none"
                            style={{ transition: "fill 0.3s" }}
                        >
                            w{i + 1}={weights[i]}
                        </text>
                    ))}
                </svg>

                {/* Output Layer */}
                <div className="flex flex-col justify-center h-full z-10 relative">
                    <div className="absolute top-[32%] left-1/2 -translate-x-1/2 text-xs font-bold text-fuchsia-300 uppercase tracking-widest whitespace-nowrap bg-black/50 px-2 py-1 rounded">Output Neuron</div>
                    <div className="w-16 h-16 rounded-full bg-fuchsia-500 flex items-center justify-center font-bold text-lg shadow-[0_0_25px_rgba(217,70,239,0.8)] border-4 border-white/20">
                        Σ
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between font-mono text-sm bg-black/50 p-4 rounded-lg border border-white/5">
                <div className="text-blue-300">Input: [1.0, 0.5, -0.2]</div>
                <div className="text-cyan-300 flex-1 text-center font-bold">Sum = Σ(w·x) = {(1.0 * weights[0] + 0.5 * weights[1] - 0.2 * weights[2]).toFixed(2)}</div>
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
// ==========================================
// MOD-19: Multi-Tab NLP Visualizers
// ==========================================
function NLPVisualizers({ description }: { description: string }) {
    const tabs = [
        { id: 'regex', label: '🔍 Regex', icon: Search },
        { id: 'ngram', label: '🔗 N-Gram', icon: GitBranch },
        { id: 'tfidf', label: '📊 TF-IDF', icon: Activity },
        { id: 'vector', label: '🧭 Embedding', icon: Target },
    ];
    const [activeTab, setActiveTab] = useState('regex');

    return (
        <div className="glass-card p-6 md:p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-indigo-400 mb-2 flex items-center">
                <Brain className="w-6 h-6 mr-3" /> Laboratorium NLP Interaktif
            </h3>
            <p className="text-gray-400 text-sm mb-6">Eksplorasi 4 konsep fundamental NLP melalui demo interaktif. Klik tab untuk berpindah topik.</p>

            {/* Tab Bar */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/50'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'regex' && <RegexDemo />}
            {activeTab === 'ngram' && <NGramDemo />}
            {activeTab === 'tfidf' && <TFIDFDemo />}
            {activeTab === 'vector' && <VectorVisualizer description={description} />}
        </div>
    );
}

// --- Regex Demo ---
function RegexDemo() {
    const [pattern, setPattern] = useState('[A-Z][a-z]+');
    const [testText, setTestText] = useState('Selamat Pagi Indonesia! Saya sedang Belajar NLP di Jakarta.');
    const [matches, setMatches] = useState<string[]>([]);
    const [highlighted, setHighlighted] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            if (!pattern) { setMatches([]); setHighlighted(testText); setError(''); return; }
            const regex = new RegExp(pattern, 'g');
            const found = testText.match(regex) || [];
            setMatches(found);
            setError('');
            // Highlight matches in the text
            const hl = testText.replace(regex, (m) => `<mark class="bg-emerald-500/30 text-emerald-200 px-0.5 rounded border border-emerald-500/30">${m}</mark>`);
            setHighlighted(hl);
        } catch (e: any) {
            setError(e.message);
            setHighlighted(testText);
            setMatches([]);
        }
    }, [pattern, testText]);

    const presets = [
        { label: 'Kata Kapital', pattern: '[A-Z][a-z]+' },
        { label: 'Angka', pattern: '\\d+' },
        { label: 'Email', pattern: '[\\w.]+@[\\w.]+' },
        { label: 'Tanda Baca', pattern: '[!?.,:;]' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                    <button key={p.label} onClick={() => setPattern(p.pattern)}
                        className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${pattern === p.pattern ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                        {p.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-mono text-cyan-400 mb-1 block uppercase tracking-wider">Pola Regex</label>
                    <input value={pattern} onChange={e => setPattern(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-green-400 font-mono text-sm focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30" placeholder="Masukkan pola regex..." />
                </div>
                <div>
                    <label className="text-xs font-mono text-cyan-400 mb-1 block uppercase tracking-wider">Teks Input</label>
                    <input value={testText} onChange={e => setTestText(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 text-sm focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30" placeholder="Masukkan teks untuk diuji..." />
                </div>
            </div>
            {error && <div className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-2 rounded">⚠️ {error}</div>}
            <div className="bg-black/40 rounded-xl border border-white/10 p-5">
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Hasil Pencocokan</div>
                <div className="text-gray-200 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: highlighted }} />
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-500">{matches.length} kecocokan ditemukan</span>
                    {matches.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">{matches.map((m, i) => (
                            <span key={i} className="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 text-xs rounded font-mono border border-emerald-500/20">{m}</span>
                        ))}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- N-Gram Demo ---
function NGramDemo() {
    const corpus = 'Selamat pagi Indonesia. Selamat pagi dunia. Selamat siang semua. Selamat malam Indonesia.';
    const [inputWord, setInputWord] = useState('selamat');

    const words = corpus.toLowerCase().replace(/[.!?]/g, '').split(/\s+/);
    const bigrams: Record<string, Record<string, number>> = {};
    const unigramCounts: Record<string, number> = {};

    words.forEach((w, i) => {
        unigramCounts[w] = (unigramCounts[w] || 0) + 1;
        if (i < words.length - 1) {
            if (!bigrams[w]) bigrams[w] = {};
            const next = words[i + 1];
            bigrams[w][next] = (bigrams[w][next] || 0) + 1;
        }
    });

    const predictions = bigrams[inputWord.toLowerCase()] || {};
    const totalCount = unigramCounts[inputWord.toLowerCase()] || 0;
    const sorted = Object.entries(predictions).sort((a, b) => b[1] - a[1]);
    const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

    return (
        <div className="space-y-4">
            <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Korpus Training</div>
                <p className="text-gray-300 text-sm italic leading-relaxed">&ldquo;{corpus}&rdquo;</p>
            </div>
            <div>
                <label className="text-xs font-mono text-cyan-400 mb-1 block uppercase tracking-wider">Kata Input (prediksi kata selanjutnya)</label>
                <div className="flex gap-3">
                    <input value={inputWord} onChange={e => setInputWord(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-blue-400 font-mono text-sm focus:border-blue-500/50 focus:outline-none" placeholder="Ketik kata..." />
                    <div className="flex gap-2">
                        {['selamat', 'pagi', 'indonesia'].map(w => (
                            <button key={w} onClick={() => setInputWord(w)} className={`px-3 py-1 rounded-lg text-xs font-mono border transition ${inputWord === w ? 'bg-blue-600/30 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>{w}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-black/40 rounded-xl border border-white/10 p-5">
                <div className="text-xs font-mono text-violet-400 mb-3 uppercase tracking-wider">
                    Prediksi Bigram: P(? | &ldquo;{inputWord}&rdquo;) — Count(&ldquo;{inputWord}&rdquo;) = {totalCount}
                </div>
                {sorted.length > 0 ? (
                    <div className="space-y-3">
                        {sorted.map(([word, count]) => {
                            const prob = totalCount > 0 ? count / totalCount : 0;
                            return (
                                <div key={word} className="flex items-center gap-3">
                                    <span className="font-mono text-sm text-white w-24 text-right font-bold">{word}</span>
                                    <div className="flex-1 h-8 bg-black/50 rounded-lg overflow-hidden border border-white/5 relative">
                                        <div className="h-full bg-gradient-to-r from-violet-600/60 to-indigo-500/60 rounded-lg transition-all duration-500" style={{ width: `${(count / maxCount) * 100}%` }} />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-300">{count}/{totalCount} = {(prob * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-500 text-sm italic text-center py-4">Kata &ldquo;{inputWord}&rdquo; tidak ditemukan dalam korpus. Coba kata lain!</div>
                )}
            </div>
        </div>
    );
}

// --- TF-IDF Demo ---
function TFIDFDemo() {
    const docs = [
        { label: 'Dok 1', text: 'kucing makan ikan segar di pasar ikan' },
        { label: 'Dok 2', text: 'anjing bermain bola di taman kota' },
        { label: 'Dok 3', text: 'kucing dan anjing bermain bersama di taman' },
    ];
    const [selectedWord, setSelectedWord] = useState('kucing');

    // Build TF-IDF
    const allWords = [...new Set(docs.flatMap(d => d.text.split(/\s+/)))].sort();
    const N = docs.length;

    const tfIdfScores = allWords.map(word => {
        const df = docs.filter(d => d.text.includes(word)).length;
        const idf = df > 0 ? Math.log(N / df) : 0;
        const scores = docs.map(d => {
            const words = d.text.split(/\s+/);
            const tf = words.filter(w => w === word).length;
            return { tf, idf: +idf.toFixed(3), tfidf: +(tf * idf).toFixed(3) };
        });
        return { word, df, idf: +idf.toFixed(3), scores };
    });

    const selected = tfIdfScores.find(s => s.word === selectedWord);
    const maxTfIdf = Math.max(...tfIdfScores.flatMap(s => s.scores.map(sc => sc.tfidf)), 0.01);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {docs.map((d, i) => (
                    <div key={i} className="bg-black/40 rounded-xl border border-white/10 p-4">
                        <div className="text-xs font-mono text-cyan-400 mb-1">{d.label}</div>
                        <p className="text-gray-300 text-sm">&ldquo;{d.text}&rdquo;</p>
                    </div>
                ))}
            </div>
            <div>
                <label className="text-xs font-mono text-cyan-400 mb-2 block uppercase tracking-wider">Pilih kata untuk analisis TF-IDF</label>
                <div className="flex flex-wrap gap-1.5">
                    {allWords.map(w => (
                        <button key={w} onClick={() => setSelectedWord(w)}
                            className={`px-2.5 py-1 rounded text-xs font-mono border transition ${selectedWord === w ? 'bg-amber-600/30 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>{w}</button>
                    ))}
                </div>
            </div>
            {selected && (
                <div className="bg-black/40 rounded-xl border border-white/10 p-5 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-mono text-amber-400">Kata: <strong className="text-white">&ldquo;{selectedWord}&rdquo;</strong></span>
                        <span className="font-mono text-gray-400">df = {selected.df}/{N}</span>
                        <span className="font-mono text-gray-400">IDF = log({N}/{selected.df}) = <strong className="text-violet-400">{selected.idf}</strong></span>
                    </div>
                    <div className="space-y-3">
                        {selected.scores.map((sc, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-400 w-12">{docs[i].label}</span>
                                <span className="text-xs font-mono text-gray-300 w-16">TF={sc.tf}</span>
                                <div className="flex-1 h-7 bg-black/50 rounded-lg overflow-hidden border border-white/5 relative">
                                    <div className="h-full bg-gradient-to-r from-amber-600/60 to-orange-500/60 rounded-lg transition-all duration-500" style={{ width: `${maxTfIdf > 0 ? (sc.tfidf / maxTfIdf) * 100 : 0}%` }} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-300">TF-IDF = {sc.tfidf}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selected.idf === 0 && (
                        <div className="text-xs text-amber-400/70 italic bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg">
                            ⚠️ Kata ini muncul di semua dokumen sehingga IDF = 0. Artinya kata ini dianggap tidak informatif oleh TF-IDF!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function VectorVisualizer({ description }: { description: string }) {
    return (
        <div className="glass-card p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" /> Visualisasi Geometri Kata (Word Embeddings)
            </h3>
            <p className="text-gray-300 mb-8">{description}. <br /><strong>Instruksi:</strong> Amati bagaimana rumus algebra (Raja - Pria + Wanita) menghasilkan orientasi koordinat yang bermakna relasional di tata surya 2D.</p>

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

                    {/* Royalty Vectors (Horizontal) */}
                    <line x1="15%" y1="75%" x2="43%" y2="75%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-blue)" />
                    <line x1="15%" y1="35%" x2="43%" y2="35%" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

                    {/* Gender Vectors (Vertical) */}
                    <line x1="15%" y1="75%" x2="15%" y2="37%" stroke="#ec4899" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-pink)" />
                    <line x1="45%" y1="75%" x2="45%" y2="37%" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead-pink)" />

                    {/* The Transformation Equation connection (Diagonal Raja-Pria+Wanita = Ratu) */}
                    <line x1="15%" y1="75%" x2="44%" y2="36%" stroke="#a855f7" strokeWidth="2" strokeDasharray="2" markerEnd="url(#arrowhead-purple)" />
                </svg>

                {/* Labels */}
                <div className="absolute z-20 font-bold px-3 py-1.5 bg-slate-900/90 border border-slate-500/50 text-white rounded shadow-lg" style={{ left: '15%', top: '75%', transform: 'translate(-50%, -50%)' }}>Pria</div>
                <div className="absolute z-20 font-bold px-3 py-1.5 bg-pink-900/90 border border-pink-500/50 text-pink-100 rounded shadow-lg" style={{ left: '15%', top: '35%', transform: 'translate(-50%, -50%)' }}>Wanita</div>

                <div className="absolute z-20 font-bold px-3 py-1.5 bg-blue-900/90 border border-blue-500/50 text-blue-100 rounded shadow-lg" style={{ left: '45%', top: '75%', transform: 'translate(-50%, -50%)' }}>Raja</div>
                <div className="absolute z-20 font-bold px-3 py-1.5 bg-fuchsia-900/90 border border-fuchsia-500/50 text-fuchsia-100 rounded shadow-lg ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-black" style={{ left: '45%', top: '35%', transform: 'translate(-50%, -50%)' }}>Ratu</div>

                {/* Info block pushed to bottom right */}
                <div className="absolute bottom-4 right-4 bg-black/90 border border-indigo-500/50 p-5 rounded-xl shadow-2xl backdrop-blur-md z-30 w-full sm:w-auto sm:max-w-xs">
                    <div className="text-sm text-indigo-300 font-mono mb-3 uppercase tracking-wider">Vektor Transformasi</div>
                    <div className="font-mono text-sm leading-relaxed font-bold tracking-tight text-white mb-2">
                        <span className="text-blue-400 border-b border-blue-400/30 pb-0.5">Vektor(Raja)</span> <br />
                        <span className="text-slate-400">- Vektor(Pria)</span> <br />
                        <span className="text-pink-400">+ Vektor(Wanita)</span>
                    </div>
                    <div className="font-mono text-lg font-bold tracking-tight text-white mt-3 border-t border-white/10 pt-2">
                        = <span className="text-fuchsia-400">Vektor(Ratu)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mt-3">Mesin memahami bahwa jarak orientasi makna dari Pria ke Wanita, sejajar paralel secara utuh dengan jarak dari Raja ke Ratu.</p>
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
                if (lp === "halo" || lp === "hai") {
                    botReply = "Halo! Silahkan gunakan keyword 'Bantuan' atau 'Kontak'.";
                } else if (lp === "bantuan") {
                    botReply = "Ini menu bantuan:\n1. Ganti Password\n2. Lupa Pin\nKetik angka pilihan Anda.";
                } else if (lp === "1" || lp.includes("ganti password")) {
                    botReply = "Silahkan kunjungi link berikut untuk mengganti password: https://company.com/reset. Jika link tidak bisa diklik, error: UNKNOWN_ACTION.";
                } else if (lp === "2" || lp.includes("lupa pin")) {
                    botReply = "Mohon datang ke kantor cabang terdekat dengan membawa KTP dan Buku Tabungan. Kami tidak bisa memproses lupa PIN secara online.";
                } else if (lp === "kontak") {
                    botReply = "Silahkan hubungi 1-500-123 pada jam kerja (08:00 - 15:00 WIB).";
                } else {
                    botReply = "Maaf, format Keyword salah. Harap ketik ulang dengan kalimat baku sesuai panduan. Error: INTENT_NOT_RECOGNIZED.";
                }
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
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${m.type === 'info' ? 'bg-blue-900/40 text-blue-200 border border-blue-500/30 w-full text-center' :
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

// ==========================================
// MOD-22: Q-Learning Maze Simulator
// ==========================================
function QLearningVisualizer({ description }: { description: string }) {
    const GRID = 5;
    const GOAL = GRID * GRID - 1;
    const WALL_CELLS = new Set([6, 7, 12, 17, 22]);
    const ACTIONS = ['up', 'down', 'left', 'right'] as const;
    type Action = typeof ACTIONS[number];

    const initQ = () => Array.from({ length: GRID * GRID }, () => ({ up: 0, down: 0, left: 0, right: 0 }));
    const [qTable, setQTable] = useState(initQ);
    const [agentPos, setAgentPos] = useState(0);
    const [episode, setEpisode] = useState(0);
    const [totalReward, setTotalReward] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Tekan "Mulai Training" untuk melihat agen belajar menemukan jalan keluar!');
    const [visitCount, setVisitCount] = useState(Array(GRID * GRID).fill(0));
    const [speed, setSpeed] = useState(180);

    const moveAgent = (pos: number, action: Action): number => {
        const row = Math.floor(pos / GRID), col = pos % GRID;
        if (action === 'up' && row > 0) return pos - GRID;
        if (action === 'down' && row < GRID - 1) return pos + GRID;
        if (action === 'left' && col > 0) return pos - 1;
        if (action === 'right' && col < GRID - 1) return pos + 1;
        return pos;
    };

    const getReward = (pos: number) => pos === GOAL ? 100 : WALL_CELLS.has(pos) ? -20 : -1;

    const bestAction = (q: { up: number; down: number; left: number; right: number }): Action => {
        return (ACTIONS.reduce((best, a) => q[a] > q[best] ? a : best, ACTIONS[0]) as Action);
    };

    const runEpisodes = async (numEps: number) => {
        setIsRunning(true);
        const alpha = 0.3, gamma = 0.85;
        const q = qTable.map(row => ({ ...row }));
        const visits = [...visitCount];

        for (let ep = 0; ep < numEps; ep++) {
            let pos = 0;
            let epReward = 0;
            const epsilon = Math.max(0.05, 1 - ep / (numEps * 0.8));
            for (let step = 0; step < 80; step++) {
                const action: Action = Math.random() < epsilon
                    ? ACTIONS[Math.floor(Math.random() * 4)]
                    : bestAction(q[pos]);
                const next = moveAgent(pos, action);
                const reward = getReward(next);
                const maxNextQ = Math.max(...ACTIONS.map(a => q[next][a]));
                q[pos][action] += alpha * (reward + gamma * maxNextQ - q[pos][action]);
                visits[next]++;
                epReward += reward;
                pos = next;
                if (pos === GOAL || WALL_CELLS.has(pos)) break;
            }
            if ((ep + 1) % Math.max(1, Math.floor(numEps / 8)) === 0 || ep === numEps - 1) {
                await new Promise(r => setTimeout(r, speed));
                setQTable(q.map(row => ({ ...row })));
                setVisitCount([...visits]);
                setEpisode(e => e + Math.floor(numEps / 8));
                setTotalReward(r => r + epReward);
            }
        }

        // Demo best path
        let pos = 0;
        const path = [0];
        for (let step = 0; step < 30; step++) {
            const next = moveAgent(pos, bestAction(q[pos]));
            path.push(next);
            if (next === GOAL || next === pos) break;
            pos = next;
        }
        for (const p of path) {
            setAgentPos(p);
            await new Promise(r => setTimeout(r, speed * 1.5));
        }
        setMessage(path[path.length - 1] === GOAL
            ? `✅ Agen menemukan jalur optimal! Setelah ${episode + numEps} episode, Q-Table sudah ter-konvergen.`
            : `🔄 Agen butuh lebih banyak training. Coba tambah episode lagi!`);
        setIsRunning(false);
    };

    const reset = () => {
        setQTable(initQ());
        setAgentPos(0);
        setEpisode(0);
        setTotalReward(0);
        setVisitCount(Array(GRID * GRID).fill(0));
        setMessage('Q-Table direset. Tekan tombol training untuk mulai dari awal.');
        setIsRunning(false);
    };

    const maxQ = Math.max(...qTable.map(q => Math.max(q.up, q.down, q.left, q.right)), 0.1);

    return (
        <div className="glass-card p-6 border-amber-500/20 bg-gradient-to-br from-amber-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-amber-400 mb-1 flex items-center">
                <Target className="mr-3 w-6 h-6" /> Q-Learning Maze Simulator
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="text-xs text-amber-400/70 font-mono mb-2">LABIRIN 5×5 — Sel gelap = dinding</div>
                    <div className="grid gap-1 w-fit" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
                        {Array.from({ length: GRID * GRID }, (_, i) => {
                            const isAgent = agentPos === i;
                            const isGoal = i === GOAL;
                            const isWall = WALL_CELLS.has(i);
                            const qMax = Math.max(qTable[i].up, qTable[i].down, qTable[i].left, qTable[i].right);
                            const qHeat = Math.min(qMax / maxQ, 1);
                            return (
                                <div key={i} className={`w-12 h-12 rounded relative flex items-center justify-center text-lg font-bold transition-all duration-150 border
                                    ${isWall ? 'bg-gray-800 border-gray-600' :
                                        isGoal ? 'bg-amber-500/30 border-amber-400 shadow-lg shadow-amber-500/30' :
                                            isAgent ? 'border-violet-400 scale-110 z-10' :
                                                'border-white/5'}`}
                                    style={!isWall && !isGoal && !isAgent ? {
                                        background: `rgba(${Math.round(qHeat * 100)}, ${Math.round(50 + qHeat * 100)}, 80, ${0.05 + qHeat * 0.5})`
                                    } : {}}>
                                    {isAgent && <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-base shadow-lg shadow-violet-500/50 animate-bounce">🤖</div>}
                                    {isGoal && !isAgent && <span className="text-xl">🏆</span>}
                                    {isWall && <span className="text-gray-600 text-2xl">▪</span>}
                                    {!isWall && !isGoal && !isAgent && qMax > 1 && (
                                        <span className="text-xs font-mono opacity-70" style={{ color: `hsl(${Math.round(qHeat * 120)}, 80%, 65%)` }}>
                                            {qMax.toFixed(0)}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                        <span>🤖 Agen</span><span>🏆 Tujuan</span><span>▪ Dinding</span>
                        <span className="ml-auto font-mono text-amber-400">Episode: {episode}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2">
                        {[['Episode', episode, 'text-amber-400'], ['Total Reward', totalReward, 'text-emerald-400'], ['Sel Dikunjungi', visitCount.filter(v => v > 0).length, 'text-violet-400']].map(([label, val, cls]) => (
                            <div key={String(label)} className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                                <div className={`text-xl font-bold font-mono ${cls}`}>{Number(val).toLocaleString()}</div>
                                <div className="text-xs text-gray-500">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-amber-500/10">
                        <div className="text-xs text-gray-400 mb-2">Kecepatan Simulasi</div>
                        <input type="range" min={50} max={500} step={50} value={speed}
                            onChange={e => setSpeed(Number(e.target.value))}
                            className="w-full accent-amber-500" />
                        <div className="flex justify-between text-xs text-gray-500"><span>Cepat</span><span>{speed}ms</span><span>Lambat</span></div>
                    </div>

                    <div className="text-xs bg-amber-900/20 border border-amber-500/20 rounded p-3 text-amber-200/80 font-mono leading-relaxed">
                        {message}
                    </div>

                    <div className="flex gap-2">
                        <button disabled={isRunning} onClick={() => runEpisodes(50)}
                            className="flex-1 px-3 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-sm hover:bg-amber-500 hover:text-black font-bold transition-all disabled:opacity-40">
                            {isRunning ? '⏳ Training...' : '▶ 50 Episode'}
                        </button>
                        <button disabled={isRunning} onClick={() => runEpisodes(200)}
                            className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-sm hover:bg-emerald-500 hover:text-black font-bold transition-all disabled:opacity-40">
                            {isRunning ? '⏳ Training...' : '⚡ 200 Episode'}
                        </button>
                        <button disabled={isRunning} onClick={reset}
                            className="px-3 py-2 bg-white/5 text-gray-400 border border-white/10 rounded text-sm hover:bg-white/10 transition-all disabled:opacity-40">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 leading-relaxed bg-black/20 rounded p-3 border border-white/5">
                        <span className="text-amber-400 font-bold">Cara baca:</span> Warna tiap sel = nilai Q tertinggi (hijau = sangat menjanjikan). Agen mulai eksplorasi acak (ε tinggi) lalu perlahan mengeksploitasi Q-Table yang sudah ter-update via Bellman Equation.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// MOD-23: Time Series Decomposition Visualizer
// ==========================================
function TimeSeriesVisualizer({ description }: { description: string }) {
    const N = 48;
    const [showTrend, setShowTrend] = useState(true);
    const [showSeasonal, setShowSeasonal] = useState(true);
    const [showNoise, setShowNoise] = useState(true);
    const [noiseLevel, setNoiseLevel] = useState(25);
    const [trendSlope, setTrendSlope] = useState(2.5);
    const [seasonalAmp, setSeasonalAmp] = useState(20);
    const [seed] = useState(() => Array.from({ length: N }, () => Math.random() - 0.5));

    const data = Array.from({ length: N }, (_, i) => {
        const trend = showTrend ? trendSlope * i : 0;
        const seasonal = showSeasonal ? seasonalAmp * Math.sin((2 * Math.PI * i) / 12) : 0;
        const n = showNoise ? seed[i] * noiseLevel : 0;
        return 100 + trend + seasonal + n;
    });

    const minV = Math.min(...data), maxV = Math.max(...data);
    const range = maxV - minV || 1;
    const toY = (v: number) => Math.round(((maxV - v) / range) * 120);
    const pts = data.map((v, i) => `${(i / (N - 1)) * 500},${toY(v)}`).join(' ');
    const trendPts = [0, N - 1].map(i => {
        const v = 100 + trendSlope * i;
        return `${(i / (N - 1)) * 500},${toY(v)}`;
    }).join(' ');

    return (
        <div className="glass-card p-6 border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-cyan-400 mb-1 flex items-center">
                <Activity className="mr-3 w-6 h-6" /> Time Series Decomposition
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>

            <div className="mb-5 bg-black/40 rounded border border-cyan-500/20 p-3">
                <svg viewBox="0 0 500 130" className="w-full" style={{ height: 130 }}>
                    <polyline points={pts} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
                    {showTrend && <polyline points={trendPts} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" opacity="0.9" />}
                    <text x="4" y="12" fill="#22d3ee" fontSize="8" opacity="0.7">Penjualan (Unit)</text>
                    <text x="4" y="126" fill="#6b7280" fontSize="7">0 ─────────────────────── 48 Bulan</text>
                </svg>
                <div className="flex gap-4 text-xs mt-2 flex-wrap">
                    <span className="text-cyan-400">— Observasi (Y_t)</span>
                    {showTrend && <span className="text-amber-400">--- Tren</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {[
                    { label: '📈 Tren (slope)', val: trendSlope, set: setTrendSlope, min: 0, max: 6, step: 0.5, color: 'amber', unit: 'unit/bulan', show: showTrend },
                    { label: '🔄 Amplitudo Musiman', val: seasonalAmp, set: setSeasonalAmp, min: 0, max: 60, step: 5, color: 'violet', unit: 'unit', show: showSeasonal },
                    { label: '🌪️ Level Noise', val: noiseLevel, set: setNoiseLevel, min: 0, max: 80, step: 5, color: 'red', unit: 'unit', show: showNoise },
                ].map(({ label, val, set, min, max, step, color, unit }) => (
                    <div key={label} className="bg-black/30 rounded p-3 border border-white/5">
                        <div className={`text-xs text-${color}-400 mb-2 font-bold`}>{label}</div>
                        <input type="range" min={min} max={max} step={step} value={val}
                            onChange={e => set(Number(e.target.value))}
                            className={`w-full accent-${color}-500`} />
                        <div className="text-xs text-center text-gray-400">{Number(val).toFixed(1)} {unit}</div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {[{ label: '📈 Tren', val: showTrend, set: setShowTrend },
                { label: '🔄 Seasonal', val: showSeasonal, set: setShowSeasonal },
                { label: '🌪️ Noise', val: showNoise, set: setShowNoise }].map(({ label, val, set }) => (
                    <button key={label} onClick={() => set(!val)}
                        className={`px-4 py-2 rounded text-sm font-bold border transition-all ${val ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                        {val ? '✅' : '⬜'} {label}
                    </button>
                ))}
            </div>
            <div className="text-xs text-gray-500 bg-black/20 rounded p-3 border border-white/5">
                <span className="text-cyan-400 font-bold">Formula:</span> Y_t = T_t + S_t + R_t &nbsp;=&nbsp; Tren + Seasonal + Noise. Matikan komponen di atas untuk melihat kontribusi masing-masing.
            </div>
        </div>
    );
}

// ==========================================
// MOD-24: Vision Transformer Patch Visualizer
// ==========================================
function ViTVisualizer({ description }: { description: string }) {
    const [patchSize, setPatchSize] = useState(4);
    const [hoveredPatch, setHoveredPatch] = useState<number | null>(null);
    const imgSize = 16;
    const cols = Math.floor(imgSize / patchSize);
    const numPatches = cols * cols;

    const pixelColor = (r: number, c: number) => {
        const hue = Math.round(((r * imgSize + c) / (imgSize * imgSize)) * 280);
        return `hsl(${hue}, 70%, 45%)`;
    };

    const cellPx = 240 / imgSize;
    const patchPx = 240 / cols;

    return (
        <div className="glass-card p-6 border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-transparent">
            <h3 className="text-2xl font-bold text-violet-400 mb-1 flex items-center">
                <Layers className="mr-3 w-6 h-6" /> Vision Transformer — Patch Tokenizer
            </h3>
            <p className="text-gray-400 text-sm mb-5">{description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="text-xs text-violet-400/80 font-mono mb-2">INPUT IMAGE → {numPatches} PATCH ({patchSize}×{patchSize} px tiap patch)</div>
                    <div className="relative" style={{ width: 240, height: 240 }}>
                        {/* Pixel colors */}
                        {Array.from({ length: imgSize }, (_, r) =>
                            Array.from({ length: imgSize }, (_, c) => {
                                const patchR = Math.floor(r / patchSize), patchC = Math.floor(c / patchSize);
                                const pId = patchR * cols + patchC;
                                return (
                                    <div key={`${r}-${c}`}
                                        style={{ position: 'absolute', top: r * cellPx, left: c * cellPx, width: cellPx, height: cellPx, backgroundColor: pixelColor(r, c), opacity: hoveredPatch === pId ? 1 : 0.65, transition: 'opacity 0.15s' }}
                                        onMouseEnter={() => setHoveredPatch(pId)}
                                        onMouseLeave={() => setHoveredPatch(null)}
                                    />
                                );
                            })
                        )}
                        {/* Patch grid lines */}
                        {Array.from({ length: cols + 1 }, (_, i) => (
                            <div key={`h${i}`} style={{ position: 'absolute', top: i * patchPx, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                        ))}
                        {Array.from({ length: cols + 1 }, (_, i) => (
                            <div key={`v${i}`} style={{ position: 'absolute', left: i * patchPx, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                        ))}
                        {/* Patch number labels */}
                        {Array.from({ length: numPatches }, (_, i) => (
                            <div key={`lbl${i}`} style={{ position: 'absolute', top: Math.floor(i / cols) * patchPx + 2, left: (i % cols) * patchPx + 2, fontSize: 9, color: hoveredPatch === i ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: 'monospace', pointerEvents: 'none', fontWeight: 'bold' }}>
                                P{i}
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Hover patch untuk highlight</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-black/30 rounded p-3 border border-white/5">
                        <div className="text-xs text-violet-400 mb-2 font-bold">Patch Size: {patchSize}×{patchSize} pixels</div>
                        <input type="range" min={2} max={8} step={2} value={patchSize}
                            onChange={e => { setPatchSize(Number(e.target.value)); setHoveredPatch(null); }}
                            className="w-full accent-violet-500" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>2×2 (detail)</span><span>8×8 (kasar)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[['Jumlah Patch (N)', numPatches, 'text-violet-400'], ['Token ke Transformer', numPatches + 1, 'text-amber-400']].map(([l, v, c]) => (
                            <div key={String(l)} className="bg-black/40 rounded p-3 border border-white/5 text-center">
                                <div className={`text-2xl font-bold font-mono ${c}`}>{v}</div>
                                <div className="text-xs text-gray-500">{l}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/30 rounded p-3 border border-violet-500/10">
                        <div className="text-xs text-violet-300 font-mono mb-2">Token Sequence → Transformer Encoder</div>
                        <div className="flex flex-wrap gap-1">
                            <div className="px-2 py-1 rounded text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">[CLS]</div>
                            {Array.from({ length: Math.min(numPatches, 20) }, (_, i) => (
                                <div key={i}
                                    className={`px-2 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${hoveredPatch === i ? 'bg-violet-500/40 text-white border-violet-400 scale-110' : 'bg-violet-500/10 text-violet-300 border-violet-500/20'}`}
                                    onMouseEnter={() => setHoveredPatch(i)}
                                    onMouseLeave={() => setHoveredPatch(null)}>
                                    P{i}
                                </div>
                            ))}
                            {numPatches > 20 && <div className="px-2 py-1 text-xs text-gray-500">+{numPatches - 20} lagi</div>}
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 leading-relaxed bg-black/20 rounded p-3 border border-white/5">
                        <span className="text-violet-400 font-bold">Rumus ViT:</span> N = (H×W) / P² = ({imgSize}×{imgSize}) / ({patchSize}×{patchSize}) = <span className="text-white font-mono">{numPatches}</span> patch. Plus token <span className="text-amber-400">[CLS]</span> = <span className="font-mono text-white">{numPatches + 1}</span> token total yang diproses Transformer.
                    </div>
                </div>
            </div>
        </div>
    );
}
