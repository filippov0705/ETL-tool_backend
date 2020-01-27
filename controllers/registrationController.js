const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");
const queryString = require('query-string');

class RegistratinController {
    getUserParams(req, res, next) {
        userRegistrationService.getUserParams(queryString.parse(req.headers.cookie).access_token).then(userData => {
           req.user = {login: userData.login, id: userData.id }
            next();
        });
    }

    registration(req, res, next) {
        userRegistrationService.getAccessToken(queryString.parse(req.body.code).code).then(response => {
            req.user = {access_token: response};
            next();
        });
    }

    newUserCreation(req, response) {
        const tokenValue = queryString.parse(req.user.access_token).access_token;
        userRegistrationService.getUserParams(tokenValue).then(userData => {
            userRepository
                .findUser(userData.id, userData.login)
                .then(user => {
                    if (!user) {
                        userRepository.createUser(userData.id, userData.login);
                    }
                    response.setHeader(
                        "Set-Cookie",
                        `access_token=${tokenValue};  HttpOnly`
                    );
                    response.status(200).send(JSON.stringify({login: userData.login}));
                })
        });
    }

    testCookie(req, res) {
        try {
            if (!req.headers.cookie || !queryString.parse(req.headers.cookie).access_token) {
                res.status(403).send(JSON.stringify({auth: false}));
            }
            userRegistrationService.getUserParams(queryString.parse(req.headers.cookie).access_token).then(result => {
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
