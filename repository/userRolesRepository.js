const {UserRoles} = require("@models/userRoles");

class UserRolesRepository {
    async create(user_id, role_id) {
        await UserRoles.create({user_id, role_id});
    }

    async deleteRole(user_id, role_id) {
        await UserRoles.destroy({where: {user_id, role_id}});
    }
}

module.exports = new UserRolesRepository();
