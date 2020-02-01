const userRepository = require("@repository/userRepository");

class userServeice {
    async getAllUsers() {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }

    async changeActiveness(user_id, state) {
        await userRepository.changeActiveness(user_id, state);
    }
}

module.exports = new userServeice();
