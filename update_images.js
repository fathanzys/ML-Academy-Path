const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.json');
const curriculumData = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

curriculumData.modul.forEach(modul => {
    if (modul.id === 'MOD-03') {
        const detail = modul.materi_detail.find(d => d.judul.includes('Tradeoff') || d.judul.includes('Keseimbangan'));
        if (detail) {
            detail.image = '/images/mod03_bias_variance.png';
        }
    }
    if (modul.id === 'MOD-06') {
        const detail = modul.materi_detail.find(d => d.judul.includes('Tensor'));
        if (detail) {
            detail.image = '/images/mod06_tensor.png';
        }
    }
    if (modul.id === 'MOD-07') {
        const detail1 = modul.materi_detail[0]; // Arsitektur Lapis demi Lapis
        detail1.image = '/images/neural_network_nodes.png';

        const detail2 = modul.materi_detail.find(d => d.judul.includes('Bumbu Rahasia') || d.judul.includes('ReLU'));
        if (detail2) {
            detail2.image = '/images/mod07_relu.png';
        }
    }
});

fs.writeFileSync(curriculumPath, JSON.stringify(curriculumData, null, 2), 'utf8');
console.log('Successfully updated curriculum.json image references.');
