const {Procedure} = require("@models/procedures");

class ProcedureRepository {
    async findOne(id) {
        return await Procedure.findByPk(id);
    }

    findAll() {
        Procedure.findAll({raw: true})
            .then(procedures => {});
    }

    async create(procedureId, procedureName) {
        await Procedure.create({
            procedure_id: procedureId,
            procedure_name: procedureName,
        });
    }

    delete(id) {
        Procedure.destroy({where: {procedure_id: id}});
    }
}

module.exports = new ProcedureRepository();
