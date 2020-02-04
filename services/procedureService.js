const fs = require("fs");
const {sequelize} = require("@models/index");
const procedureRepository = require("@repository/procedureRepository");
const userRepository = require("@repository/userRepository");
const {USER_NOT_FOUND, NO_PROCEDURE_FOUND} = require("@constants/constants");

class ProcedureService {
    async deleteProcedure(userId, procedureId) {
        const user = await userRepository.findUser(userId);
        if (!user) throw new Error(USER_NOT_FOUND);
        const procedures = await user.getProcedures();
        if (!procedures.length) throw new Error(NO_PROCEDURE_FOUND);
        procedures.forEach(item => {
            if (item.dataValues.procedure_id === Number(procedureId)) {
                procedureRepository.delete(item.dataValues.procedure_id);
                return;
            }
        });
    }

    async getUserProcedures(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await userRepository.findUser(id, transaction);
            if (!user) throw new Error(USER_NOT_FOUND);
            const procedures = await user.getProcedures({transaction});
            if (!procedures.length) return [];
            return procedures.map(item => {
                return {name: item.dataValues.procedure_name, id: item.dataValues.procedure_id};
            });
        } catch (err) {
            if (transaction) await transaction.rollback();
        }
    }

    async changeName(procedureId, newName) {
        await procedureRepository.changeName(procedureId, newName);
    }

    async deleteAllProcedures(procedure_id) {
        await procedureRepository.delete(procedure_id);
    }
}

module.exports = new ProcedureService();
