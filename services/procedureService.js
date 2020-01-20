const {User} = require("@repostory/user");
const {Procedure} = require("@repostory/procedures");
const {User_procedure} = require("@repostory/userProcedure");
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
