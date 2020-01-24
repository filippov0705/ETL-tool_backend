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

        userRegistrationService.getUserParams(req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]).then(res => {
            userRepository
                .findUser(res.id)
                .then(user => {
                    if (!user) {
                        userRepository.createUser(response.id, response.login);
                        response.setHeader(
                            "Set-Cookie",
                            `access_token=${req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]};  HttpOnly`
                        );
                        res.status(200).send(JSON.stringify({access_token: req.user.access_token}));
                    } else {
                        response.setHeader(
                            "Set-Cookie",
                            `access_token=${req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]};  HttpOnly`
                        );
                        response
                            .status(200)
                            .send(
                                JSON.stringify({access_token: req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]})
                            );
                    }
                })
                .catch(err => console.log(err));
        });
    }

    testCookie(req, res) {
        try {
            if (!req.headers.cookie || !req.headers.cookie.split("=")[1]) {
                res.status(200).send(JSON.stringify({auth: false}));
            }
            userRegistrationService.getUserParams(req.headers.cookie.split("=")[1]).then(result => {
                if (result) {
                    res.status(200).send(JSON.stringify({auth: true}));
                }
            });
        } catch (e) {
            res.status(400).send(JSON.stringify({auth: false}));
        }
    }

    logOut(req, res) {
        res.clearCookie('access_token', { httpOnly: true, path: '/api/main' });
            res
                .status(200).send(JSON.stringify({message: true}))
    }
}

module.exports = new RegistratinController();
