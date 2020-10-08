var express = require('express');
var router = express.Router();
var todoTaskModel = require('../models/TodoTask');
/* GET home page. */




router.get('/:userId', function (req, res, next) {
  
  todoTaskModel.find({user : req.params.userId},(err,tasks) => {
    if(err) { return next(err) };
    res.render('index',{todotask : tasks});
  });
});

router.post('/:userId', async (req, res, next) => {
  console.log(req.body);
  const todoTask = new todoTaskModel({
    content: req.body.content,
    user : req.params.userId,
  });

  try {
    await todoTask.save();
    res.redirect('/user/'+req.params.userId);
  }
  catch (err) {
    res.redirect('/user/'+req.params.userId);
  }
});


router.get("/:userId/edit/:taskId",(req,res,next) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;

  todoTaskModel.find({user:userId},function(err,tasks){
    if(err) {return next(err)}
    res.render("indexEdit",{todotask : tasks,idTask : taskId,idUser : userId});
  })
})

router.post("/:userId/edit/:taskId",(req,res,next) => {
  todoTaskModel.findByIdAndUpdate(req.params.taskId,{content : req.body.content}, err => {
    if(err) {return next(err)}
    res.redirect('/user/'+req.params.userId);
  })
})


router.get("/:userId/remove/:taskId",(req,res,next) => {
  todoTaskModel.findByIdAndRemove(req.params.taskId, err=> {
    if(err) {return next(err)}
    res.redirect('/user/'+req.params.userId);
  })
});

module.exports = router;
