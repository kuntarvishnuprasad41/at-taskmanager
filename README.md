# Assignment01 - Taskmanager# at-taskmanager

This API is used to perform CRUD operations on tasks

The generat format of tasksList is as follows 
```
    {
        "task_id : 1
        "task_name": "Redd1is {{task_id}}",
        "task_description": "Learn Reddis",
        "task_status": "WIP",
        "priority": 0,
        "created_at" : "",
        "updated-at" : ""
}
```

## APIs

### GET : Tasks
- This api will list all the tasks stored in the file
  ENDPOINT : ``` /api/tasks ```

### GET : Tasks by ID
- This api will fetch task by id
  ENDPOINT : ``` /api/tasks/task_id ```

### POST : Tasks
- This API is responsible for Creating the tasks
  ENDPOINT : ``` /api/tasks ```

### PUT : Tasks
- API responsible for updating the tasks
  ENDPOINT : ``` /api/tasks/task_id ```

### DELETE : Tasks
- API responsible for deleting the tasks
  ENDPOINT : ``` /api/tasks/task_id ```

### GET : PRIORITY
It fetches the list on "from - to " basis, i.e, if high selected, High to low else vise versa
Priorities available 
- [x] High
- [x] Low
- [ ] Medium 
ENDPOINT : ``` /api/tasks/priority/highorlow ```


## Additional submission
Please find the Postman Automation scripts written to test the API [ here ](https://www.postman.com/kuvi41/workspace/airtribe/collection/16136793-3ff24ec9-6fd9-405b-b2cb-82cc7315f8d8?action=share&creator=16136793&active-environment=16136793-b2e7e951-ad46-4585-8e5b-b27ddc05e0bc)

##### Note: To find the scripts, Select any API, go to pre-req scripts and test scripts

Please find the API Documentation [here](https://documenter.getpostman.com/view/16136793/2s9YJXZkNg)



