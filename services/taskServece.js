require('module-alias/register');

const nodemailer = require('nodemailer');
const path = require('path');
const env = require('dotenv').config({ path: path.resolve(__dirname, '@root/.env') });

class taskServeice{
    nodemail() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: env.parsed.routingMail,
              pass: env.parsed.routingMailPassword
            }
          });
          
          const mailOptions = {
            from: 'filippov0705@gmail.com',
            to: 'filippov0705@gmail.com',
            subject: 'Exams results',
            text: 'Your mark: 8'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}

module.exports = new taskServeice();