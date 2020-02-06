const {Constant} = require("@models/constant");

class ConstantRepository {
    async getConstantId(constant_value, transaction) {
        const constantId = await Constant.findOne({where: {constant_value}, attributes: ["constant_id"], transaction});
        return constantId.dataValues.constant_id;
    }

    async getConstantName(constant_id, transaction) {
        const name = await Constant.findOne({where: {constant_id}, attributes: ["constant_value"], transaction});
        return name.dataValues.constant_value;
    }
}

module.exports = new ConstantRepository();
