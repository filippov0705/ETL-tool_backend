const path = require('path');
const env = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

class RegistratinController {
    registration() {
        const data = req.body;

        (async () => {
            const rawResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                client_id: env.parsed.client_id,
                client_secret: env.parsed.client_secret,
                code: (data.code)
            })
        });
        const content = await rawResponse.text();
        res.send(content);
        })();
    }
}

module.exports = new RegistratinController();