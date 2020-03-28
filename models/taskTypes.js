const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const TaskTypes = sequelize.define(
    "task_types",
    {
        task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        task_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        task_settings: {
            type: Sequelize.JSON,
            allowNull: false,
        },
    },
    {freezeTableName: true, timestamps: false}
);

module.exports = {
    TaskTypes,
};
