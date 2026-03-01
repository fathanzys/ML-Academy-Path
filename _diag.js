const fs = require('fs');
const cur = JSON.parse(fs.readFileSync('src/data/curriculum.json', 'utf8'));

// Correct rumpun_id mapping based on CONTENT context
const correctMapping = {
    // R1: Fondasi AI & Machine Learning
    'MOD-01': 'R1', // Apa itu AI
    'MOD-02': 'R1', // Cara Komputer Belajar

    // R2: Machine Learning Klasik
    'MOD-03': 'R2', // Bias Variance
    'MOD-04': 'R2', // Supervised Learning
    'MOD-05': 'R2', // Unsupervised Learning

    // R3: Deep Learning & Neural Networks
    'MOD-06': 'R3', // Fondasi Matematika DL
    'MOD-07': 'R3', // Deep Neural Networks
    'MOD-08': 'R3', // CNN

    // R4: Natural Language Processing (NLP)
    'MOD-09': 'R4', // RNN & LSTM
    'MOD-10': 'R4', // Attention Mechanism
    'MOD-11': 'R4', // Arsitektur Transformer
    'MOD-12': 'R4', // Encoder vs Decoder (BERT vs GPT)
    'MOD-19': 'R4', // NLP Modern

    // R5: Computer Vision
    'MOD-20': 'R5', // Vision Transformer
    'MOD-24': 'R5', // ViT & Advanced CV

    // R6: Transformer Architecture -> rename to Generative AI & LLM
    'MOD-13': 'R6', // Generative AI & Diffusion
    'MOD-14': 'R6', // LLM Murni, RAG & Tuning
    'MOD-18': 'R6', // Evaluasi & Deployment (PPO)

    // R7: Reinforcement Learning  
    'MOD-15': 'R7', // Pengantar RL
    'MOD-16': 'R7', // Q-Learning
    'MOD-17': 'R7', // DQN
    'MOD-22': 'R7', // RL Lanjutan

    // R8: Time Series & Advanced  
    'MOD-23': 'R8', // Time Series Forecasting
    'MOD-21': 'R8', // MLOps

    // R9: Frontier AI
    'MOD-25': 'R9', // Speech & Audio
    'MOD-26': 'R9', // Multimodal AI
    'MOD-27': 'R9', // GNN
    'MOD-28': 'R9', // AutoML
};

// Update rumpun definitions to match
cur.rumpun = [
    { id: 'R1', nama: 'Fondasi AI & Machine Learning', deskripsi: 'Mempelajari konsep dasar kecerdasan buatan dan bagaimana mesin belajar dari sekumpulan data.' },
    { id: 'R2', nama: 'Machine Learning Klasik', deskripsi: 'Menyelami teknik-teknik prediktif dan klasifikasi di mana komputer mencari pola dari historical data.' },
    { id: 'R3', nama: 'Deep Learning & Neural Networks', deskripsi: 'Masuk ke dunia jaringan saraf tiruan berlapis-lapis dan teknik Computer Vision.' },
    { id: 'R4', nama: 'Natural Language Processing (NLP)', deskripsi: 'Mempelajari teknik mengajarkan mesin memahami bahasa manusia, dari RNN hingga Transformer.' },
    { id: 'R5', nama: 'Computer Vision Lanjutan', deskripsi: 'Mendalami arsitektur Vision Transformer dan teknik segmentasi gambar mutakhir.' },
    { id: 'R6', nama: 'Generative AI & LLM', deskripsi: 'Era kecerdasan buatan generatif: Diffusion, RAG, dan Fine-Tuning model bahasa besar.' },
    { id: 'R7', nama: 'Reinforcement Learning', deskripsi: 'Cara mesin belajar melalui percobaan dan penghargaan, seperti melatih agen game dari nol.' },
    { id: 'R8', nama: 'MLOps & Time Series', deskripsi: 'Produksi model AI ke dunia nyata dan peramalan data deret waktu.' },
    { id: 'R9', nama: 'Frontier AI', deskripsi: 'Teknologi AI paling mutakhir: Audio, Multimodal, Graph Networks, dan AutoML.' },
];

// Apply correct rumpun_id to each module
cur.modul.forEach(m => {
    if (correctMapping[m.id]) {
        m.rumpun_id = correctMapping[m.id];
    }
});

fs.writeFileSync('src/data/curriculum.json', JSON.stringify(cur, null, 2), 'utf8');

// Verify
console.log('=== FIXED MAPPING ===');
cur.rumpun.forEach(r => {
    const mods = cur.modul.filter(m => m.rumpun_id === r.id);
    console.log(`\n${r.id}: ${r.nama}`);
    mods.forEach(m => console.log(`  ${m.id} | ${m.judul}`));
});
