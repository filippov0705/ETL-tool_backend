const procedureRepository = require("@repository/procedureRepository");
const userProcedureRepository = require("@repository/userProcedureRepository");
const {sequelize} = require("@models/index");

class CreateProcedureService {
    async createProcedure(userId, procedureName, procedureId) {
        let transaction;
        try {
            console.log('!!!!!!!!!!!!!')
            transaction = await sequelize.transaction();
            await procedureRepository.create(procedureId, procedureName, transaction);
            await userProcedureRepository.create(userId, procedureId, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new CreateProcedureService();
