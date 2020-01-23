const {User} = require("@models/user");

class UserRepository {
    createUser(user_id, user_login) {
        User.create({
            user_id: user_id,
            user_login: user_login,
            user_name: user_login,
            user_role: "trainee",
        });
    }
    findUser(user_id) {
        return new Promise(resolve => {
            User.findByPk(user_id).then(user => resolve(user));
        });
    }

}

module.exports = new UserRepository();
