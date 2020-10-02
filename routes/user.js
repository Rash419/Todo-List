var express = require('express');
var router = express.Router();
var userModel = require('../models/User');
const {body,validationResult } = require('express-validator');

router.get('/signup',function(res,req,next){
    res.render('signup');
});


router.post('/signup',[
    body('username').isLength({min:1}).trim().withMessage('Username must me specified');
    body('password').isLength({min:5}).withMessage('length of password must be atleast 5');
    
]);