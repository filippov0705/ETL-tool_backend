const taskService = require("@services/taskService");
const taskServeice = require("@services/taskService");
const {ERROR} = require("@constants/constants");

class ProcedureController {
    getTasksTypes(req, res) {
        try {
            taskServeice.getTaskTypes().then(taskTypes => {
                res.status(200).send(
                    taskTypes.map(item => {
                        return {name: item.task_name, id: item.task_id, settings: item.task_settings};
                    })
                );
            });
        } catch (e) {
            res.status(404).send(JSON.stringify({message: ERROR}));
        }
    }

    mailing(req, res) {
        taskService.nodemail();
    }

    getStatistics(req, res) {
        const response = [
            {Email: "filippov0705@gmail.com", ФИО: "Иванов Иван Иванович", Оценка: 5, __rowNum__: 1},
            {Email: "filippov0705@gmail.com", ФИО: "Сидоров Петр Петрович", Оценка: 6, __rowNum__: 2},
            {Email: "filippov0705@gmail.com", ФИО: "Петров Иван Васильевич", Оценка: 4, __rowNum__: 3},
        ];
        res.send(JSON.stringify(response));
    }
}

module.exports = new ProcedureController();
