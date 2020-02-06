const {User_procedure} = require("@models/userProcedure");

class UserProcedure {
    async create(user_id, procedure_id, transaction) {
        await User_procedure.create({user_id, procedure_id}, {transaction});
    }
}

module.exports = new UserProcedure();
