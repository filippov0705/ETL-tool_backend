const userRepository = require("@repository/userRepository");
const {sequelize} = require("@models/index");

class userService {
    async getAllUsers() {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const allUsers = await userRepository.getAllUsers(transaction);
            await transaction.commit();
            return allUsers;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async changeActiveness(user_id, state) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userRepository.changeActiveness(user_id, state, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async deleteUser(user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userRepository.deleteUser(user_id, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async changeUserName(user_id, user_name) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userRepository.changeUserNames(user_id, user_name, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async createUser(user_id, user_login) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userRepository.createUser(user_id, user_login, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getUserActiveness(user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const isActive = await userRepository.getUserActiveness(user_id, transaction);
            await transaction.commit();
            return isActive;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
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
