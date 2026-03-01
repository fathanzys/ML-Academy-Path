const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/curriculum.json', 'utf8'));

let count = 0;

data.modul.forEach(m => {
    m.materi_detail.forEach(detail => {
        if (detail.penjelasan_teknis && detail.penjelasan_teknis.includes('Di mana:')) {
            const parts = detail.penjelasan_teknis.split('Di mana:');
            if (parts.length === 2) {
                let legend = parts[1].trim();

                // If it ends with a dot, remove it for consistency in lists
                // Wait, it can have multiple dots if there are sentences.
                // But typically it's a comma separated list.
                // Replace ", $" or ", \\" (some use $) with "\n- $"
                legend = legend.replace(/, \$/g, '\n- $');
                legend = legend.replace(/, \\\w/g, match => '\n- ' + match.substring(2)); // handle things like ", \mu" but wait, typically they are all wrapped in $$ or $$, let's check

                // Let's just do a simple replacement for ", $" which covers most of our additions
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
