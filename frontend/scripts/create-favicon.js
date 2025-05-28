const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  try {
    // Read the PNG file
    const inputBuffer = fs.readFileSync(path.join(__dirname, '../public/chiledaodots.png'));
    
    // Create multiple sizes
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(inputBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Write the ICO file
    const icoPath = path.join(__dirname, '../public/favicon.ico');
    fs.writeFileSync(icoPath, Buffer.concat(pngBuffers));
    
    console.log('Favicon created successfully!');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon(); 