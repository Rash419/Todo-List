var express = require('express');
var router = express.Router();
var todoTaskModel = require('../models/TodoTask');
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/addTask', async (req, res, next) => {
  const todoTask = new todoTaskModel({
    content: req.body.content
  });
  console.log(req.body.content);
  try {
    await todoTask.save();
    res.redirect('/');
  }
  catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
