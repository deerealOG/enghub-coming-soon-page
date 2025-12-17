const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'enghub-logo.svg');
const outDir = path.join(__dirname, '..', 'public');

async function run() {
    try {
        // png-to-ico is ESM; import dynamically and use default if present
        const pngToIcoModule = await import('png-to-ico');
        const pngToIco = pngToIcoModule && (pngToIcoModule.default || pngToIcoModule);

        if (!fs.existsSync(svgPath)) {
            console.error('Source SVG not found at', svgPath);
            process.exit(1);
        }

        // Sizes for ICO (common sizes) and apple touch
        const icoSizes = [16, 32, 48, 64];
        const tmpPngs = [];

        for (const s of icoSizes) {
            const out = path.join(outDir, `favicon-${s}.png`);
            await sharp(svgPath).resize(s, s).png().toFile(out);
            tmpPngs.push(out);
        }

        // convert to .ico
        const icoBuffer = await pngToIco(tmpPngs);
        fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuffer);

        // apple-touch-icon (180x180)
        await sharp(svgPath).resize(180, 180).png().toFile(path.join(outDir, 'apple-touch-icon.png'));

        // Clean up temporary pngs
        for (const p of tmpPngs) {
            try { fs.unlinkSync(p); } catch (e) { }
        }

        console.log('Generated public/favicon.ico and public/apple-touch-icon.png');
    } catch (err) {
        console.error('Error generating favicons:', err);
        process.exit(1);
    }
}

run();