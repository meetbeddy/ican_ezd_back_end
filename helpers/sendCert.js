const Jimp = require("jimp");
const dot = require("dotenv");
const db = require("../config/db_connection");
const mailgun = require("../helpers/mailgun");
fs = require("fs");

dot.config();
db();
const setUp = async () => {
	const cert = await Jimp.read("no cert.jpg");
	const origImageDim = { width: cert.bitmap.width, height: cert.bitmap.height };
	cert
		.resize((origImageDim.width * 45) / 100, (origImageDim.height * 45) / 100) // resize
		.quality(70);
	const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
	return {
		cert,
		font,
	};
};
const nameFormatter = (name, memberAcronym) => {
	if (!name && !memberAcronym) {
		return "";
	} else if (!memberAcronym) {
		const surname = name.split(" ")[0] ? name.split(" ")[0].toUpperCase() : "";
		const firstName = name.split(" ")[1] ? name.split(" ")[1] : "";
		const otherName = name.split(" ")[2] ? name.split(" ")[2] : "";

		return `${surname} ${firstName} ${otherName}`;
	}

	const surname = name.split(" ")[0] ? name.split(" ")[0].toUpperCase() : "";
	const firstName = name.split(" ")[1] ? name.split(" ")[1] : "";
	const otherName = name.split(" ")[2] ? name.split(" ")[2] : "";
	const acronym = memberAcronym.toUpperCase();
	return `${surname} ${firstName} ${otherName}, ${acronym}`;
};

const printCert = async ({ cert, font, name, email, mail }) => {
	cert
		.print(
			font,
			130,
			110,
			{
				text: name,
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			300,
			202
		)
		.write(`certs/${name}.png`);

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

		return await printCert({ cert, font, name: userName, email, mail: true });
	},
	sendToProfile: async ({ name, memberAcronym }, cb) => {
		const userName = nameFormatter(name, memberAcronym);
		const { cert, font } = await setUp();
		cert.print(
			font,
			130,
			110,
			{
				text: userName,
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			300,
			202
		);

		cert.getBase64(Jimp.MIME_PNG, function (err, data) {
			cb(data);
		});
	},
};
