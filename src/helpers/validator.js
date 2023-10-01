class validator {
    static tasksValidation(tasksData, userRequest) {
        if (
            userRequest.hasOwnProperty("task_id") &&
            userRequest.hasOwnProperty("task_name") &&
            userRequest.hasOwnProperty("task_description") &&
            this.isTasksIdUnique(tasksData, userRequest)
        ) {
            return {
                status: true,
                message: "Data added successfully ",
            };
        } else if (!this.isTasksIdUnique(tasksData, userRequest)) {
            return {
                status: false,
                message: "ID already exists",
            };
        } else {
            return {
                status: false,
                message: "All data not mentioned",
            };
        }
    }

    static isTasksIdUnique(tasksData, userRequest) {
        let isIdFound = tasksData.tasks.some(
            (ind) => ind.task_id === userRequest.task_id
        );
        return !(isIdFound);
    }

    static updateValidation(taskData,userRequest,task_id) {
        if (
            userRequest.hasOwnProperty("task_name") &&
            userRequest.hasOwnProperty("task_description") &&
            userRequest.hasOwnProperty("task_status") &&
            userRequest.hasOwnProperty("priority") &&
            this.isTaskExists(taskData,task_id)
        ) {
            return {
                status: true,
                message: "Updated successfuly",
            };
        } else
            return {
                status: false,
                message: "Invalid Data",
            };
    }

    static isTaskExists(tasksData, userRequest) {
        let isIdFound = tasksData.tasks.some(
            (ind) => ind.task_id === userRequest.task_id
        );
        return !isIdFound.size;
    }

    static getCreatedAt(taskData,task_id){
        let task = taskData.tasks.filter((data)=> data.task_id == task_id);
        return task;
    }
}

module.exports = validator;
