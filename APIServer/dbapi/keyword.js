const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { loadCFG } = require("./utils");


function getKeywordModel(conn){
    const cfg = loadCFG('cfg/db_cfg.json');
    const Keyword = new Schema(
    {
        'Company': {'type': String, required:true},
        'Count': {'type': Number, default: 0},
        'Timestamp': {'type': Date, required:true},
    }, 
    {collection: cfg.collection_name});

    return conn.model('Keyword', Keyword);
}


module.exports = {
    'getKeywordModel': getKeywordModel
}
