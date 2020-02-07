const fs = require("fs");
const {sequelize} = require("@models/index");
const scheduleRepository = require("@repository/scheduleRepository");
const {ERROR, DAYS_OF_THE_WEEK} = require("@constants/constants");

class ScheduleService {
    async getClosestProceduresSchedules(date, dayOfTheWeek) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const schedules = await scheduleRepository.findInArray(date, dayOfTheWeek, transaction);
            await transaction.commit();
            return schedules;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async deleteSchedule(schedule_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await scheduleRepository.deleteSchedule(schedule_id, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async createSchedule(procedureId, newSchedule) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await scheduleRepository.createSchedule(procedureId, newSchedule, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async editSchedule(scheduleId, newSchedule) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await scheduleRepository.editSchedule(scheduleId, newSchedule, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getSchedules(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const schedulesData = await scheduleRepository.getSchedules(procedure_id, transaction);
            await transaction.commit();
            return schedulesData;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async findScheduleProcedure(schedule_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const procedureId = await scheduleRepository.findProcedureId(schedule_id, transaction);
            await transaction.commit();
            return procedureId;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    isInHourInterval(newSchedule) {
        const dateNow = new Date();
        if (
            (dateNow.getFullYear() === Number(newSchedule.year) &&
                dateNow.getMonth() + 1 === Number(newSchedule.month) &&
                dateNow.getDate() === Number(newSchedule.day)) ||
            (DAYS_OF_THE_WEEK[dateNow.getDay()] &&
                ((dateNow.getHours() === Number(newSchedule.hour) &&
                    dateNow.getMinutes() <= Number(newSchedule.minute)) ||
                    (dateNow.getHours() + 1 === Number(newSchedule.hour) &&
                        dateNow.getMinutes() >= Number(newSchedule.minute))))
        )
            return true;
        return false;
    }
}

module.exports = new ScheduleService();
