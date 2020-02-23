const userRolesRepository = require("@repository/userRolesRepository");
const {sequelize} = require("@models/index");

class UserRolesService {
    async create(user_id, traineeRoleId) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userRolesRepository.create(user_id, traineeRoleId, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new UserRolesService();
