var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../dbapi/api');


/* GET home page. */
router.use(bodyParser.json());

router.get('/getkeyword', function(req, res) {
  startTime = req.query.startTime;
  endTime = req.query.endTime;

  db.getkeyword(startTime, endTime).then(ret => {
    if(ret.status=='error'){
      res.status(200).json(ret);
    }
    else{
      res.json(ret);
    }
  });
});

module.exports = router;
