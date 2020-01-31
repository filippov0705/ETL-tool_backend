const {Role} = require("@models/roles");

class RolesRepository {
    async getTraineeId() {
        const roleId = await Role.findOne({attributes: ["role_id"], where: {role_name: "trainee"}});
        return roleId.dataValues.role_id;
    }

    async getAllRoles() {
        const roles = await Role.findAll({attributes: ["role_name"], raw: true});
        return roles.map(item => item.role_name);
    }

    async getRoleId(role) {
        // const
    }
}

module.exports = new RolesRepository();
