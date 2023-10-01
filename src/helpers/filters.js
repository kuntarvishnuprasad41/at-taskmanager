const tasksData = require('../data/data.json');

//filter type 1 is to filter by id

function filterData(task_id,type){
    switch(type){
       case 1 : return tasksData.tasks.filter((data)=> data.task_id === task_id); 
       case 2 : return tasksData.tasks.filter((data)=> data.task_id != task_id);
       default : return null
    }
    
}

function sortByPriority(priority){

    if(priority == "high"){
        return tasksData.tasks.sort(function (a, b) {
            return b.priority - a.priority;
        });
    }else if(priority =="low"){
        return tasksData.tasks.sort(function (a, b) {
            return a.priority - b.priority;
        });
    }
}

module.exports = {filterData,sortByPriority};