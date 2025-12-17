const fs = require('fs');
const path = require('path');

const files = ['favicon.ico', 'apple-touch-icon.png'];
const outDir = path.join(__dirname, '..', 'public');

for (const f of files) {
    const p = path.join(outDir, f);
    try {
        if (fs.existsSync(p)) {
            fs.unlinkSync(p);
            console.log('Removed', p);
        }
    } catch (err) {
        console.error('Failed to remove', p, err.message);
        process.exitCode = 1;
    }
}

console.log('Cleaned favicons (if present).');
