const cron = require("node-cron");
const procedureController = require("@controllers/procedureController.js");
const scheduleService = require("@services/scheduleService");
const runProcedureController = require("@controllers/runProcedureController");

const {DAYS_OF_THE_WEEK} = require("@constants/constants");

class Schedules {
    constructor() {
        this.runingSchedules = {};
    }

    async getSchedulesFromBD(minutes) {
        const date = new Date();
        cron.schedule(`${date.getMinutes() + 1} * * * *`, async () => {
            const date = new Date();
            const dayOfTheWeek = DAYS_OF_THE_WEEK[date.getDay() - 1];
            const schedules = await procedureController.getClosestExecutedProcedures(date, dayOfTheWeek);
            schedules.forEach(item => {
                const newFunction = (itemData => {
                    const data = itemData;
                    return () => {
                        runProcedureController.runTaskBySchedule(data);
                    };
                })(item.procedure_id);

                const task = cron.schedule(
                    `${item.minute} ${item.hour} ${date.getDate()} ${date.getMonth() + 1} *`,
                    newFunction
                );

                this.runingSchedules[item.schedule_id] = task;
            });
        });
    }

    async deleteProcedureFromCron(schedule_id) {
        if (this.runingSchedules[schedule_id]) {
            this.runingSchedules[schedule_id].destroy();
        }
        return;
    }

    async addProcedureToCron(procedureId, schedule) {
        if (!scheduleService.isInHourInterval(schedule)) return;
        const newFunction = (itemData => {
            const data = itemData;
            return () => {
                runProcedureController.runTaskBySchedule(data);
            };
        })(procedureId);
        const task = cron.schedule(
            `${schedule.minute} ${schedule.hour} ${schedule.day || "*"} ${schedule.month || "*"} *`,
            newFunction
        );
        this.runingSchedules[schedule.schedule_id] = task;
    }
}

module.exports = new Schedules();
