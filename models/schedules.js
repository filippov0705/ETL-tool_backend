const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const Schedule = sequelize.define(
    "schedule",
    {
        schedule_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        procedure_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        monday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        tuesday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        wednsday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        thursday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        friday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        saturday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        sunday: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        hour: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        minute: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        periodicity: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {timestamps: false}
);

module.exports = {
    Schedule,
};
