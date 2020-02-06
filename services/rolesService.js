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

    async addRole(user_id, role) {
        const roleId = await rolesRepository.getRoleId(role);
        await userRolesRepository.create(user_id, roleId);
    }

    async deleteRole(user_id, role) {
        const roleId = await rolesRepository.getRoleId(role);
        await userRolesRepository.deleteRole(user_id, roleId);
    }

    async getTraineeId() {
        const traineeRoleId = await rolesRepository.getTraineeId();
        return traineeRoleId;
    }
}

module.exports = new RolesService();
