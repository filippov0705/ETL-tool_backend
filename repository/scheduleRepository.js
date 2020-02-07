const {Schedule} = require("@models/schedules");
const {Op} = require("sequelize");
const {DAYS_OF_THE_WEEK, DAYS_OF_THE_WEEK_ABBREVIATED} = require("@constants/constants");

class ScheduleRepository {
    async createSchedule(procedure_id, newSchedule, transaction) {
        const date = newSchedule.year
            ? new Date(`${newSchedule.month},${newSchedule.day + 1},${newSchedule.year}`).getTime()
            : null;
        newSchedule.procedure_id = procedure_id;
        newSchedule.date = date;
        await Schedule.create(newSchedule, {transaction});
    }

    async findProcedureId(schedule_id, transaction) {
        const procedureId = await Schedule.findOne({attributes: ["procedure_id"], where: {schedule_id}, transaction});
        return procedureId.dataValues.procedure_id;
    }

    async findInArray(newDate, dayOfTheWeek, transaction) {
        const date = new Date(`${newDate.getMonth() + 1},${newDate.getDate() + 1},${newDate.getFullYear()}`).getTime();
        const schedules = await Schedule.findAll({
            where: {
                [Op.or]: [{[dayOfTheWeek]: true}, {date}],
                [Op.or]: [
                    {hour: newDate.getHours(), minute: {[Op.gte]: newDate.getMinutes()}},
                    {hour: newDate.getHours() + 1, minute: {[Op.lte]: newDate.getMinutes()}},
                ],
            },
            raw: true,
            transaction,
        });
        return schedules;
    }

    async getSchedules(procedure_id, transaction) {
        const schedules = await Schedule.findAll({where: {procedure_id}, raw: true, transaction});
        return schedules;
    }

    async deleteSchedule(schedule_id, transaction) {
        const rez = await Schedule.destroy({where: {schedule_id}, transaction});
        return rez;
    }

    async editSchedule(schedule_id, newSchedule, transaction) {
        if (newSchedule.year) {
            const date = new Date(
                `${Number(newSchedule.month)},${Number(newSchedule.day) + 1},${Number(newSchedule.year)}`
            ).getTime();
            await Schedule.update(
                {
                    date,
                    hour: newSchedule.hour,
                    minute: newSchedule.minute,
                    schedule_id: newSchedule.schedule_id,
                },
                {where: {schedule_id}, transaction}
            );
        } else {
            await Schedule.update(
                {
                    monday: newSchedule.monday,
                    tuesday: newSchedule.tuesday,
                    wednsday: newSchedule.wednsday,
                    thursday: newSchedule.thursday,
                    friday: newSchedule.friday,
                    saturday: newSchedule.saturday,
                    sunday: newSchedule.sunday,
                    hour: newSchedule.hour,
                    minute: newSchedule.minute,
                    schedule_id: newSchedule.schedule_id,
                },
                {where: {schedule_id}, transaction}
            );
        }
    }
}

module.exports = new ScheduleRepository();
