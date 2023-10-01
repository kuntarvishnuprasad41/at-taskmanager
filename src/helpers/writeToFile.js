
const fs = require("fs");
const path = require("path");

function writeToFile(newData){
    let writePath = path.join(__dirname,"../data","data.json");

    let status = fs.writeFile(writePath,JSON.stringify(newData),{encoding:"utf-8",flag:"w"},(err, data) => {
        return !(err);
    });

    return !(status);
}


module.exports = writeToFile;