require('module-alias/register');

const taskServece = require("@services/taskServece");
const possibleTasksFile = "../frontend/src/mockData/possibleTasks.json";
const procedureService = require("@services/procedureService");

class ProcedureController {

    getTasksTypes(req, res) {
        try {
            console.log(JSON.stringify(procedureService.getFileFromDB(possibleTasksFile)))
            res.send(JSON.stringify(procedureService.getFileFromDB(possibleTasksFile)));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    mailing(req, res) {
        taskServece.nodemail();
    }

    getStatistics(req, res) {
        const response = [
            {Email: "filippov0705@gmail.com", ФИО: "Иванов Иван Иванович", Оценка: 5, __rowNum__: 1},
            {Email: "filippov0705@gmail.com", ФИО: "Сидоров Петр Петрович", Оценка: 6, __rowNum__: 2},
            {Email: "filippov0705@gmail.com", ФИО: "Петров Иван Васильевич", Оценка: 4, __rowNum__: 3}
        ]
        res.send(JSON.stringify(response))
    }
}

module.exports = new ProcedureController();