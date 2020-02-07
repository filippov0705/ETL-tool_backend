const fs = require("fs");
const {sequelize} = require("@models/index");
const procedureRepository = require("@repository/procedureRepository");
const userRepository = require("@repository/userRepository");
const {USER_NOT_FOUND, NO_PROCEDURE_FOUND} = require("@constants/constants");

class ProcedureService {
    async deleteProcedure(userId, procedureId) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await userRepository.findUser(userId, transaction);
            if (!user) {
                throw new Error(USER_NOT_FOUND);
            }
            const procedures = await user.getProcedures();
            if (!procedures.length) {
                throw new Error(NO_PROCEDURE_FOUND);
            }
            const targetProcedure = procedures.find(item => item.dataValues.procedure_id === Number(procedureId));
            await procedureRepository.delete(targetProcedure.dataValues.procedure_id, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();
        }
    }

    async getUserProcedures(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await userRepository.findUser(id, transaction);
            if (!user) throw new Error(USER_NOT_FOUND);
            const procedures = await user.getProcedures({transaction});
            if (!procedures.length) return [];
            await transaction.commit();
            return procedures.map(item => {
                return {name: item.dataValues.procedure_name, id: item.dataValues.procedure_id};
            });
        } catch (err) {
            if (transaction) await transaction.rollback();
        }
    }

    async changeName(procedureId, newName) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await procedureRepository.changeName(procedureId, newName, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();
        }
    }

    async deleteAllProcedures(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await procedureRepository.delete(procedure_id, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();
        }
    }

    async makeRunMark(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await procedureRepository.makeRunMark(procedure_id, transaction);
            await transaction.commit();
            return;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
        return;
    }

    async getLastRunTimeMark(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const timeMark = await procedureRepository.getTimeMark(procedure_id, transaction);
            await transaction.commit();
            return timeMark;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async findProcedure(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const procedure = await procedureRepository.findOne(procedure_id, transaction);
            await transaction.commit();
            return procedure;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new ProcedureService();
