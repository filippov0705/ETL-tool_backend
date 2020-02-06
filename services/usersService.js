const userRepository = require("@repository/userRepository");
const {sequelize} = require("@models/index");

class userService {
    async getAllUsers() {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }

    async changeActiveness(user_id, state) {
        await userRepository.changeActiveness(user_id, state);
    }

    async deleteUser(user_id) {
        await userRepository.deleteUser(user_id);
    }

    async changeUserName(user_id, user_name) {
        await userRepository.changeUserNames(user_id, user_name);
    }

    async findUser(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await userRepository.findUser(id, transaction);
            await transaction.commit();
            return user;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new userService();
