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

        const mailOptions = { from, to, subject, text };

        const result = await transporter.sendMail(mailOptions, async function(error, info) {
            if (error) {
                return error;
            } else {
                return `Email sent: ${info.response}`;
            }
        });
        return result;
    }
}

module.exports = new NodemailerService();
