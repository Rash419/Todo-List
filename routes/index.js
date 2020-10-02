var express = require('express');
var router = express.Router();
var todoTaskModel = require('../models/TodoTask');
/* GET home page. */

router.get('/',function(req,res,next){
    res.render('login');
});

/*router.get('/', function (req, res, next) {
  todoTaskModel.find({},(err,tasks) => {
    if(err) { return next(err) };
    res.render('index',{todotask : tasks});
  });
});

router.post('/addTask', async (req, res, next) => {
  console.log(req.body);
  const todoTask = new todoTaskModel({
    content: req.body.content,
  });

  try {
    await todoTask.save();
    res.redirect('/');
  }
  catch (err) {
    res.redirect('/');
  }
});

router.get("/edit/:id",(req,res,next) => {
  const id = req.params.id;
  todoTaskModel.find({},function(err,tasks){
    if(err) {return next(err)}
    res.render("indexEdit",{todotask : tasks,idTask : id});
  })
})

router.post("/edit/:id",(req,res,next) => {
  todoTaskModel.findByIdAndUpdate(req.params.id,{content : req.body.content}, err => {
    if(err) {return next(err)}
    res.redirect("/");
  })
})

router.get("/remove/:id",(req,res,next) => {
  todoTaskModel.findByIdAndRemove(req.params.id, err=> {
    if(err) {return next(err)}
    res.redirect("/");
  })
})
/*router.post('/addTask',function(req,res,next){
  console.log('post method');
})*/

module.exports = router;
