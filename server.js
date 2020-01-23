require("module-alias/register");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const procedureRouter = require("@routers/procedureRouter");
const mainRouter = require("@routers/mainRouter");
const tasksRouter = require("@routers/tasksRouter");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("common"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/procedures/", procedureRouter);
app.use("/api/main", mainRouter);
app.use("/api/tasks", tasksRouter);

app.listen(3001, () => console.log("Server has been started..."));
