const userRegistrationService = require("@services/userRegistrationService");

class RegistratinController {
    async registration(req, res, next) {
        userRegistrationService
            .getAccessToken(req.body.code.slice(6))
            .then(response => {
                res.status(200).send(JSON.stringify({access_token: response}));
            });
    }
}

module.exports = new RegistratinController();
