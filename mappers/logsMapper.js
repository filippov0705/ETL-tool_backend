class LogsMapper {
    getLogsFromArray(arr) {
        return arr.map(item => item.status);
    }

    filterLogs(procedureLogs) {
        const result = [];
        procedureLogs.forEach(item => {
            result.push(...item);
        });
        return result;
    }
}

module.exports = new LogsMapper();
