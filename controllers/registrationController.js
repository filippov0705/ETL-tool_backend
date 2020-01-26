const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");

class RegistratinController {
    registration(req, res, next) {
        userRegistrationService.getAccessToken(req.body.code.slice(6)).then(response => {
            req.user = {access_token: response};
            next();
        });
    }

    newUserCreation(req, response) {
        userRegistrationService.getUserParams(req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]).then(userData => {
            userRepository
                .findUser(userData.id, userData.login)
                .then(user => {
                    if (!user) {
                        userRepository.createUser(userData.id, userData.login);
                    }
                    response.setHeader(
                        "Set-Cookie",
                        `access_token=${req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]};  HttpOnly`
                    );
                    response.status(200).send(JSON.stringify({login: userData.login}));
                })
        });
    }

    testCookie(req, res) {
        try {
            if (!req.headers.cookie || !req.headers.cookie.split("=")[1]) {
                res.status(403).send(JSON.stringify({auth: false}));
            }
            userRegistrationService.getUserParams(req.headers.cookie.split("=")[1]).then(result => {
                if (result) {
                    res.status(200).send(JSON.stringify({login: result.login}));
                }
            });
        } catch (e) {
            res.status(403).send(JSON.stringify({auth: false}));
        }
    }

    logOut(req, res) {
        res.clearCookie('access_token', { httpOnly: true, path: '/api' });
            res
                .status(200).send(JSON.stringify({message: true}));
    }
}

module.exports = new RegistratinController();
