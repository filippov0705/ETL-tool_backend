const taskRepository = require("@repository/taskRepository");
const {ERROR} = require("@constants/constants");

class ProcedureParametersController {
    async getProcedureTasks(req, res, next) {
        try {
            const { procedureId } = req.params;
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureParametersController();
