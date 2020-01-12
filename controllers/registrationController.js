class RegistratinController {
    registration() {
        const data = req.body;

        (async () => {
            const rawResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                client_id: 'e8b244bda58bacfbcc88',
                client_secret: '7941c3ce2718ec554fa12ed4adceb48ea23e96c7',
                code: (data.code)
            })
        })
        const content = await rawResponse.text();
        res.send(content);
        })();
    }
}

module.exports = new RegistratinController();