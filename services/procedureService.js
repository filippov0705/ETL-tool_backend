const {User} = require("@models/user");
const {Procedure} = require("@models/procedures");
const {User_procedure} = require("@models/userProcedure");
const {Op} = require("sequelize");

const fs = require("fs");

class ProcedureService {
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }

    setFileToDB(file, data) {
        return fs.writeFileSync(file, JSON.stringify(data));
    }

    readUsersFromDB() {
        // User.findOne({where: {user_login: "first_admin"} })
        //     .then(user => {
        //         if (!user) return;
        //         User_procedure.findAll({where: {user_id: user.user_id}})
        //             .then(user_procedure => {
        //             console.log(user_procedure)
        //             })
        //     });
        // User.findOne({where: {user_login: "first_admin"}}).then(user => {
        //     if (!user) return;
        //
        //     Procedure.findOne({where: {procedure_name: "Show marks"}}).then(procedure => {
        //         if (!procedure) return;
        //         // console.log(procedure.procedure_id)
        //         user.addProcedure(procedure, {through: {grade: 1}});
        //     });
        //     // console.log(user.getProcedure())
        //     // user.getProcedure().then(procedures => {
        //     //     for (procedure of procedures) {
        //     //         console.log(procedure_name)
        //     //     }
        //     // })
        // });
        // User.findOne({where: {user_login: "first_admin"}})
        //     .then(user=>{
        //         if(!user) return;
        //         user.getProcedures().then(procedures=>{
        //             // for(course of courses){
        //             //     if(course.name==="JavaScript") course.enrolment.destroy();
        //             // }
        //             //     for()
        //             console.log(procedures.map(item => item.dataValues))
        //         });
        //     });
    }
}

module.exports = new ProcedureService();
