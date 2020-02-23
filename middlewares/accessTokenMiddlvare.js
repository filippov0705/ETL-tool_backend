const userRegistrationService = require("@services/userRegistrationService");
const querystring = require("querystring");

class AccessTokenMiddlvare {
    async registration(req, res, next) {
        try {
            const access_token = await userRegistrationService.getAccessToken(
                querystring.parse(req.body.code)["?code"]
            );
            req.user = {access_token: access_token.data};
            next();
        } catch (e) {
            res.status(400);
        }
    }
}

module.exports = new AccessTokenMiddlvare();
