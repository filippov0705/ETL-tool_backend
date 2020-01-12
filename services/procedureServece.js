const fs = require('fs');

class ProcedureServeice{
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    setFileToDB(file, data) {
        return fs.writeFileSync(file, JSON.stringify(data));
    }

}

module.exports = new ProcedureServeice();