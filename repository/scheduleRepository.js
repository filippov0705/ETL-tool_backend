const {Schedule} = require("@models/schedules");

class ScheduleRepository {
    async createSchedule(procedureId, newSchedule) {
        const isSingle = newSchedule.periodicity === "Single";
        const periodicity = isSingle ? 1 : 2;
        const year = isSingle ? newSchedule.value[0] : null;
        const month = isSingle ? newSchedule.value[1] : null;
        const day = isSingle ? newSchedule.value[2] : null;
        const date = isSingle ? new Date(`${month},${day + 1},${year}`).getTime() : null;
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
            date,
            hour: newSchedule.value[newSchedule.value.length - 2],
            minute: newSchedule.value[newSchedule.value.length - 1],
            periodicity,
        });
    }

    async getSchedules(procedure_id) {
        const schedules = await Schedule.findAll({where: {procedure_id}, raw: true});
        console.log(schedules);
        return schedules;
    }

    async deleteSchedule(schedule_id) {
        const rez = await Schedule.destroy({where: {schedule_id}});
        return rez;
    }

    async editSchedule(schedule_id, newSchedule) {
        if (newSchedule.periodicity === "Single") {
            const [year, month, day, hour, minute] = newSchedule.value;
            await Schedule.update(
                {
                    year,
                    month,
                    day,
                    hour,
                    minute,
                },
                {where: {schedule_id}}
            );
        } else {
            await Schedule.update(
                {
                    monday: newSchedule.value.includes("Mon"),
                    tuesday: newSchedule.value.includes("Tue"),
                    wednsday: newSchedule.value.includes("Wed"),
                    thursday: newSchedule.value.includes("Thu"),
                    friday: newSchedule.value.includes("Fri"),
                    saturday: newSchedule.value.includes("Sat"),
                    sunday: newSchedule.value.includes("Sun"),
                    hour: newSchedule.value[newSchedule.value.length - 2],
                    minute: newSchedule.value[newSchedule.value.length - 1],
                },
                {where: {schedule_id}}
            );
        }
    }
}

module.exports = new ScheduleRepository();
