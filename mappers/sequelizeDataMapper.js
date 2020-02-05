class SequelizeDataMapper {
    getFieldFromArray(field, array) {
        return array.map(item => {
            return item[field];
        });
    }
}

module.exports = new SequelizeDataMapper();
