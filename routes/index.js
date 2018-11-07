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

router.get('/registerUnits', userController.bursary);

router.get('/bursarylogin', indexController.bursarylogin);

router.get('/facultylogin', indexController.facultylogin);

router.get('/sportlogin', indexController.sportlogin);

router.get('/librarylogin', indexController.librarylogin);

router.get('/internallogin', indexController.internallogin);

router.get('/studentafflogin', indexController.studentafflogin);

router.get('/bursary', isLoggedIn, indexController.bursary);

router.get('/sport', isLoggedIn, indexController.sport);

router.get('/library', isLoggedIn, indexController.library);

router.get('/faculty', isLoggedIn, indexController.faculty);

router.get('/internal', isLoggedIn, indexController.internal);

router.get('/studentaff', isLoggedIn, indexController.studentaff);

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
  successRedirect: '/',
  failureRedirect: '/registerUnits',
  failureFlash: true
}))


router.post('/login/bursary', passport.authenticate('local.loginBursary',{
  successRedirect: '/bursary',
  failureRedirect: '/bursarylogin',
  failureFlash: true
}))

router.post('/login/sport', passport.authenticate('local.loginSport',{
  successRedirect: '/sport',
  failureRedirect: '/sportlogin',
  failureFlash: true
}))

router.post('/login/faculty', passport.authenticate('local.loginFaculty',{
  successRedirect: '/faculty',
  failureRedirect: '/facultylogin',
  failureFlash: true
}))


router.post('/login/library', passport.authenticate('local.loginLibrary',{
  successRedirect: '/library',
  failureRedirect: '/librarylogin',
  failureFlash: true
}))

router.post('/login/studentaff', passport.authenticate('local.loginStudentAffairs',{
  successRedirect: '/studentaff',
  failureRedirect: '/studentafflogin',
  failureFlash: true
}))

router.post('/login/internal', passport.authenticate('local.loginInternal',{
  successRedirect: '/internal',
  failureRedirect: '/internallogin',
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


router.get('/logoutLibrary', function(req, res, next){
  req.logout()
  res.redirect('/librarylogin')
})

router.get('/logoutSport', function(req, res, next){
  req.logout()
  res.redirect('/sportlogin')
})


router.get('/logoutFaculty', function(req, res, next){
  req.logout()
  res.redirect('/facultylogin')
})

router.get('/logoutInternal', function(req, res, next){
  req.logout()
  res.redirect('/internallogin')
})

router.get('/logoutStudentaff', function(req, res, next){
  req.logout()
  res.redirect('/studentafflogin')
})

module.exports = router;


function  isLoggedIn(req, res,next){
  if (req.isAuthenticated()){
    return next()
  }

  res.redirect('/login')
}