const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const Role = sequelize.define(
    "role",
    {
        role_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique: true,
        },
    },
    {timestamps: false}
);

module.exports = {
    Role,
};
