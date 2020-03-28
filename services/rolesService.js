const userRepository = require("@repository/userRepository");
const userRolesRepository = require("@repository/userRolesRepository");
const rolesRepository = require("@repository/rolesRepository");
const {sequelize} = require("@models/index");
const {USER_NOT_FOUND, Role_NOT_FOUND} = require("@constants/constants");

class RolesService {
    async getUserRoles(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await userRepository.findUser(id, transaction);
            if (!user) throw new Error(USER_NOT_FOUND);
            const roles = await user.getRoles({transaction});
            await transaction.commit();
            return roles.map(item => item.dataValues.role_name);
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getPossibleRoles() {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const possibleRoles = await rolesRepository.getAllRoles(transaction);
            await transaction.commit();
            return possibleRoles;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async addRole(user_id, role) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const roleId = await rolesRepository.getRoleId(role, transaction);
            await userRolesRepository.create(user_id, roleId, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async deleteRole(user_id, role) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const roleId = await rolesRepository.getRoleId(role, transaction);
            await userRolesRepository.deleteRole(user_id, roleId, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getTraineeId() {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const traineeRoleId = await rolesRepository.getTraineeId(transaction);
            await transaction.commit();
            return traineeRoleId;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new RolesService();
