const nodemailer = require("nodemailer");

const {ROUTING_MAIL, ROUTING_MAIL_PASSWORD} = require("@constants/environemtConstants");

class NodemailerService {
    send(from, to, subject, text) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ROUTING_MAIL,
                pass: ROUTING_MAIL_PASSWORD,
            },
        });

        const mailOptions = { from, to, subject, text };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}

module.exports = new NodemailerService();
