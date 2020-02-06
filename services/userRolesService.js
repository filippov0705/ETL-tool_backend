const userRolesRepository = require("@repository/userRolesRepository");

class UserRolesService {
    async create(user_id, traineeRoleId) {
        await userRolesRepository.create(user_id, traineeRoleId);
    }
}

module.exports = new UserRolesService();
