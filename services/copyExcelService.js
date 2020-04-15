const fs = require("fs");
const amazonS3Service = require("@services/amazonS3Service");
const excelService = require("@services/excelService");

const {ERROR, SUCCESS, USER_DATA_STORAGE, ALLOWED_FOLDERS, FORBIDDEN_PATH, WARNING} = require("@constants/constants");

class CopyExcelService {
    async copyExcel(task, data) {
        try {
            const folder = `${USER_DATA_STORAGE}${task.settings.to}/`;
            const fileName = task.settings["new name"];
            const isExist = fs.existsSync(folder);

            if (!isExist) {
                return {status: ERROR, description: [FORBIDDEN_PATH]};
            }

            const description = [];
            let newFileName = `${folder}${fileName}.xlsx`;

            if (typeof newFileName === "undefined") {
                return {status: ERROR, description: ["No new file name"]};
            }

            let i = 0;
            let status = SUCCESS;

            const isFileExist = fs.existsSync(`${folder}${fileName}.xlsx`);
            if (isFileExist) {
                while (true || i < 100) {
                    i++;
                    if (!fs.existsSync(`${folder}${fileName}(${i}).xlsx`)) {
                        newFileName = `${folder}${fileName}(${i}).xlsx`;
                        if (i) {
                            status = WARNING;
                            description.push(
                                `Attempt to create file: ${fileName}`,
                                `from variable: ${task.settings.from}`,
                                "File with such name already exist",
                                `New name: ${fileName}(${i})`
                            );
                        }
                        break;
                    }
                    if (i === 99) {
                        return {
                            status: ERROR,
                            description: ["To much files with name:", `${fileName}`],
                        };
                    }
                }
            }

            fs.writeFileSync(newFileName, data[task.settings.from].buffer);

            return {status, runResult: data, description: ["Created file", `in folder: ${folder}`, `as: ${fileName}`]};
        } catch (e) {
            return {status: ERROR};
        }
    }

    async copyFileFromS3(task, data) {
        const buffer = await amazonS3Service.getFileFromS3();
        const excelData = excelService.getExcelDataFromBuffer(buffer);
        excelData.name = task.name;
        data[task.settings.as] = {buffer, data: excelData};

        return {
            status: SUCCESS,
            runResult: data,
            description: ["Read file:", `${USER_DATA_STORAGE}`],
        };
    }
}

module.exports = new CopyExcelService();
