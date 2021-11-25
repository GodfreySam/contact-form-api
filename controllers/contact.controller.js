const request = require("request");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

const contact = async (req, res, next) => {
	try {
		let { name, email, subject, message } = req.body;
		console.log(req.body);

		if (name === "" || email === "" || subject === "" || message == "") {
			return res
				.status(400)
				.json({ success: false, msg: "No empty field allowed" });
		}

		const captcha = req.body.captcha;
		// console.log(req.body)
		if (captcha === undefined || captcha === "" || captcha === null) {
			return res
				.status(400)
				.json({ success: false, msg: "Please select captcha" });
		}

		// verify URL
		const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}&remoteip=${req.socket.remoteAddress}`;

		request(verifyUrl, (err, response, body) => {
			body = JSON.parse(body);

			// If not successful
			if (body.success !== undefined && !body.success) {
				return res
					.status(400)
					.json({ success: false, msg: "Failed captcha verification" });
			}

			// If successful
			const mailOptions = {
				from: req.body.name,
				to: process.env.MAIL_USER,
				subject: "From Portfolio",
				text: `
            From: ${req.body.name}\n \n
            From: ${req.body.email}\n \n
            Email: ${req.body.subject} \n \n
            ${req.body.message}`,
			};

			transporter.sendMail(mailOptions, function (err, info) {
				if (err) {
					console.log(err);
					return res.status(500).json({ success: false, msg: "Message not sent" });
				}
				return res.status(201).json({
					success: true,
					msg: "Message sent, thank you",
				});
			});
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = contact;
