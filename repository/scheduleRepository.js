const {Schedule} = require("@models/schedules");
const {Op} = require("sequelize");
const {DAYS_OF_THE_WEEK, DAYS_OF_THE_WEEK_ABBREVIATED} = require("@constants/constants");

class ScheduleRepository {
    async createSchedule(procedure_id, newSchedule) {
        const date = newSchedule.year
            ? new Date(`${newSchedule.month},${newSchedule.day + 1},${newSchedule.year}`).getTime()
            : null;
        await Schedule.create({
            schedule_id: newSchedule.schedule_id,
            procedure_id,
            monday: newSchedule.monday,
            tuesday: newSchedule.tuesday,
            wednsday: newSchedule.wednsday,
            thursday: newSchedule.thursday,
            friday: newSchedule.friday,
            saturday: newSchedule.saturday,
            sunday: newSchedule.sunday,
            date,
            hour: newSchedule.hour,
            minute: newSchedule.minute,
            periodicity: newSchedule.periodicity,
        });
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

    async getSchedules(procedure_id) {
        const schedules = await Schedule.findAll({where: {procedure_id}, raw: true});
        return schedules;
    }

    async deleteSchedule(schedule_id) {
        const rez = await Schedule.destroy({where: {schedule_id}});
        return rez;
    }

    async editSchedule(schedule_id, newSchedule) {
        if (newSchedule.year) {
            const date = new Date(
                `${Number(newSchedule.month)},${Number(newSchedule.day) + 1},${Number(newSchedule.year)}`
            ).getTime();
            await Schedule.update(
                {
                    date,
                    hour: newSchedule.hour,
                    minute: newSchedule.minute,
                },
                {where: {schedule_id}}
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
                },
                {where: {schedule_id}}
            );
        }
    }
}

module.exports = new ScheduleRepository();
