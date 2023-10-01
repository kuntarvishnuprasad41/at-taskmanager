const timestamp = require('time-stamp')

function getTimeStamp() {
    return timestamp("YYYYMMDDHHmmss")
}


module.exports = getTimeStamp