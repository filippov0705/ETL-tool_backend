const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");
const querystring = require("querystring");

class RegistratinController {
    async newUserCreation(req, response) {
        try {
            const tokenValue = querystring.parse(req.user.access_token).access_token;
            const userData = await userRegistrationService.getUserParams(tokenValue);
            const user = await userRepository.findUser(userData.data.id, userData.data.login);
            if (!user) {
                userRepository.createUser(userData.id, userData.login);
            }
            response.setHeader("Set-Cookie", `access_token=${tokenValue};  HttpOnly`);
            response.status(200).send({login: userData.login});
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
            const result = await userRegistrationService.getUserParams(accessToken);
            if (result.data) {
                res.status(200).send({login: result.data.login});
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
