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
        year: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        month: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        day: {
            type: Sequelize.INTEGER,
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
    },
    {timestamps: false}
);

module.exports = {
    Schedule,
};