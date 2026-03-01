const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.json');
const data = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

// The exact state we want for images:
const desiredImages = {
    'MOD-01': { 'Classical AI & Mesin Inferensi': '/images/ai_timeline.png' },
    'MOD-02': { 'Mendaki Turun Gunung: Gradient Descent': '/images/ml_pipeline.png' },
    'MOD-03': { 'Keseimbangan Kosmik: Bias-Variance Tradeoff': '/images/mod03_bias_variance.png' },
    'MOD-06': { 'Tensor: Bahasa Dewa bagi Komputer': '/images/mod06_tensor.png' },
    'MOD-07': {
        'Arsitektur Lapis demi Lapis': '/images/neural_network_nodes.png',
        'Bumbu Rahasia: Fungsi Aktivasi Pelatuk Sinyal Tembakan (ReLU)': '/images/mod07_relu.png'
    },
    'MOD-08': { 'Konvolusi: Cara Mata AI Bekerja': '/images/cnn_vision_concept.png' },
    'MOD-10': { 'Konsep Mencari Perhatian (Self-Attention)': '/images/transformer_attention_concept.png' },
    'MOD-13': { 'Menjadikan Debu Menjadi Mutiara (Denoising Diffusion)': '/images/mod13_diffusion_noising.png' },
    'MOD-16': { 'Menulis Buku Harian Q-Table': '/images/mod16_rl_qtable.png' }
};

data.modul.forEach(modul => {
    modul.materi_detail.forEach(detail => {
        // Check if this specific module & detail should have an image
        const expectedImage = desiredImages[modul.id] && desiredImages[modul.id][detail.judul];

        if (expectedImage) {
            detail.image = expectedImage;
        } else {
            // If it's not in our explicit desired list, remove the image field entirely
            delete detail.image;
        }
    });
});

fs.writeFileSync(curriculumPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully reverted curriculum.json to ONLY contain the requested images.');
