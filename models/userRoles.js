const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const UserRoles = sequelize.define(
    "role",
    {
        user_id: {
            type: Sequelize.INTEGER,
        },
        role_id: {
            type: Sequelize.INTEGER,
        },
    },
    {timestamps: false}
);

module.exports = {
    UserRoles,
};
