const userRepository = require("@repository/userRepository");
const procedureRepository = require("@repository/procedureRepository");

class CreateProcedureService {
    createProcedure(userId, procedureName, procedureId) {
        return new Promise(resolve => {
            procedureRepository.create(userId, procedureId, procedureName);
        });
    }
}

module.exports = new CreateProcedureService();
