var express = require('express');
const path = require('path');
var router = express.Router();
let indexController = require('../controllers/indexController.js');
let userController = require('../controllers/userController.js');
let passport = require("passport");
let User = require('../models/users');
let Clearance = require('../models/clearance');
const multer =require("multer");
const methodOverride = require("method-override");


const  storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})


const upload = multer({
  storage: storage ,
  //limits: {fileSize: 10},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('receipt')

//check file type 
function checkFileType(file, cb){
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname
  (file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
    return cb(null, true);
  }else {
    cb('Error: images Only!')
  }
}


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

router.put('/upload', function (req, res){
  upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    } else if (req.file == undefined){
        //res.render('students', {msg : 'No image Uploaded'})
    res.send("No image Uploaded")
    }else{
      console.log(req.file);
      let userMatric = req.user.matricNo
      Clearance.findOneAndUpdate({"matricNo": userMatric}, {$set:{"bursaryUnit.document": `/public/uploads/${req.file.filename}`}}, {new: true})
      .then(res.send("test"))
        //res.render('students', {msg : 'file Uploaded', file: `/public/uploads/${req.file.filename}` })      
     // res.send("test")
    }
  })
})


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