const nodemailer = require("nodemailer");
const taskTypesRepository = require("@repository/taskTypesRepository");
const taskRepository = require("@repository/taskRepository");
const {ROUTING_MAIL, ROUTING_MAIL_PASSWORD} = require("@constants/environemtConstants");
const {FROM, TO, SUBJECT, TEXT} = require("../mockData/mockMailData");

class taskServeice {
    async getTaskSettings(id) {
        return await taskRepository.getTaskSettings(id);
    }

    async changeTaskSettings(taskId, newSettings) {
        await taskRepository.changeSettings(taskId, newSettings);
    }

    getTaskTypes() {
        return new Promise(resolve => {
            taskTypesRepository.getTaskTypes().then(taskTypes => resolve(taskTypes));
        });
    }

    nodemail() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ROUTING_MAIL,
                pass: ROUTING_MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: FROM,
            to: TO,
            subject: SUBJECT,
            text: TEXT,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}

module.exports = new taskServeice();
