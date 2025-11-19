const fs = require('fs');
const path = require('path');

// Check if sharp is available, otherwise use sips (macOS built-in)
const resizeImage = async () => {
    const inputPath = path.join(__dirname, 'Untitled design.png');
    const outputPath = path.join(__dirname, 'Untitled design.png'); // Overwrite original
    
    try {
        // Try using sharp first (if installed)
        try {
            const sharp = require('sharp');
            await sharp(inputPath)
                .resize(128, 128, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(outputPath);
            console.log('✅ Image resized to 128x128 using sharp');
            return;
        } catch (sharpError) {
            // Sharp not available, try sips (macOS)
            const { execSync } = require('child_process');
            try {
                execSync(`sips -z 128 128 "${inputPath}" --out "${outputPath}"`, { stdio: 'inherit' });
                console.log('✅ Image resized to 128x128 using sips');
                return;
            } catch (sipsError) {
                console.error('❌ Neither sharp nor sips available. Installing sharp...');
                // Install sharp
                const { execSync } = require('child_process');
                execSync('npm install sharp --save-dev', { stdio: 'inherit' });
                const sharp = require('sharp');
                await sharp(inputPath)
                    .resize(128, 128, {
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    })
                    .png()
                    .toFile(outputPath);
                console.log('✅ Image resized to 128x128 using sharp (newly installed)');
            }
        }
    } catch (error) {
        console.error('❌ Error resizing image:', error.message);
        process.exit(1);
    }
};

resizeImage();

