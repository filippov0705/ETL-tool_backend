const userRegistrationService = require("@services/userRegistrationService");
const querystring = require("querystring");

class UserMiddleware {
    async getUserParams(req, res, next) {
        const accessToken = querystring.parse(req.headers.cookie).access_token;
        try {
            const userData = await userRegistrationService.getUserParams(
                querystring.parse(req.headers.cookie).access_token
            );
            if (!userData.login || !userData.id) throw new Error();
            req.user = {login: userData.login, id: userData.id};
            next();
        } catch (e) {
            res.status(400);
        }
    }
}

module.exports = new UserMiddleware();
