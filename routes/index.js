
var express = require('express');
var router = express.Router();
let indexController = require('../controllers/indexController.js');
let userController = require('../controllers/userController.js');
let passport = require("passport");
let User = require('../models/users');
let Clearance = require('../models/clearance');

/* GET home page. */
router.get('/', indexController.home);

router.get('/login', indexController.login);

router.get('/profile', isLoggedIn, indexController.profile);

router.get('/students', isLoggedIn, indexController.students);

router.get('/main', indexController.main);

router.get('/registerBursary', userController.bursary);

router.get('/bursarylogin', indexController.bursarylogin);

router.get('/bursary', isLoggedIn, indexController.bursary);

router.get('/registerStudent', userController.student);




router.post('/register/student', passport.authenticate('local.registerStudent',{
  successRedirect: '/profile',
  failureRedirect: '/registerStudent',
  failureFlash: true
}))


router.post('/login/student', passport.authenticate('local.loginStudent',{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/register/bursary', passport.authenticate('local.registerBursary',{
  successRedirect: '/bursary',
  failureRedirect: '/bursarylogin',
  failureFlash: true
}))


router.post('/login/bursary', passport.authenticate('local.loginBursary',{
  successRedirect: '/bursary',
  failureRedirect: '/login',
  failureFlash: true
}))


router.get('/logout', function(req, res, next){
  req.logout()
  res.redirect('/login')
})


router.get('/logoutBursary', function(req, res, next){
  req.logout()
  res.redirect('/bursarylogin')
})


module.exports = router;


function  isLoggedIn(req, res,next){
  if (req.isAuthenticated()){
    return next()
  }

  res.redirect('/login')
}
