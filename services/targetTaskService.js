const procedureService = require("@services/procedureService");
const taskService = require("@services/taskService");
const scheduleMapper = require("@mappers/scheduleMapper");
const taskMapper = require("@mappers/taskMapper");
const scheduleService = require("@services/scheduleService");
const constantsService = require("@services/constantsService");

class TargetTaskService {
    async getTargetProcedure(procedure_id) {
        const procedureData = await procedureService.findProcedure(procedure_id);
        const tasksData = await taskService.findTasks(procedureData.dataValues.procedure_id);
        const tasks = taskMapper.normalizeTasksForProcedure(tasksData);
        const schedulesData = await scheduleService.getSchedules(procedure_id);
        const scheduleDataFormatted = await Promise.all(
            schedulesData.map(async item => {
                item.periodicity = await constantsService.getConstant(item.periodicity);
                return item;
            })
        );

        const schedule = scheduleMapper.transformScheduleData(scheduleDataFormatted);
        const procedure = {
            name: procedureData.dataValues.procedure_name,
            id: procedureData.dataValues.procedure_id,
            schedule,
            tasks,
        };
        return procedure;
    }
}

module.exports = new TargetTaskService();
