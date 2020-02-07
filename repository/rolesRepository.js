const {Role} = require("@models/roles");

class RolesRepository {
    async getTraineeId(transaction) {
        const roleId = await Role.findOne({attributes: ["role_id"], where: {role_name: "trainee"}, transaction});
        return roleId.dataValues.role_id;
    }

    async getAllRoles(transaction) {
        const roles = await Role.findAll({attributes: ["role_name"], raw: true, transaction});
        return roles.map(item => item.role_name);
    }

    async getRoleId(role_name, transaction) {
        const roleId = await Role.findOne({attributes: ["role_id"], where: {role_name}, transaction});
        return roleId.dataValues.role_id;
    }
}

module.exports = new RolesRepository();
