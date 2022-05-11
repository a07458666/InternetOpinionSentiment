const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { loadCFG } = require("./utils");


function getKeywordModel(conn){
    const cfg = loadCFG();
    const Keyword = new Schema(
    {
        'keyword': {'type': String, required:true},
        'count': {'type': Number, default: 0},
        'time': {'type': Date, required:true},
    }, 
    {collection: cfg.collection_name});

    return conn.model('Keyword', Keyword);
}


module.exports = {
    'getKeywordModel': getKeywordModel
}
