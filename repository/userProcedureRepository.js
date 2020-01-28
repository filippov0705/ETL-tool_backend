const {User_procedure} = require("@models/userProcedure");

class UserProcedure {
    async create(userId, procedureId) {
        await User_procedure.create({
            user_id: userId,
            procedure_id: procedureId,
        });
    }
}

module.exports = new UserProcedure();
