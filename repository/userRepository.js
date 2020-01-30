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

    findUser(user_id) {
        return User.findByPk(user_id);
    }
}

module.exports = new UserRepository();
