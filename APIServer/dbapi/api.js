const mongoose = require('mongoose');
const {getKeywordModel} = require('./keyword');
const utils = require('./utils');


function getkeyword(startTime, endTime){
    return new Promise((resolve, reject)=>{
        if(!endTime){
            endTime = Date.now();
        }
    
        let ret = utils.makeReturnTemplate();
        const cfg = utils.loadCFG();
    
        ret.status = 'normal'
        ret.query_id = 'query id not implement yet';
    
        mongouri = `mongodb://${cfg.usr}:${cfg.pwd}@${cfg.uri}/${cfg.database_name}?authMechanism=DEFAULT`

        mongoose.createConnection(mongouri , {serverSelectionTimeoutMS: 5000, socketTimeoutMS: 10000}).asPromise()
        .then(async (conn) => { // Mongoose is connected
            Keyword = getKeywordModel(conn);
            // go through all data
            const cursor = Keyword.where('time').gte(startTime).lte(endTime).cursor();
            for (let data = await cursor.next(); data != null; data = await cursor.next()) {
                ret.data.push(data);
            }
    
            conn.close();
        })
        .catch(err =>{
            ret.status      = 'error';
            ret.error_msg   = err;
    
            console.log('[error]query_id: ', ret.query_id);
            console.log(Date.now().toString(), 'getkeyword error: ' + err);
        })
        .then(() => {
            resolve(ret);
        });
    });
}

module.exports = {
    'getkeyword': getkeyword
}