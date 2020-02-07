const {UserRoles} = require("@models/userRoles");

class UserRolesRepository {
    async create(user_id, role_id, transaction) {
        await UserRoles.create({user_id, role_id}, {transaction});
    }

    async deleteRole(user_id, role_id, transaction) {
        await UserRoles.destroy({where: {user_id, role_id}, transaction});
    }
}

module.exports = new UserRolesRepository();
