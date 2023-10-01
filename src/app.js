const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const tasksDetails = require("./routes/taskDetails");
const dotenv = require('dotenv').config();



const app = express();

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;  

app.get("/", (req, res) => {
    res.status(200).send("<h2>Taskmanager Assignment </h2>");
});

routes.use("/api/tasks", tasksDetails);  // Best practice to start with /api/

app.listen(PORT, (error) => {
    if (!error)
        console.log(
            "Server is Successfully Running and App is listening on port " + PORT
        );
    else console.log("Error occurred, server can't start", error);
});
