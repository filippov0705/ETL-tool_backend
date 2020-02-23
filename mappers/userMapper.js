const rolesService = require("@services/rolesService");

class UserMapper {
    async getUserList(data) {
        const results = data.map(async item => {
            item.role = await rolesService.getUserRoles(item.id);
            return item;
        });

        const userList = await Promise.all(results);
        return userList;
    }
}

module.exports = new UserMapper();
