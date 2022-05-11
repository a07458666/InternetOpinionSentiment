var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../dbapi/api');


/* GET home page. */
router.use(bodyParser.json());

router.get('/getkeyword', function(req, res, next) {
  res.json({
    'error': 'Time interval was not given'
  });
});

router.get('/getkeyword/:startTime', function(req, res, next) {
  db.getkeyword(req.params.startTime, null).then(ret => {res.json(ret);});
});

router.get('/getkeyword/:startTime/:endTime', function(req, res, next) {
  db.getkeyword(req.params.startTime, req.params.endTime).then(ret => {res.json(ret);});
});

module.exports = router;
