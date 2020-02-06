const {Procedure} = require("@models/procedures");

class ProcedureRepository {
    async findOne(id) {
        return await Procedure.findByPk(id);
    }

    async create(procedure_id, procedure_name, transaction) {
        await Procedure.create({procedure_id, procedure_name}, {transaction});
    }

    async makeRunMark(procedure_id, transaction) {
        await Procedure.update({last_execution: new Date()}, {where: {procedure_id}, transaction});
    }

    async delete(id, transaction) {
        await Procedure.destroy({where: {procedure_id: id}, transaction});
    }

    async changeName(procedure_id, procedure_name) {
        await Procedure.update({procedure_name}, {where: {procedure_id}});
    }

    async getTimeMark(procedure_id, transaction) {
        const timeMark = await Procedure.findOne({attributes: ["last_execution"], where: {procedure_id}, transaction});
        return timeMark.dataValues.last_execution;
    }
}

module.exports = new ProcedureRepository();
