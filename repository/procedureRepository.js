const {Procedure} = require("@models/procedures");
const {Task} = require("@models/tasks");
const userProcedureRepository = require("@repository/userProcedureRepository");

class ProcedureRepository {
    async findOne(id) {
        return await Procedure.findByPk(id);
    }

    findAll() {
        Procedure.findAll({raw: true})
            .then(procedures => {
            })
            .catch(err => console.log(err));
    }

    create(userId, procedureId, procedureName) {
        Procedure.create({
            procedure_id: procedureId,
            procedure_name: procedureName,
        }).then(() => {
            userProcedureRepository.create(userId, procedureId);
        });
    }

    delete(id) {
        Procedure.destroy({where: {procedure_id: id}});
    }
}

module.exports = new ProcedureRepository();
