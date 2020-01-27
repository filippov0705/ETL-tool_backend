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

    async deleteProcedure(userId, procedureId) {
        let user = await userRepository.findUser(userId);
        if (!user) return;
        let procedures = await user.getProcedures();
        if (!procedures.length) return;
        procedures.forEach(item => {
            if (item.dataValues.procedure_id === Number(procedureId)) {
                procedureRepository.delete(item.dataValues.procedure_id);
                return;
            }
        });
    }

    async getUserProcedures(id) {
        let user = await userRepository.findUser(id);
        if (!user) return;
        let procedures = await user.getProcedures();
        if (!procedures.length) return [];
        return procedures.map(item => {
            return {name: item.dataValues.procedure_name, id: item.dataValues.procedure_id};
        });
    }
}

module.exports = new ProcedureService();
