require('module-alias/register');

const { User } = require("@models/user");
const { Procedure } = require("@models/procedures");
const { User_procedure } = require("@models/userProcedure");
const { Op } = require("sequelize");

const fs = require("fs");

class ProcedureService {
    getFileFromDB(file) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
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
        //                 if(!user_procedure) return;
        //                 const up = user_procedure.map(item => item.dataValues.procedure_id);
        //                 Procedure.findAll({where: {[Op.or]: up.map(item => {
        //                             return {procedure_id: item};
        //                         })}})
        //                     .then(procedure => {
        //                         console.log(procedure.map(item => item.dataValues));
        //                     })
        //             })
        //     });
        User.findOne({where: {user_login: "first_admin"}})
            .then(user => {
                if (!user) return;

                Procedure.findOne({where: {procedure_name: "Show marks"}})
                    .then(procedure => {
                        if(!procedure) return;
                        // console.log(procedure.procedure_id)
                        user.addProcedure(procedure, {through:{grade:1}});
                    });
                // console.log(user.getProcedure())
                // user.getProcedure().then(procedures => {
                //     for (procedure of procedures) {
                //         console.log(procedure_name)
                //     }
                // })
            });
    }

}

module.exports = new ProcedureService();