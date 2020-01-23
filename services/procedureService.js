const procedureRepository = require("@repository/procedureRepository");
const userRepository = require("@repository/userRepository");

const fs = require("fs");

class ProcedureService {
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }

    setFileToDB(file, data) {
        return fs.writeFileSync(file, JSON.stringify(data));
    }

    deleteProcedure(userId, procedureId) {
        return new Promise(resolve => {
            userRepository.findUser(userId).then(user => {
                if (!user) resolve();
                user.getProcedures().then(procedures => {
                    if (!procedures.length) resolve();
                    procedures.forEach(item => {
                        if (item.dataValues.procedure_id === Number(procedureId)) {
                            procedureRepository.delete(item.dataValues.procedure_id);
                            resolve();
                        }
                    });
                });
            });
        });
    }

    getUserProcedures(id) {
        return new Promise(resolve => {
            userRepository.findUser(id).then(user => {
                if (!user) resolve();
                user.getProcedures().then(procedures => {
                    if (!procedures.length) {
                        resolve([]);
                    }
                    resolve(
                        procedures.map(item => {
                            return {name: item.dataValues.procedure_name, id: item.dataValues.procedure_id};
                        })
                    );
                });
            });
        });
    }
}

module.exports = new ProcedureService();
