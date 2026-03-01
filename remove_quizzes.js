const fs = require('fs');
const filePath = 'd:/Project/ai-curriculum-data/src/data/curriculum.json';

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    if (data.quiz) {
        delete data.quiz;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Successfully removed data.quiz array.`);
    } else {
        console.log(`data.quiz not found.`);
    }

} catch (error) {
    console.error('Error processing JSON:', error);
}
