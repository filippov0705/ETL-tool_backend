const fs = require("fs");
const {sequelize} = require("@models/index");
const scheduleRepository = require("@repository/scheduleRepository");
const {USER_NOT_FOUND, NO_PROCEDURE_FOUND} = require("@constants/constants");

class ScheduleService {
    async getClosestProceduresId(date, dayOfTheWeek) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const schedules = await scheduleRepository.findInArray(date, dayOfTheWeek, transaction);

            if (schedules.length === 0) return [];


        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new ScheduleService();
