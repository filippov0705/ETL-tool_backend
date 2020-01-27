const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");
const { Task } = require("@models/tasks");

const Procedure = sequelize.define(
    "procedure",
    {
        procedure_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        procedure_name: {
            type: Sequelize.STRING(35),
            allowNull: false,
        },
    },
    {timestamps: false}
);

module.exports = {
    Procedure,
};
