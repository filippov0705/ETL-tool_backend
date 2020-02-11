const xl = require("excel4node");
const fs = require("fs");

const {ERROR, SUCCESS, USER_DATA_STORAGE, ALLOWED_FOLDERS, FORBIDDEN_PATH, WARNING} = require("@constants/constants");

class CopyExcelService {
    async copyExcel(task, data) {
        try {
            const wb = new xl.Workbook();
            const description = [];
            if (!ALLOWED_FOLDERS.includes(task.settings.to.split("/")[0])) {
                return {status: ERROR, description: [FORBIDDEN_PATH]};
            }

            let newFileName;
            let i = 0;
            let status = SUCCESS;

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
            console.log(e);
            return {status: ERROR};
        }
    }
}

module.exports = new CopyExcelService();
