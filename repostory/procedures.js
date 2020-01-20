const {Sequelize} = require("sequelize");
const {sequelize} = require("../models");

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

const proceduresFind = () =>
    Procedure.findAll({raw: true})
        .then(procedures => {
            console.log(procedures);
        })
        .catch(err => console.log(err));

module.exports = {
    Procedure,
    proceduresFind,
};
