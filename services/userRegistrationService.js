const axios = require("axios");
const {CLIENT_ID, CLIENT_SECRET} = require("@constants/environemtConstants");

class UserRegistrationService {
    getAccessToken(code) {
        return new Promise(resolve => {
            axios
                .post("https://github.com/login/oauth/access_token", {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: code,
                })
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    getUserParams(token) {
        axios
            .get("https://api.github.com/user", {
                params: {
                    access_token: response.data.match(/=\w+&/)[0].match(/\w+/)[0],
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                },
            })
            .then(function(response) {});
    }
}

module.exports = new UserRegistrationService();
