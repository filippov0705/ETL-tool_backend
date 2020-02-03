const usersService = require("@services/usersService");
const procedureService = require("@services/procedureService");
const rolesService = require("@services/rolesService");

const {ERROR} = require("@constants/constants");

class UsersController {
    async getUsers(req, res) {
        try {
            const allUsers = await usersService.getAllUsers();
            const newAllUserList = allUsers.map(item => {
                return {
                    id: item.user_id,
                    name: item.user_name,
                    login: item.user_login,
                    isActive: item.is_active,
                };
            });

            const results = newAllUserList.map(async item => {
                item.role = await rolesService.getUserRoles(item.id);
                return item;
            });

            const userList = await Promise.all(results);
            res.status(200).send(userList);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

    async changeUserParameter(req, res) {
        try {
            const {userId} = req.params;
            const {state, value} = req.body;
            if (state === "name") {
                await usersService.changeUserName(userId, value);
            } else {
                if (req.user.id === Number(userId)) throw new Error();
                await usersService.changeActiveness(userId, value);
            }
            res.status(200).send(value);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

    async deleteRole(req, res) {
        try {
            const {userId, role} = req.params;
            if (req.user.id === Number(userId)) throw new Error();
            await rolesService.deleteRole(userId, role);
            res.status(200).send(200);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

    async deleteUser(req, res) {
        try {
            const {userId} = req.params;
            const proceduresData = await procedureService.getUserProcedures(userId);
            if (req.user.id === Number(userId)) throw new Error();
            await Promise.all(proceduresData.map(item => procedureService.deleteAllProcedures(item.id)));
            await usersService.deleteUser(userId);
            res.status(200).send(200);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }
}

module.exports = new UsersController();
