var express = require('express');
var router = express.Router();
var todoTaskModel = require('../models/TodoTask');
/* GET home page. */




/*router.get('/:id', function (req, res, next) {
  
  todoTaskModel.findById({},(err,tasks) => {
    if(err) { return next(err) };
    res.render('index',{todotask : tasks});
  });
});

router.post('/user/:id/addTask', async (req, res, next) => {
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

router.get("/user/:id/edit/:id",(req,res,next) => {
  const id = req.params.id;
  todoTaskModel.find({},function(err,tasks){
    if(err) {return next(erSr)}
    res.render("indexEdit",{todotask : tasks,idTask : id});
  })
})

router.post("/user/:id/edit/:id",(req,res,next) => {
  todoTaskModel.findByIdAndUpdate(req.params.id,{content : req.body.content}, err => {
    if(err) {return next(err)}
    res.redirect("/");
  })
})

router.get("/user/:id/remove/:id",(req,res,next) => {
  todoTaskModel.findByIdAndRemove(req.params.id, err=> {
    if(err) {return next(err)}
    res.redirect("/");
  })
})
/*router.post('/addTask',function(req,res,next){
  console.log('post method');
})*/

module.exports = router;
