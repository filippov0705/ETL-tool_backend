const nodemailer = require("nodemailer");

const {ROUTING_MAIL, ROUTING_MAIL_PASSWORD, ERROR, SUCCESS} = require("@constants/environemtConstants");

class NodemailerService {
    async send(from, to, subject, text) {
        return new Promise(function(resolve, reject) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: ROUTING_MAIL,
                    pass: ROUTING_MAIL_PASSWORD,
                },
            });

            const mailOptions = {from, to, subject, text};

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    resolve({status: "Error"});
                } else {
                    resolve({status: "Success"});
                }
            });
        });
    }
}

module.exports = new NodemailerService();
