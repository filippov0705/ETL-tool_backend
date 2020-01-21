const fetch = require("node-fetch");
const {CLIENT_ID, CLIENT_SECRET} = require("@constants/environemtConstants");

class UserRegistrationService {
    getAccessToken(code) {
        return new Promise(resolve => {
        fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
            }),
        })
            .then(response => response.text())
            .then(content => resolve(content));
        });
    }
}

module.exports = new UserRegistrationService();
