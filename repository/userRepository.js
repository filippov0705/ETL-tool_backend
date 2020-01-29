const {User} = require("@models/user");
const {TRAINEE} = require("@constants/constants");

class UserRepository {
    createUser(user_id, user_login) {
        return User.create({
            user_id: user_id,
            user_login: user_login,
            user_name: user_login,
            user_role: TRAINEE,
        });
    }

    async findUser(user_id) {
        const userData = await User.findByPk(user_id);
        return userData;
    }

    async changeUserRole(user_login, user_role) {
        await User.update({user_role}, {where: {user_login}});
        return;
    }

    async getUserRole(user_login) {
        const role = await User.findOne({where: {user_login}});
        return role;
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
