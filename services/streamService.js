const fs = require('fs');
const stream = require('stream')
const XLSX = require("xlsx");

class StreamService {
    readStream(filePath) {
        return new Promise((resolve) => {
            const chunks = [];
            const stream = fs.createReadStream(filePath);
            stream.on('data', chunk => chunks.push(chunk));

            stream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
        })
    }
}

module.exports = new StreamService();