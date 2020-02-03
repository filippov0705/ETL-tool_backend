const {Constant} = require("@models/constant");

class ConstantRepository {
    async getConstantId(constant_value) {
        const constantId = await Constant.findOne({where: {constant_value}, attributes: ["constant_id"]});
        return constantId.dataValues.constant_id;
    }
}

module.exports = new ConstantRepository();
