const {UserRoles} = require("@models/userRoles");

class UserRolesRepository {
    async create(user_id, role_id) {
        UserRoles.create({user_id, role_id})
        return;
    }
}

module.exports = new UserRolesRepository();
