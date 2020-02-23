const {Procedure} = require("@models/procedures");

class ProcedureRepository {
    async findProcedureName(procedure_id, transaction) {
        const procedureName = await Procedure.findOne({
            attributes: ["procedure_name"],
            where: {procedure_id},
            transaction,
        });
        return procedureName.dataValues.procedure_name;
    }

    async findOne(procedure_id, transaction) {
        return await Procedure.findOne({where: {procedure_id}, transaction});
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

    async changeName(procedure_id, procedure_name, transaction) {
        await Procedure.update({procedure_name}, {where: {procedure_id}, transaction});
    }

    async getTimeMark(procedure_id, transaction) {
        const timeMark = await Procedure.findOne({attributes: ["last_execution"], where: {procedure_id}, transaction});
        return timeMark.dataValues.last_execution;
    }
}

module.exports = new ProcedureRepository();
