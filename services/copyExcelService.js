const xl = require("excel4node");
const fs = require("fs");

const {ERROR, SUCCESS, USER_DATA_STORAGE, ALLOWED_FOLDERS, FORBIDDEN_PATH, WARNING} = require("@constants/constants");

class CopyExcelService {
    async copyExcel(task, data) {
        try {
            const isExist = fs.existsSync(`${USER_DATA_STORAGE}${task.settings.to.split("/")[0]}`);
            if (!isExist) {
                return {status: ERROR, description: [FORBIDDEN_PATH]};
            }

            const wb = new xl.Workbook();
            const description = [];

            let newFileName = `${USER_DATA_STORAGE}${task.settings.to}.xlsx`;
            let i = 0;
            let status = SUCCESS;

            const isFileExist = fs.existsSync(`${USER_DATA_STORAGE}${task.settings.to}.xlsx`);
            if (isFileExist) {
                while (true || i < 100) {
                    i++;
                    if (!fs.existsSync(`${USER_DATA_STORAGE}${task.settings.to}(${i}).xlsx`)) {
                        newFileName = `${USER_DATA_STORAGE}${task.settings.to}(${i}).xlsx`;
                        if (i) {
                            status = WARNING;
                            description.push(
                                "File with such name already exist",
                                `New name: ${task.settings.to.split("/")[1]}(${i})`
                            );
                        }
                        break;
                    }
                    if (i === 99) {
                        return {
                            status: ERROR,
                            description: ["To much files with name:", `${task.settings.to.split("/")[1]}`],
                        };
                    }
                }
            }

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
            wb.write(newFileName);
            return {status, runResult: data, description};
        } catch (e) {
            return {status: ERROR};
        }
    }
}

module.exports = new CopyExcelService();
