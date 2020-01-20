const Sequelize = require("sequelize");

const sequelize = new Sequelize("internship-project", "postgres", "1234567", {
    dialect: "postgres",
    host: "localhost"
});

module.exports = {
    sequelize
}