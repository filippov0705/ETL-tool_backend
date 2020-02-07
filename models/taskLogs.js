const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const TaskLog = sequelize.define(
    "task_log",
    {
        task_log_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        procedure_log_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        task_log_name: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        execution_time: {
            type: "TIMESTAMP",
            allowNull: true,
        },
    },
    {timestamps: false}
);

module.exports = {
    TaskLog,
};
