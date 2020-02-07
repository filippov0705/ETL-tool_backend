const {User} = require("@models/user");

class UserRepository {
    createUser(user_id, user_login, transaction) {
        return User.create(
            {
                user_id: user_id,
                user_login: user_login,
                user_name: user_login,
                is_active: false,
            },
            {transaction}
        );
    }

    async findUser(user_id, transaction) {
        const userData = await User.findOne({where: {user_id}, transaction});
        return userData;
    }

    async deleteUser(user_login, transaction) {
        await User.destroy({where: {user_login}, transaction});
        return;
    }

    async getAllUsers(transaction) {
        const allUsers = await User.findAll({raw: true, transaction});
        return allUsers;
    }

    async getUserActiveness(user_id, transaction) {
        const userData = await User.findOne({where: {user_id}, transaction});
        return userData.dataValues.is_active;
    }

    async changeActiveness(user_id, state, transaction) {
        await User.update({is_active: state}, {where: {user_id}, transaction});
    }

    async deleteUser(user_id) {
        await User.destroy({where: {user_id}});
    }

    async changeUserNames(user_id, user_name, transaction) {
        await User.update({user_name}, {where: {user_id}, transaction});
    }
}

module.exports = new UserRepository();
