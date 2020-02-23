const axios = require("axios");
const {CLIENT_ID, CLIENT_SECRET} = require("@constants/environemtConstants");

class UserRegistrationService {
    getAccessToken(code) {
        return axios.post("https://github.com/login/oauth/access_token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
        });
    }

    getUserParams(token) {
        return axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${token}`,
            },
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            },
        });
    }
}

module.exports = new UserRegistrationService();
