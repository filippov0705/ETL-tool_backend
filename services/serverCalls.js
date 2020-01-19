require('module-alias/register');

const constants = require("@constants/constants");

const {
    SUCCESS,
    ERROR} = constants;

class ProcedureService {
    readFromFTP(task) {
        return new Promise(resolve => {
            try {
                const FtpClient = require('ftp');
                const c = new FtpClient();

                c.connect({
                    host: task.settings.host,
                    user: task.settings.user,
                    password: task.settings.password
                });

                c.on('ready', function () {
                    c.get('/readme.txt', function (err, stream) {
                        let content = '';
                        stream.on('data', function (chunk) {
                            content += chunk.toString();
                        });
                        stream.on('end', function () {
                            console.log(content)
                            resolve({status: SUCCESS, runResult: content});
                        });
                    })
                });
            } catch(error) {
                resolve({status: ERROR});
            }
        });
    }
}

module.exports = new ProcedureService();