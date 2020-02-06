const constantRepository = require("@repository/constantRepository");
const {sequelize} = require("@models/index");

class ConstantsService {
    async getConstant(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const constantName = await constantRepository.getConstantName(id, transaction);
            await transaction.commit();
            return constantName;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getConstantId(periodicity) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const constantId = await constantRepository.getConstantId(periodicity, transaction);
            await transaction.commit();
            return constantId;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new ConstantsService();
