const FtpClient = require("ftp");

const {SUCCESS, ERROR} = require("@constants/constants");

class ProcedureService {
    readFromFTP(task) {
        return new Promise(resolve => {
            try {
                const c = new FtpClient();
                c.connect({
                    host: task.settings.host,
                    user: task.settings.user,
                    password: task.settings.password,
                });

                c.on("error", () => resolve({status: ERROR}));

                c.on("ready", function() {
                    c.get(`/${task.settings.name}`, function(err, stream) {
                        let content = "";
                        stream.on("data", function(chunk) {
                            content += chunk.toString();
                        });
                        stream.on("end", function() {
                            resolve(content);
                        });
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = new ProcedureService();
