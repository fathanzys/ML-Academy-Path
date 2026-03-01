const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.json');
const data = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

// Map: moduleId -> array of [judul_substring, imagePath]
const imageMap = {
    'MOD-01': [['Classical AI', '/images/mod01_ai_timeline.png']],
    'MOD-02': [['Mendaki Turun', '/images/mod02_gradient_descent.png']],
    'MOD-04': [['Decision Tree', '/images/mod04_decision_tree.png'], ['Random Forest', '/images/mod04_decision_tree.png']],
    'MOD-05': [['', '/images/mod05_kmeans_clustering.png']], // first detail
    'MOD-09': [['', '/images/mod09_rnn_lstm.png']], // first detail
    'MOD-10': [['', '/images/mod10_attention_heatmap.png']], // first detail
    'MOD-11': [['', '/images/mod11_transformer_arch.png']], // first detail
    'MOD-12': [['', '/images/mod12_bert_finetune.png']], // first detail
    'MOD-13': [['Debu Menjadi Mutiara', '/images/mod13_diffusion_noising.png'], ['Menjadi Mutiara', '/images/mod13_diffusion_noising.png']],
    'MOD-14': [['', '/images/mod14_llm_nexttoken.png']], // first detail
    'MOD-15': [['', '/images/mod15_mlops_pipeline.png']], // first detail
    'MOD-16': [['Buku Harian', '/images/mod16_rl_qtable.png'], ['Q-Table', '/images/mod16_rl_qtable.png']],
    'MOD-17': [['Regex', '/images/mod17_regex_tokenize.png'], ['Tokenisasi', '/images/mod17_regex_tokenize.png']],
};

data.modul.forEach(modul => {
    const mappings = imageMap[modul.id];
    if (!mappings) return;

    modul.materi_detail.forEach((detail, idx) => {
        mappings.forEach(([keyword, imagePath]) => {
            if (keyword === '') {
                // Assign to first detail only
                if (idx === 0) {
                    detail.image = imagePath;
                    console.log(`✓ ${modul.id}[0] "${detail.judul.substring(0, 30)}" → ${imagePath}`);
                }
            } else if (detail.judul && detail.judul.includes(keyword)) {
                detail.image = imagePath;
                console.log(`✓ ${modul.id} "${detail.judul.substring(0, 40)}" → ${imagePath}`);
            }
        });
    });
});

// Fix MOD-16 - was using wrong image before
const mod16 = data.modul.find(m => m.id === 'MOD-16');
if (mod16) {
    mod16.materi_detail.forEach((d, i) => {
        if (i === 0) {
            d.image = '/images/mod16_rl_qtable.png';
            console.log(`✓ MOD-16[0] force-set → /images/mod16_rl_qtable.png`);
        }
    });
}

fs.writeFileSync(curriculumPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ curriculum.json updated successfully with contextual images!');
