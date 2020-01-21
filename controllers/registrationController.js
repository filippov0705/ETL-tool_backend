const userRegistrationService = require("@services/userRegistrationService");

class RegistratinController {
    async registration(req, res, next) {
         await (async () => {
            const rawResponse = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {"Content-Type": "application/json;charset=utf-8"},
                body: JSON.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: data,
                }),
            });
            const content = await rawResponse.text();
            res.send(content);
        })();
    }
}

module.exports = new RegistratinController();
