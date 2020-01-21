const taskService = require("@services/taskService");
const procedureService = require("@services/procedureService");

const possibleTasksFile = "./mockData/possibleTasks.json";

class ProcedureController {
    getTasksTypes(req, res) {
        try {
            res.status(200).send(JSON.stringify(procedureService.getFileFromDB(possibleTasksFile)));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
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
