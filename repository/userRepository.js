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

    changeUserRole(user_login, user_role) {
        return new Promise(resolve => {
            User.update({user_role}, {where: {user_login}});
            resolve();
        });
    }

    getUserRole(user_login) {
        return new Promise(resolve => {
            User.findOne({where: {user_login}}).then(role => resolve(role));
        });
    }

    deleteUser(user_login) {
        User.destroy({where: {user_login}});
    }
}

module.exports = new UserRepository();
