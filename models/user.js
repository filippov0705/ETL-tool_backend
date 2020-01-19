require('module-alias/register');

const { Sequelize } = require('sequelize');
const { sequelize } = require("./index");

const User = sequelize.define("user", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_login: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    user_name : {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    user_role: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
}, {timestamps: false});

const User_procedure = sequelize.define("users_procedures", {
    user_id: {
        type: Sequelize.INTEGER,
    },
    procedure_id: {
        type: Sequelize.INTEGER,
    }
}, {freezeTableName: true, timestamps: false});

User_procedure.removeAttribute('id');

const user_procedure = () => User_procedure.findAll({raw:true}).then(users=>{
    console.log(users);
}).catch(err=>console.log(err));


const usersFind = () => User.findAll({raw:true}).then(users=>{
    console.log(users);
}).catch(err=>console.log(err));

const sync = () => {
    sequelize.sync().then(()=>{

        console.log("Tables have been created");
    }).catch(err=>console.log(err));
};

module.exports = {
    User
}