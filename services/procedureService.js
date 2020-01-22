// const {User} = require("@models/user");
// const {Procedure} = require("@models/procedures");
// const {User_procedure} = require("@models/userProcedure");
// const {Op} = require("sequelize");
const userRepository = require("@repository/userRepository");

const fs = require("fs");

class ProcedureService {
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }

    setFileToDB(file, data) {
        return fs.writeFileSync(file, JSON.stringify(data));
    }

    getUserProcedures(id) {
        return new Promise(resolve => {
            userRepository.findUser(id).then(user => {
                if (!user) return [];
                user.getProcedures().then(procedures => {
                    if(!procedures.length) return [];
                    resolve(procedures.map(item => {
                        return {name: item.dataValues.procedure_name, id: item.dataValues.procedure_id}
                    }));
                });
            });
        });
    }
}

module.exports = new ProcedureService();
