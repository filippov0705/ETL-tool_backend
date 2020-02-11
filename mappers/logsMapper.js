const moment = require("moment");

class LogsMapper {
    formatTime(log) {
        return log.map(item => {
            item.execution_time = moment(item.execution_time).format("MMMM Do YYYY, h:mm:ss a");
            return item;
        });
    }

    filterId(proceduresId) {
        return proceduresId.map(item => item.procedure_id);
    }

    orderLogs(order, logs) {
        const sortOrder = order === "From earliest" ? 1 : -1;

        logs.sort((a, b) => {
            if (new Date(a.execution_time).getTime() > new Date(b.execution_time).getTime()) return sortOrder;
            if (new Date(a.execution_time).getTime() < new Date(b.execution_time).getTime()) return -sortOrder;
        });
        return logs;
    }

    filterByName(logs, procedureName) {
        return logs.filter(item => item.name === procedureName);
    }

    getPageLogs(logs, page, logsNumber) {
        return logs.slice((page - 1) * logsNumber, logsNumber * page);
    }

    formatDate(logs) {
        return logs.map(item => {
            item.execution_time = moment(item.execution_time).format("MMMM Do YYYY, h:mm:ss a");
            return item;
        });
    }
}

module.exports = new LogsMapper();
