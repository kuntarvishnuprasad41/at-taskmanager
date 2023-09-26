class validator {
  static tasksValidation(tasksData, userRequest) {
    if (
      userRequest.hasOwnProperty("task_id") &&
      userRequest.hasOwnProperty("task") &&
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
    if (isIdFound) return false;
    return true;
  }

  static updateValidation(userRequest) {
    if (
      userRequest.hasOwnProperty("task_id") &&
      userRequest.hasOwnProperty("task") &&
      userRequest.hasOwnProperty("task_description")
    ) {
      return {
        status: true,
        message: "Update successfuly",
      };
    } else
      return {
        status: false,
        message: "Invalid Data",
      };
  }
}

module.exports = validator;
