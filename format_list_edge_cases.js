const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/curriculum.json', 'utf8'));
let count = 0;
data.modul.forEach(m => {
    m.materi_detail.forEach(detail => {
        if (detail.penjelasan_teknis && detail.penjelasan_teknis.includes('Di mana ')) {
            const parts = detail.penjelasan_teknis.split('Di mana ');
            if (parts.length === 2 && !parts[1].startsWith(':')) { // exclude "Di mana:" which we already processed
                let legend = parts[1].trim();
                legend = legend.replace(/, \$/g, '\n- $');
                detail.penjelasan_teknis = parts[0].trim() + '\n\n**Keterangan:**\n- ' + legend;
                count++;
            }
        }
    });
});
if (count > 0) {
    fs.writeFileSync('src/data/curriculum.json', JSON.stringify(data, null, 2));
    console.log(`Updated ${count} formulas in curriculum.json`);
} else {
    console.log('No changes made');
}
