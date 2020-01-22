const {User_procedure} = require("@models/userProcedure");

class UserProcedure {
    create(userId, procedureId) {
        User_procedure.create({
            user_id: userId,
            procedure_id: procedureId,
        })
    }
}

module.exports = new UserProcedure();
