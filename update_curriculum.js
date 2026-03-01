const fs = require('fs');

const args = process.argv.slice(2);
const chunkFile = args[0] || 'd:/Project/ai-curriculum-data/revised_chunk1.json';
const mainFile = 'd:/Project/ai-curriculum-data/src/data/curriculum.json';

try {
    const mainData = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
    const chunkData = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));

    let updatedCount = 0;
    chunkData.forEach(newMod => {
        const index = mainData.modul.findIndex(m => m.id === newMod.id);
        if (index !== -1) {
            mainData.modul[index] = { ...mainData.modul[index], ...newMod };
            updatedCount++;
        }
    });

    fs.writeFileSync(mainFile, JSON.stringify(mainData, null, 2), 'utf8');
    console.log(`Successfully updated ${updatedCount} modules in curriculum.json using ${chunkFile}.`);
} catch (error) {
    console.error('Error processing JSON:', error);
}
