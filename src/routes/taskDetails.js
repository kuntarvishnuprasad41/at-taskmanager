const taskRoutes = require("express").Router();
const taskData = require("../data/data.json");
const bodyParser = require("body-parser");
const writeToFile = require('../helpers/writeToFile')
const validator = require("../helpers/validator");
const {filterData,sortByPriority} = require('../helpers/filters');
const { v4: uuidv4 } = require('uuid');
const timestamp = require('time-stamp');

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
 * 
 */
taskRoutes.get("/:id", (req, res) => {
    res
        .status(200)
        .send(
            //filter type 1 is to filter by id
                filterData(req.params.id, 1)
        );

});


/**
 * Lists task by priority 
 * Method : GET
 * Endpoint /api/tasks/priority/{high or low}
 */
taskRoutes.get("/priority/:prioriy", (req, res) => {
        res.status(200).send(sortByPriority(req.params.prioriy));
    
});


/**
 * Create the task
 * Method : POST
 * Endpoint /api/tasks/
 * Params needed @task_name @task_description @task_progress @progress @priority 
 */
taskRoutes.post("/", (req, res) => {
    let reqBody = JSON.parse(JSON.stringify(req.body));

    let userRequest = new Object();
    userRequest.task_id = uuidv4();
    userRequest.task_name = reqBody.task_name;
    userRequest.task_description = reqBody.task_description;
    userRequest.priority = reqBody.priority;  
    userRequest.created_at = getTimeStamp();  
    userRequest.updated_at = getTimeStamp();


    if (validator.tasksValidation(taskData, userRequest).status) {
        let tasksDataModified = JSON.parse(JSON.stringify(taskData));
        tasksDataModified.tasks.push(userRequest);

        if(writeToFile(tasksDataModified)){
            res.status(201).send({"message":"Task added successfully","data":userRequest});
        }else {
            res.status(500).send({"message":"Something went wrong while adding the task"});
        }
        
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
    let reqBody = req.body;
    let userRequest = new Object();
    userRequest.task_id = req.params.id;
    userRequest.task_name = reqBody.task_name;
    userRequest.task_description = reqBody.task_description;
    userRequest.priority = reqBody.priority;  
    userRequest.task_status = reqBody.task_status;
    userRequest.created_at = validator.getCreatedAt(taskData,req.params.id)[0].created_at;
    userRequest.updated_at = getTimeStamp();

    let obj = new Object();

    if(validator.updateValidation(taskData,userRequest,userRequest.task_id).status){
        obj.tasks = filterData(req.params.id,2)

        

        obj.tasks.push(userRequest);
        if(writeToFile(obj)){
            res.status(201).send({"message":"task updated successfully",data:userRequest});
        }else{
            res.status(500).send({"message":"Something went wrong while updating"});
        }
    }else{
        res.status(500).send({"message":"Data Not Found"});
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

function getTimeStamp(){
    return timestamp("YYYYMMDDHHmmss")
}


module.exports = taskRoutes;
