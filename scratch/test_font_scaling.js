const Jimp = require("jimp");

async function testScalingFont() {
    try {
        const cert = await Jimp.read("ezd-certificate 2026.jpeg");
        const resizedWidth = (cert.bitmap.width * 51) / 100;
        const resizedHeight = (cert.bitmap.height * 51) / 100;
        cert.resize(resizedWidth, resizedHeight).quality(70);
        
        // Load the small custom font
        const font = await Jimp.loadFont("fonts/merienda-28.fnt");
        const text = "DOE John Smith, ACA";
        
        // 1. Calculate text dimensions (rough estimate for Merienda-28)
        // Jimp doesn't have a direct "measureText" but we can guess or use a temp image
        const textWidth = Jimp.measureText(font, text);
        const textHeight = Jimp.measureTextHeight(font, text, textWidth);
        
        console.log(`Text dimensions: ${textWidth}x${textHeight}`);
        
        // 2. Create a temporary image for the text
        const tempImage = new Jimp(textWidth, textHeight, 0x00000000); // Transparent
        tempImage.print(font, 0, 0, text);
        
        // 3. Scale the text image up (e.g. 4x)
        const scaleFactor = 6; // To get it to ~168px height (28 * 6)
        tempImage.resize(textWidth * scaleFactor, textHeight * scaleFactor, Jimp.RESIZE_BICUBIC);
        
        // 4. Composite it onto the certificate
        const posX = (cert.bitmap.width - (textWidth * scaleFactor)) / 2;
        const posY = 950;
        cert.composite(tempImage, posX, posY);
        
        await cert.write("test_scaled_font.png");
        console.log("Test image written to test_scaled_font.png");
    } catch (err) {
        console.error(err);
    }
}

testScalingFont();
