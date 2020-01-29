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
}

module.exports = new UserRepository();
