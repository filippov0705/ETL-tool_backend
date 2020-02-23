const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const Constant = sequelize.define(
    "constant",
    {
        constant_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        constant_value: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
    },
    {timestamps: false}
);

module.exports = {
    Constant,
};
