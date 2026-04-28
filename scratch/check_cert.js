const Jimp = require("jimp");

async function checkImage() {
    try {
        const cert = await Jimp.read("ezd-certificate 2026.jpeg");
        console.log(`Original Width: ${cert.bitmap.width}`);
        console.log(`Original Height: ${cert.bitmap.height}`);
        
        const resizedWidth = (cert.bitmap.width * 51) / 100;
        const resizedHeight = (cert.bitmap.height * 51) / 100;
        console.log(`Resized Width: ${resizedWidth}`);
        console.log(`Resized Height: ${resizedHeight}`);
        
        cert.resize(resizedWidth, resizedHeight).quality(70);
        
        const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
        // Test printing
        const testName = "DOE John Smith, ACA";
        cert.print(
            font,
            0,
            950,
            {
                text: testName,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            cert.bitmap.width,
            200
        );
        
        await cert.write("test_output_v2.png");
        console.log("Test image written to test_output_v2.png");
    } catch (err) {
        console.error(err);
    }
}

checkImage();
