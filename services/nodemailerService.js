const nodemailer = require("nodemailer");
var fs = require('fs');
const {ROUTING_MAIL, ROUTING_MAIL_PASSWORD, ERROR, SUCCESS} = require("@constants/enviromentConstants");

class NodemailerService {
    async send(data, email, subject, name) {
        return new Promise(function(resolve, reject) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: ROUTING_MAIL,
                    pass: ROUTING_MAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: 'ETL-tool',
                to: email,
                subject: subject,
                attachments: [{
                    filename: name,
                    content: data
                }]};

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error)
                    resolve({status: "Error"});
                } else {
                    resolve({status: "Success"});
                }
            });
        });
    }
}

module.exports = new NodemailerService();
