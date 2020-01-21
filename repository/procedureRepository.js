const {Procedure} = require("@models/procedures");

class ProcedureRepository {
    findAll() {
        Procedure.findAll({raw: true})
            .then(procedures => {
                console.log(procedures);
            })
            .catch(err => console.log(err));
    }
}

module.exports = ProcedureRepository();
