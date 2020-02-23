const {User_procedure} = require("@models/userProcedure");

class UserProcedure {
    async create(user_id, procedure_id, transaction) {
        await User_procedure.create({user_id, procedure_id}, {transaction});
    }

    async getProceduresId(user_id, transaction) {
        const procedureId = await User_procedure.findAll({
            attributes: ["procedure_id"],
            where: {user_id},
            raw: true,
            transaction,
        });
        return procedureId;
    }
}

module.exports = new UserProcedure();
