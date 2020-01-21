const {Sequelize} = require("sequelize");

const taskTypes = sequelize.define(
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
            type: Sequelize.STRING(30),
            allowNull: false,
        }
    },
    {freezeTableName: true, timestamps: false}
);