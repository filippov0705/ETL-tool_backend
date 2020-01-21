const {User} = require("@models/user");
const {Procedure, procedureRepository} = require("@models/procedures");
const {User_procedure} = require("@models/userProcedure");
const {Op} = require("sequelize");

const fs = require("fs");

class ProcedureService {
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }

    setFileToDB(file, data) {
        return fs.writeFileSync(file, JSON.stringify(data));
    }

    readUsersFromDB() {
    }
}

module.exports = new ProcedureService();
