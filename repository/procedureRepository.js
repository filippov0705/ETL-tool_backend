const {Procedure} = require("@models/procedures");

class ProcedureRepository {
    async findOne(id) {
        return await Procedure.findByPk(id);
    }

    async create(procedureId, procedureName) {
        await Procedure.create({
            procedure_id: procedureId,
            procedure_name: procedureName,
        });
    }

    async delete(id) {
        await Procedure.destroy({where: {procedure_id: id}});
    }

    async changeName(procedure_id, procedure_name) {
        await Procedure.update({procedure_name}, {where: {procedure_id}});
    }
}

module.exports = new ProcedureRepository();
