const userRegistrationService = require("@services/userRegistrationService");
const rolesService = require("@services/rolesService");
const userRolesService = require("@services/userRolesService");
const userService = require("@services/usersService");

class RegistrationController {
    async newUserCreation(req, response) {
        try {
            const tokenValue = req.cookies.access_token;
            const userData = await userRegistrationService.getUserParams(tokenValue);
            const user = await userService.findUser(userData.data.id);
            if (!user) {
                await userService.createUser(userData.data.id, userData.data.login);
                const traineeRoleId = await rolesService.getTraineeId();
                await userRolesService.create(userData.data.id, traineeRoleId);
            }
            const roles = user ? await rolesService.getUserRoles(user.dataValues.user_id) : ["trainee"];
            const isActive = user ? await userService.getUserActiveness(user.dataValues.user_id) : false;
            response.setHeader("Set-Cookie", `access_token=${tokenValue};  HttpOnly`);

            response.status(200).send({userRole: roles, login: userData.data.login, isActive});
        } catch (e) {
            response.status(403);
        }
    }

    async testCookie(req, res) {
        try {
            const accessToken = req.cookies.access_token;
            if (!req.cookies || !accessToken) {
                res.status(403).send({auth: false});
            }
            const result = await userRegistrationService.getUserParams(req.cookies.access_token);
            if (result) {
                const isActive = await userService.getUserActiveness(result.data.id);
                const role = await rolesService.getUserRoles(result.data.id);

                res.status(200).send({userRole: role, login: result.data.login, isActive});
            }
        } catch (e) {
            res.status(403).send({auth: false});
        }
    }

    logOut(req, res) {
        res.clearCookie("access_token", {httpOnly: true, path: "/api"});
        res.status(200).send(JSON.stringify({message: true}));
    }
}

module.exports = new RegistrationController();
