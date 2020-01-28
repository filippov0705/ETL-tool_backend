const userRegistrationService = require("@services/userRegistrationService");
const querystring = require("querystring");

class UserMiddleware {
    async getUserParams(req, res, next) {
        const accessToken = querystring.parse(req.headers.cookie).access_token;
        try {
            const userData = await userRegistrationService.getUserParams(accessToken);
            req.user = {login: userData.data.login, id: userData.data.id};
            next();
        } catch (e) {
            res.status(400);
        }
    }
}

module.exports = new UserMiddleware();
