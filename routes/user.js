var express = require('express');
var router = express.Router();
var userModel = require('../models/User');
const { body, validationResult, sanitizeBody } = require('express-validator');
const { use } = require('.');


router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', [
    body('username').isLength({ min: 1 }).trim().withMessage('Username must me specified').custom(value => {
        return userModel.findOne({ username: value }).then(user => {
            if (!user) {
                return Promise.reject('Username or Password does not match');
            }
        })
    }),
    body('password').isLength({ min: 1 }).withMessage("Password must me specified").custom(value => {
        return userModel.findOne({ password: value }).then(pwd => {
            if (!pwd) {
                return Promise.reject('Username or Password does not match');
            }
        })
    }),

    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('login', { errors: errors.array(), form: req.body });
        }
        else {
            userModel.findOne({ username: req.body.username, password: req.body.password },function(err,user){
                if(err){ return next(err)}
                res.redirect(user.url);
            });
        }
    }
])


router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.post('/signup', [
    body('username').isLength({ min: 1 }).trim().withMessage('Username must me specified').custom(value => {
        return userModel.findOne({ username: value }).then(user => {
            if (user) {
                return Promise.reject('User with mentioned username already exist');
            }
        })
    }),

    body('password').isLength({ min: 5 }).withMessage('length of password must be atleast 5'),
    body('confirm_password').custom((value, { req }) => {
        if (req.body.password !== value) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    body('email').isEmail().withMessage('Enter email properly').custom(value => {
        return userModel.findOne({ email: value }).then(email => {
            if (email) {
                return Promise.reject('User with mentioned email already exist');
            }
        })
    }),

    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('password_confirm').escape(),
    sanitizeBody('email').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('signup', { errors: errors.array(), form: req.body })
            return;
        }
        else {
            let new_user = new userModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            })
            new_user.save(function (err) {
                if (err) { return next; }
                else {
                    res.redirect("/");
                }
            })
        }
    }
]);

module.exports = router;