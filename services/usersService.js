const userRepository = require("@repository/userRepository");

class userServeice {
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
}

module.exports = new userServeice();
