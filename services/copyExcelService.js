const xl = require("excel4node");

const {ERROR, SUCCESS, USER_DATA_STORAGE, ALLOWED_FOLDERS} = require("@constants/constants");

class CopyExcelService {
    async copyExcel(task, data) {
        try {
            const wb = new xl.Workbook();
            if (!ALLOWED_FOLDERS.includes(task.settings.to.split("/")[0]))
                return {status: ERROR, description: "Forbidden path"};

            if (!data[task.settings.from]) return {status: "Warning", runResult: data, description: ["No value"]};

            const ws = wb.addWorksheet(task.settings.from[0].name);
            const style = wb.createStyle({
                font: {
                    color: "#000000",
                    size: 9,
                },
                numberFormat: "###; (###); -",
            });

            data[task.settings.from][0].data.forEach((item, row) => {
                item.forEach((item, column) => {
                    return ws
                        .cell(row + 1, column + 1)
                        [typeof item](item)
                        .style(style);
                });
            });
            wb.write(`${USER_DATA_STORAGE}${task.settings.to}.xlsx`);
            return {status: SUCCESS, runResult: data};
        } catch (e) {
            return {status: ERROR};
        }
    }
}

module.exports = new CopyExcelService();
