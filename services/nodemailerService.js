const nodemailer = require("nodemailer");

const {ROUTING_MAIL, ROUTING_MAIL_PASSWORD} = require("@constants/environemtConstants");

class NodemailerService {
    async send(from, to, subject, text) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ROUTING_MAIL,
                pass: ROUTING_MAIL_PASSWORD,
            },
        });

        const mailOptions = {from, to, subject, text};
        let result = null;
        await transporter.sendMail(mailOptions, async function(error, info) {
            if (error) {
                result = error;
            } else {
                result = `Email sent: ${info.response}`;
            }
        });
    }
}

module.exports = new NodemailerService();
