const userRegistrationService = require("@services/userRegistrationService");
const userRepository = require("@repository/userRepository");

class RegistratinController {
    registration(req, res, next) {
        console.log('ref')
        userRegistrationService.getAccessToken(req.body.code.slice(6)).then(response => {
            req.user = {access_token: response};
            next();
        });
    }

    newUserCreation(req, res) {
        userRegistrationService.getUserParams(req.user.access_token).then(response => {
            userRepository.findUser(response.id).then(response => {
                if (!response) {
                    userRepository.createUser(response.id, response.login);
                    res.status(200).send(JSON.stringify({token: req.user.access_token}));
                } else {
                    console.log(req.user.access_token);
                    console.log(req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]);
                    // res.setHeader('Set-Cookie', `access_token=${req.user.access_token.match(/=\w+&/)[0].match(/\w+/)[0]}; expires=${new Date(Date.now() + 900000)} HttpOnly`);
                    res.setHeader('Set-Cookie', `access_token=12345; HttpOnly`);
                    res.status(200).send(JSON.stringify({value: 'check'}));
                }
            });
        });
    }

    testCookie(req, res) {
        console.log('!!!!!')
        console.log(req.headers)
    }
}

module.exports = new RegistratinController();
