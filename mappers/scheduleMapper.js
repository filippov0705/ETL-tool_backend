const constantsService = require("@services/constantsService");

const {SINGLE} = require("@constants/constants");

class ScheduleMapper {
    async transformScheduleData(schedulesData) {
        const schedule = await Promise.all(
            schedulesData.map(async item => {
                item.periodicity = await constantsService.getConstant(item.periodicity);
                if (item.periodicity === SINGLE) {
                    item.year = new Date(item.date).getFullYear();
                    item.day = new Date(item.date).getDate();
                    item.month = new Date(item.date).getMonth() + 1;
                }
                return item;
            })
        );
        return schedule;
    }
}

module.exports = new ScheduleMapper();
