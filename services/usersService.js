const userRepository = require("@repository/userRepository");

class userServeice {
    async getAllUsers() {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }
}

module.exports = new userServeice();
