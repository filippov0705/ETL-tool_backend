const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");
const querystring = require('querystring');

class RegistratinController {
    async getUserParams(req, res, next) {
        try {
            let userData = await userRegistrationService.getUserParams(
                querystring.parse(req.headers.cookie).access_token
            );
            req.user = {login: userData.login, id: userData.id};
            next();
        } catch (e) {
            res.status(400);
        }
    }

    async registration(req, res, next) {
        try {
            let access_token = await userRegistrationService.getAccessToken(querystring.parse(req.body.code)["?code"]);
            req.user = {access_token};
            next();
        } catch (e) {
            res.status(400);
        }
    }

    async newUserCreation(req, response) {
        try {
            const tokenValue = querystring.parse(req.user.access_token).access_token;
            let userData = await userRegistrationService.getUserParams(tokenValue);
            let user = await userRepository.findUser(userData.id, userData.login);
            if (!user) {
                userRepository.createUser(userData.id, userData.login);
            }
            response.setHeader("Set-Cookie", `access_token=${tokenValue};  HttpOnly`);
            response.status(200).send(JSON.stringify({login: userData.login}));
        } catch (e) {
            response.status(403);
        }
    }

    async testCookie(req, res) {
        try {
            if (!req.headers.cookie || !querystring.parse(req.headers.cookie).access_token) {
                res.status(403).send(JSON.stringify({auth: false}));
            }
            let result = await userRegistrationService.getUserParams(
                querystring.parse(req.headers.cookie).access_token
            );
            if (result) {
                res.status(200).send(JSON.stringify({login: result.login}));
            }
        } catch (e) {
            res.status(403).send(JSON.stringify({auth: false}));
        }
    }

    logOut(req, res) {
        res.clearCookie("access_token", {httpOnly: true, path: "/api"});
        res.status(200).send(JSON.stringify({message: true}));
    }
}

module.exports = new RegistratinController();
