const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const ProcedureLog = sequelize.define(
    "procedure_log",
    {
        procedure_log_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        procedure_id: {
            type: Sequelize.INTEGER,
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
    ProcedureLog,
};
