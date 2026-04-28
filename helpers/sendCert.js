const Jimp = require("jimp");
const dot = require("dotenv");
const db = require("../config/db_connection");
const mailgun = require("../helpers/mailgun");
const path = require("path")
fs = require("fs");


// dot.config();
// db();
let cachedTemplate = null;
let cachedFont = null;
let setupPromise = null;

const setUp = async () => {
	if (setupPromise) return setupPromise;

	setupPromise = (async () => {
		if (!cachedTemplate || !cachedFont) {
			console.log("Loading certificate template and font into memory...");
			const cert = await Jimp.read("ezd-certificate 2026.jpeg");
			const customFont = path.join(__dirname, "..", "fonts", "merienda-28.fnt");
			const origImageDim = { width: cert.bitmap.width, height: cert.bitmap.height };
			
			// Pre-resize the template to save time on every generation
			cert.resize((origImageDim.width * 51) / 100, (origImageDim.height * 51) / 100).quality(70);
			
			cachedTemplate = cert;
			cachedFont = await Jimp.loadFont(customFont);
			console.log("Template and font cached successfully.");
		}
		return {
			cert: cachedTemplate.clone(),
			font: cachedFont,
		};
	})();

	return setupPromise;
};

const printScaledText = async (image, font, text, y, scaleFactor = 5) => {
	const textWidth = Jimp.measureText(font, text);
	const textHeight = Jimp.measureTextHeight(font, text, textWidth);

	// Create a temporary image for the text
	const tempImage = new Jimp(textWidth, textHeight, 0x00000000); // Transparent
	tempImage.print(font, 0, 0, text);

	// Scale the text image up
	tempImage.resize(textWidth * scaleFactor, Jimp.AUTO, Jimp.RESIZE_BICUBIC);

	// Center horizontally
	const posX = (image.bitmap.width - tempImage.bitmap.width) / 2;
	image.composite(tempImage, posX, y);
	return image;
};

const nameFormatter = (name, memberAcronym, maxLength = 40) => {
	if (!name && !memberAcronym) {
		return "";
	}

	const surname = name.split(" ")[0] ? name.split(" ")[0].toUpperCase() : "";
	const firstName = name.split(" ")[1] ? name.split(" ")[1] : "";
	let otherName = name.split(" ")[2] ? name.split(" ")[2] : "";
	const acronym = memberAcronym ? `, ${memberAcronym.toUpperCase()}` : "";

	let fullName = `${surname} ${firstName} ${otherName}${acronym}`;

	if (fullName.length > maxLength) {
		// Truncate otherName to its initial if the full name is too long
		otherName = otherName ? `${otherName.charAt(0)}.` : "";
		fullName = `${surname} ${firstName} ${otherName}${acronym}`;
	}

	return fullName;
};

const printCert = async ({ cert, font, name, email, mail }) => {
	console.log(name, mail);
	await printScaledText(cert, font, name, 1050, 5);

	cert.write(`certs/${name}.png`);

	if (mail) {
		return cert.getBase64(Jimp.MIME_PNG, function (err, data) {
			return mailgun.sendCert(
				email,
				data,
				"ICAN CERTIFICATE OF PARTICIPATION",
				name
			);
		});
	}
	return cert;
};

module.exports = {
	sendAfterConfirmed: async ({ email, name, memberAcronym }) => {
		const userName = nameFormatter(name, memberAcronym);

		const { cert, font } = await setUp();

		return await printCert({ cert, font, name: userName, email, mail: false });
	},
	sendToProfile: async ({ name, memberAcronym }, cb) => {
		const userName = nameFormatter(name, memberAcronym);
		const { cert, font } = await setUp();

		await printScaledText(cert, font, userName, 1050, 5);

		cert.getBase64(Jimp.MIME_PNG, function (err, data) {
			cb(data);
		});
	},
};
