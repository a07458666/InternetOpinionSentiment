const mongoose = require('mongoose');
const {getKeywordModel} = require('./keyword');
const utils = require('./utils');


function getkeyword(startTime, endTime){
    // yyyy-mm-dd
    return new Promise((resolve, reject)=>{
        let ret = utils.makeReturnTemplate();

        if(!startTime){
            ret.status = 'error';
            ret.error_msg = 'startTime must be given';
            resolve(ret);
            return;
        }

        if(!endTime){
            endTime = utils.getDateStr();
        }

        ret.status = 'normal';
        ret.query_id = 'query id not implement yet';

        utils.checkTimeFormat(startTime, asPromise=true, err_prefix='startTime error')
        .then(() => {
            return utils.checkTimeFormat(endTime, asPromise=true, err_prefix='endTime error');
        })
        .then(() => {
            const cfg = utils.loadCFG('cfg/db_cfg.json');
            mongouri = `mongodb://${cfg.usr}:${cfg.pwd}@${cfg.uri}/${cfg.database_name}?authMechanism=DEFAULT`;

            return mongoose.createConnection(mongouri , {serverSelectionTimeoutMS: 5000, socketTimeoutMS: 10000}).asPromise();
        })
        .then(async (conn) => { // Mongoose is connected
            Keyword = getKeywordModel(conn);
            
            ret.data = await Keyword.aggregate([
                {$project: {
                    Company: 1, 
                    Count: 1, 
                    date: {
                        $substr: ["$Timestamp", 0, 10]
                    }
                }},
                {$match: {date: {$gte: startTime, $lte: endTime}}},
                {$group: {"_id" : {Company: "$Company", Timestamp: "$date"}, "Count" : {"$sum" : "$Count"}}},
                {$project: {
                    _id: 0,                     // not show
                    Company: "$_id.Company",    // keyword
                    Count: 1,                   // sum(count)
                    Timestamp: "$_id.Timestamp" // yyyy-mm-dd format
                }}
            ])

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