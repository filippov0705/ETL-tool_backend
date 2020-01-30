const {User} = require("@models/user");

class UserRepository {
    createUser(user_id, user_login) {
        return User.create({
            user_id: user_id,
            user_login: user_login,
            user_name: user_login,
        });
    }

    async findUser(user_id) {
        const userData = await User.findByPk(user_id);
        return userData;
    }

    async deleteUser(user_login) {
        await User.destroy({where: {user_login}});
        return;
    }

    async getAllUsers() {
        const allUsers = await User.findAll({raw: true});
        return allUsers;
    }
}

module.exports = new UserRepository();
