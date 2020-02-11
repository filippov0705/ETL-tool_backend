const usersService = require("@services/usersService");
const procedureService = require("@services/procedureService");
const rolesService = require("@services/rolesService");
const userMapper = require("@mappers/userMapper");
const logsService = require("@services/logsService");

const {ERROR, NAME, INVALID_USER_ACTION} = require("@constants/constants");

class UsersController {
    async getUserLogs(req, res) {
        try {
            const {page, logsNumber} = req.query;
            const {id} = req.user;
            const {order, procedureName} = req.body;

            const logs = await logsService.getUserLogs(id);
            const dataToSend = logsService.formatLogs(logs, {page, logsNumber, order, procedureName});

            res.status(200).send(dataToSend);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

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

            const userList = await userMapper.getUserList(newAllUserList);
            res.status(200).send(userList);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

    async changeUserParameter(req, res) {
        try {
            const {userId} = req.params;
            const {state, value} = req.body;
            if (state === NAME) {
                await usersService.changeUserName(userId, value);
            } else {
                if (req.user.id === Number(userId)) throw new Error(INVALID_USER_ACTION);
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
            if (req.user.id === Number(userId)) throw new Error(INVALID_USER_ACTION);
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
