const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");
const {Role} = require("@models/roles");
const {User} = require("@models/user");

const UserRoles = sequelize.define(
    "users_roles",
    {
        user_id: {
            type: Sequelize.INTEGER,
        },
        role_id: {
            type: Sequelize.INTEGER,
        },
    },
    {freezeTableName: true, timestamps: false}
);

UserRoles.removeAttribute("id");
User.belongsToMany(Role, {
    through: "users_roles",
    as: "roles",
    foreignKey: "user_id",
    otherKey: "role_id",
});
Role.belongsToMany(User, {
    through: "users_roles",
    as: "roles",
    foreignKey: "role_id",
    otherKey: "user_id",
});

module.exports = {
    UserRoles,
};
