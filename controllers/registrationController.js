const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");
const rolesService = require("@services/rolesService");
const rolesRepository = require("@repository/rolesRepository");
const userRolesRepository = require("@repository/userRolesRepository");
const querystring = require("querystring");

class RegistratinController {
    async newUserCreation(req, response) {
        try {
            const tokenValue = querystring.parse(req.user.access_token).access_token;
            const userData = await userRegistrationService.getUserParams(tokenValue);
            const user = await userRepository.findUser(userData.data.id, userData.data.login);
            if (!user) {
                await userRepository.createUser(userData.data.id, userData.data.login);
                const traineeRoleId = await rolesRepository.getTraineeId();
                await userRolesRepository.create(userData.data.id, traineeRoleId);
            }
            const roles = user ? await rolesService.getUserRoles(user.dataValues.user_id) : ["trainee"];
            response.setHeader("Set-Cookie", `access_token=${tokenValue};  HttpOnly`);

            response.status(200).send({userRole: roles});
        } catch (e) {
            response.status(403);
        }
    }

    async testCookie(req, res) {
        try {
            const accessToken = querystring.parse(req.headers.cookie).access_token;
            if (!req.headers.cookie || !accessToken) {
                res.status(403).send({auth: false});
            }
            const result = await userRegistrationService.getUserParams(
                querystring.parse(req.headers.cookie).access_token
            );
            if (result) {
                const userData = await userRepository.findUser(result.data.id);
                res.status(200).send(JSON.stringify({login: result.login, userRole: userData.dataValues.user_role}));
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

module.exports = new RegistratinController();
