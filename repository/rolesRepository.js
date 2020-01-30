const {Role} = require("@models/roles");

class RolesRepository {
    async getTraineeId() {
        const roleId = await Role.findOne({attributes: ["role_id"], where: {role_name: "trainee"}});
        return roleId.dataValues.role_id;
    }
}

module.exports = new RolesRepository();
