const userRegistrationService = require("@services/userRegistrationService");

class RegistratinController {
    registration(req, res, next) {
        userRegistrationService.getAccessToken(req.body.code.slice(6)).then(response => {
            req.user = {access_token: response};
            next();
        });
    }

    newUserCreation(req, res) {
        userRegistrationService.getUserParams(req.user.access_token).then(response => console.log(response));
    }
}

module.exports = new RegistratinController();
