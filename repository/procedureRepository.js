const {Procedure} = require("@models/procedures");
const userProcedure = require("@repository/userProcedureRepository");

class ProcedureRepository {
    findAll() {
        Procedure.findAll({raw: true})
            .then(procedures => {
                console.log(procedures);
            })
            .catch(err => console.log(err));
    }

    create(userId, procedureId, procedureName) {
        Procedure.create({
            procedure_id: procedureId,
            procedure_name: procedureName,
        }).then(() => {
            return userProcedure.create(userId, procedureId);
        });
    }
}

module.exports = new ProcedureRepository();
