const userRepository = require("@repository/userRepository");
const userRolesRepository = require("@repository/userRolesRepository");
const rolesRepository = require("@repository/rolesRepository");
const {USER_NOT_FOUND, Role_NOT_FOUND} = require("@constants/constants");

class RolesService {
    async getUserRoles(id) {
        const user = await userRepository.findUser(id);
        if (!user) throw new Error(USER_NOT_FOUND);
        const roles = await user.getRoles();
        return roles.map(item => item.dataValues.role_name);
    }

    async getPossibleRoles() {
        const possibleRoles = await rolesRepository.getAllRoles();
        return possibleRoles;
    }

    async addRole(id, role) {
        const roleId = await rolesRepository.getRoleId(role);
        console.log(roleId)
    }
}

module.exports = new RolesService();