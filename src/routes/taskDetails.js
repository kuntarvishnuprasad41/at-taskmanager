const taskRoutes = require("express").Router();
const taskData = require("../tasks.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const validator = require("../helpers/validator");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());



/**
 *  This API lists all the tasks
 *  Method : GET
 *  Endpoint /api/tasks
 */
taskRoutes.get("/", (req, res) => {
    res.status(200).send(taskData.tasks);
});


/**
 *  Lists task by id 
 *  Method : GET
 *  Endpoint /api/tasks/id
 */
taskRoutes.get("/:id", (req, res) => {
    res
        .status(200)
        .send(
            JSON.stringify(
                taskData.tasks.filter((tasks) => tasks.task_id == req.params.id)
            )
        );

});


/**
 * Lists task by priority 
 * Method : GET
 * Endpoint /api/tasks/priority/{high or low}
 */
taskRoutes.get("/priority/:prioriy", (req, res) => {
    let priority = req.params.prioriy;
    if (priority == "low") {
        let data = taskData.tasks.sort(function (a, b) {
            return b.priority - a.priority;
        });
        res.status(200).send(data);
    } else if (priority == "high") {
        let data = taskData.tasks.sort(function (a, b) {
            return a.priority - b.priority;
        });
        res.status(200).send(data);
    }
});


/**
 * Create the task
 * Method : POST
 * Endpoint /api/tasks/
 * Params needed @task_name @task_description @task_progress @progress @priority 
 */
taskRoutes.post("/", (req, res) => {
    let userRequest = req.body;
    let writePath = path.join(__dirname, "..", "tasks.json");
    if (validator.tasksValidation(taskData, userRequest).status) {
        let tasksDataModified = JSON.parse(JSON.stringify(taskData));
        tasksDataModified.tasks.push(userRequest);

        fs.writeFile(writePath, JSON.stringify(tasksDataModified), { encoding: 'utf8', flag: 'w' }, (err, data) => {
            if (err) {
                return res.status(500).send("Something went wrong while adding");
            } else {
                return res.status(201).send(validator.tasksValidation(taskData, userRequest).message);
            }
        });
        
    } else {
        res.status(500).send(validator.tasksValidation(taskData, userRequest));
    }
});


/**
 * Update the task
 * Method : PUT
 * Endpoint /api/tasks/task_id
 * Params needed @task_name @task_description @task_progress @progress @priority 
 */
taskRoutes.put("/:id", (req, res) => {
    let userRequest = req.body;
    let writePath = path.join(__dirname, "..", "tasks.json");
    let obj = new Object();
    obj.tasks = JSON.parse(
        JSON.stringify(
            taskData.tasks.filter((tasks) => tasks.task_id != req.params.id)
        )
    );



    obj.tasks.push(userRequest);
    if (validator.updateValidation(userRequest)) {

        fs.writeFile(writePath, JSON.stringify(obj), {
            encoding: "utf-8",
            flag: "w",
        },
            (err, data) => {
                if (err) {
                    return res.status(500).send("Something went wrong while updating the task");
                } else {
                    return res.status(201).send(validator.tasksValidation(userProvidedDetails).message);
                }
            }
        );
        let message = new Object();
        message.message = "Updated successfully"
        message.body = obj
        res.status(200).send(message);
    }
});


/**
 * Delete the task
 * Method : DELETE
 * Endpoint /api/tasks/task_id
 */
taskRoutes.delete("/:id", (req, res) => {
    let obj = new Object();
    obj.tasks = JSON.parse(
        JSON.stringify(
            taskData.tasks.filter((tasks) => tasks.task_id != req.params.id)
        )
    );
    let writePath = path.join(__dirname, "..", "tasks.json");
    fs.writeFile(writePath, JSON.stringify(obj), {
        encoding: "utf-8",
        flag: "w",
    },
        (err, data) => {
            if (err) {
                return res.status(500).send("Something went wrong while deleting the task");
            } else {
                return res.status(201).send(validator.tasksValidation(userProvidedDetails).message);
            }
        }
    );
    res.status(200).send(obj);
});

module.exports = taskRoutes;
