const userRegistrationService = require("@services/userRegistrationService");
const querystring = require("querystring");

const {REGISTRATION_ERROR} = require("@constants/constants");

class UserMiddleware {
    async getUserParams(req, res, next) {
        const accessToken = querystring.parse(req.headers.cookie).access_token;
        try {
            const userData = await userRegistrationService.getUserParams(accessToken);
            if (!userData.data.login || !userData.data.id) throw new Error(REGISTRATION_ERROR);
            req.user = {login: userData.data.login, id: userData.data.id};
            next();
        } catch (e) {
            res.status(400);
        }
    }
}

module.exports = new UserMiddleware();
