const {Sequelize} = require("sequelize");
const {sequelize} = require("../models");

const User = sequelize.define(
    "user",
    {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_login: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        user_name: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        user_role: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
    },
    {timestamps: false}
);

module.exports = {
    User,
};
