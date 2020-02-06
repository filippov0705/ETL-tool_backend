require("module-alias/register");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const procedureRouter = require("@routers/procedureRouter");
const authorizationRouter = require("@routers/authorizationRouter");
const tasksRouter = require("@routers/tasksRouter");
const usersRouter = require("@routers//usersRouter");
const authenticationRouter = require("@routers/authenticationRouter");
const schedules = require("@schedules/index");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("common"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/procedures", procedureRouter);
app.use("/api/authorization", authorizationRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/authentication", authenticationRouter);
app.use("/api/users", usersRouter);

schedules.getSchedulesFromBD();

app.listen(3001, () => console.log("Server has been started..."));
