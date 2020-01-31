const rolesService = require("@services/rolesService");

class RolesController {
    async getRoles(req, res) {
        try {
            const roles = await rolesService.getPossibleRoles();
            res.status(200).send(roles);
        } catch (e) {
            res.status(400).send({message: "Error"});
        }
    }

    async addRole(req, res) {
        try {
            const {id, role} = req.body;
            await rolesService.addRole(id, role);
        } catch (e) {
            res.status(400).send({message: "Error"});
        }
    }
}

module.exports = new RolesController();
