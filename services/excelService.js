const XLSX = require("xlsx");

class ExcelService {
    getExcelDataFromBuffer(buffer) {
        const result = {};
        const workbook = XLSX.read(buffer);
        const data = workbook.Sheets[Object.keys(workbook.Sheets)[0]];
        Object.keys(data).forEach(item => {
            if(data[item].v) result[item] = data[item].v;
        });
        return result;
    }
}

module.exports = new ExcelService();