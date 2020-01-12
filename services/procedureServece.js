const fs = require('fs');

class ProcedureServeice{
    getFileFromDB(file) {
        try {
            return JSON.parse(fs.readFileSync(file, 'utf8'));
        } catch (e) {
            return [];
        }
    }

    setFileToDB(file, data) {
        try {
            return fs.writeFileSync(file, JSON.stringify(data));
        } catch (e) {
            return null;
        }
    }

}

module.exports = new ProcedureServeice();