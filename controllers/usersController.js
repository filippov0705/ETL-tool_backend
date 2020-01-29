const usersService = require("@services/usersService");

const {ERROR} = require("@constants/constants");

class UsersController {
    async getUsers(req, res) {
        try {
            const allUsers = await usersService.getAllUsers();
            const newAllUserList = allUsers.map(item => {
                return {
                    id: item.user_id,
                    name: item.user_login,
                    role: item.user_role,
                };
            });
            res.status(200).send(newAllUserList);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }
}

module.exports = new UsersController();
