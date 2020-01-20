const {Sequelize} = require("sequelize");
const {Procedure} = require("@repostory/procedures");
const {User} = require("@repostory/user");
const {sequelize} = require("../models");

const User_procedure = sequelize.define(
    "users_procedures",
    {
        user_id: {
            type: Sequelize.INTEGER,
        },
        procedure_id: {
            type: Sequelize.INTEGER,
        },
    },
    {freezeTableName: true, timestamps: false}
);

User_procedure.removeAttribute("id");
User.belongsToMany(Procedure, {
    through: "users_procedures",
    as: "procedures",
    foreignKey: "user_id",
    otherKey: "procedure_id",
});
Procedure.belongsToMany(User, {
    through: "users_procedures",
    as: "users",
    foreignKey: "procedure_id",
    otherKey: "user_id",
});

module.exports = {
    User_procedure,
};
