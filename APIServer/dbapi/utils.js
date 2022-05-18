const fs = require('fs');


function loadCFG(path){
    if(!path) return false;
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
}

function makeReturnTemplate(){
    return {
        'status': null, // normal | error
        'error_msg': null, // null | str
        'data' : [],
        'query_id': null
    }
}

function getDateStr(date) {
    var d = new Date(date? date: Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function checkTimeFormat(time, asPromise=false, err_prefix='err'){
    function __check(time){
        if(typeof time === 'string'){
            return time.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) != null;
        }else{
            return false;
        }
    }

    if(asPromise){
        return new Promise((resolve, reject)=>{
            if(__check(time))resolve();
            else{
                reject(`${err_prefix}: format is not yyyy-mm-dd`);
            }
        });
    }
    else{
        return __check(time);
    }
}

module.exports = {
    'loadCFG': loadCFG,
    'makeReturnTemplate': makeReturnTemplate,
    'checkTimeFormat': checkTimeFormat,
    'getDateStr': getDateStr
}
