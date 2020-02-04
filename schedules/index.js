const cron = require("node-cron");
const procedureController = require("@controllers/procedureController.js");

const {DAYS_OF_THE_WEEK} = require("@constants/constants");

module.exports = cron.schedule(" 10,20,30,40,50 1-59 * * * *", () => {
    console.log("running a task every minute");
    const date = new Date();
    const dayOfTheWeek = DAYS_OF_THE_WEEK[date.getDay() - 1];
    procedureController.getClosestExecutedProcedures(date, dayOfTheWeek);
});
