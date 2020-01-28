const {Schedule} = require("@models/schedules");

class ScheduleRepository {
    async createSchedule(procedureId, newSchedule) {
        const isSingle = newSchedule.periodicity === "Single";
        const periodisity = isSingle ? 1 : 2;
        const year = isSingle ? newSchedule.value[0] : null;
        const month = isSingle ? newSchedule.value[1] : null;
        const day = isSingle ? newSchedule.value[2] : null;

        await Schedule.create({
            schedule_id: newSchedule.id,
            procedure_id: procedureId,
            monday: newSchedule.value.includes("Mon"),
            tuesday: newSchedule.value.includes("Tue"),
            wednsday: newSchedule.value.includes("Wed"),
            thursday: newSchedule.value.includes("Thu"),
            friday: newSchedule.value.includes("Fri"),
            saturday: newSchedule.value.includes("Sat"),
            sunday: newSchedule.value.includes("Sun"),
            year,
            month,
            day,
            hour: newSchedule.value[newSchedule.value.length - 1],
            minute: newSchedule.value[newSchedule.value.length - 2],
            periodisity,
        });
    }

    async getSchedules(procedure_id) {
        const schedules = await Schedule.findAll({where: {procedure_id}, raw: true});
        return schedules;
    }
}

module.exports = new ScheduleRepository();
