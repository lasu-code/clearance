
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
const nodemailer = require("nodemailer");
const keys = require("../config/keys")
var paystack = require('paystack')('secret_key');



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

router.get('/profile', studentLoggedIn, indexController.profile);

router.get('/students', studentLoggedIn, indexController.students);

router.get('/main', indexController.main);

router.get('/registerUnits', userController.bursary);

router.get('/bursarylogin', indexController.bursarylogin);

router.get('/facultylogin', indexController.facultylogin);

router.get('/sportlogin', indexController.sportlogin);

router.get('/librarylogin', indexController.librarylogin);

router.get('/internallogin', indexController.internallogin);

router.get('/studentafflogin', indexController.studentafflogin);

router.get('/bursary', bursaryLoggedIn, indexController.bursary);

router.get('/clearedBursary', bursaryLoggedIn, indexController.clearedBursary);

router.get('/rejectedBursary', bursaryLoggedIn, indexController.rejectedBursary);

router.get('/sport', sportLoggedIn, indexController.sport);

router.get('/clearedSport', sportLoggedIn, indexController.clearedSport);

router.get('/rejectedSport', sportLoggedIn, indexController.rejectedSport);

router.get('/library', libraryLoggedIn, indexController.library);

router.get('/clearedLibrary', libraryLoggedIn, indexController.clearedLibrary);

router.get('/rejectedLibrary', libraryLoggedIn, indexController.rejectedLibrary);

router.get('/faculty', facultyLoggedIn, indexController.faculty);

router.get('/clearedFaculty', facultyLoggedIn, indexController.clearedFaculty);

router.get('/rejectedFaculty', facultyLoggedIn, indexController.rejectedFaculty);

router.get('/internal', internalLoggedIn, indexController.internal);

router.get('/clearedInternal', internalLoggedIn, indexController.clearedInternal);

router.get('/rejectedInternal', internalLoggedIn, indexController.rejectedInternal);

router.get('/studentaff', affairsLoggedIn, indexController.studentaff);

router.get('/clearedStudentAffairs', affairsLoggedIn, indexController.clearedStudentAffairs);

router.get('/rejectedStudentAffairs', affairsLoggedIn, indexController.rejectedStudentAffairs);

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
      Clearance.findOneAndUpdate({"matricNo": userMatric, "bursaryUnit.status": "NOT ENROLLED"},
       {$set:{"bursaryUnit.document": `/public/uploads/${req.file.filename}`, "bursaryUnit.status": "PENDING"}}, 
       {new: true})
      .then((result)=>{
          if (result) {
            res.redirect("/students")
          } else {
            res.send("error")
          }
      })
             
     // res.send("test")
    }
  })
})



router.put('/bursaryClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"bursaryUnit.status": "CLEARED", "libraryUnit.status": "PENDING", "internalAuditUnit.status": "PENDING", "facultyUnit.status": "PENDING",
   "sportCenterUnit.status": "PENDING", "studentAffairs.status": "PENDING", }}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/bursary")
  })
   
})



router.put('/bursaryReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"bursaryUnit.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/bursary")
  })
   
})




router.put('/bursaryComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Bursary" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/bursary")
    });
    
   
})




router.put('/libraryComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Bursary" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/library")
    });
})


router.put('/facultyComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Faculty" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/faculty")
    });
}) 


    
router.put('/sportComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Sport Center" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/sport")
    });
})

    
router.put('/internalComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Internal Audit" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/internal")
    });
})


    
router.put('/studentaffComment', function (req, res){

    let Transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25, 
      auth: {
        user: "phawazzzy@gmail.com",
        pass: keys.keys.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //sending email with SMTP, configuration using SMTP settings
    let mailOptions = {
      from: "lasu clearance - <phawazzzy@gmail.com>", //sender adress
      to: req.body.userMail, 
      subject: "Mail from Student Affairs" ,
      html: req.body.comment 
    };

    Transport.sendMail(mailOptions, (error, info)=>{
      if (error){
        console.log(error);
        console.log(mailOptions.html);
        
        //res.send("email could not send due to error:" + error);
      }else{
        console.log(info);
        console.log(mailOptions.html);
        
       // res.send("email has been sent successfully");
      }
      res.redirect("/studentaff")
    });
})




router.put('/libraryClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"libraryUnit.status": "CLEARED"}},  
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/library")
  })
   
})


router.put('/libraryReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"libraryUnit.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/library")
  })
   
})

router.put('/facultyClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"facultyUnit.status": "CLEARED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/faculty")
  })
   
})


router.put('/facultyReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"facultyUnit.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/faculty")
  })
   
})

router.put('/studentaffClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"studentAffairs.status": "CLEARED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/studentaff")
  })
   
})


router.put('/studentaffReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"studentAffairs.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/studentaff")
  })
   
})


router.put('/sportReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"sportCenterUnit.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/sport")
  })
   
})

router.put('/sportClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"sportCenterUnit.status": "CLEARED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/sport")
  })
   
})


router.put('/internalClear', function (req, res){
 Clearance.findByIdAndUpdate(req.body.resultId,
  {$set:{"internalAuditUnit.status": "CLEARED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/internal")
  })
   
})


router.put('/internalReject', function (req, res){
 Clearance.findByIdAndUpdate(req.body.studentId,
  {$set:{"internalAuditUnit.status": "REJECTED"}}, 
  {new: true}).then((result)=>{
    console.log(result)
    res.redirect("/internal")
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

router.post('/api/savePaystackResponse', function(req, res, next){

    var errs = [];
    if(req.body.mat_number == undefined)
      {
        errs.push("matric number cannot be empty!");
      } else if(isNaN(req.body.mat_number))
      {
        errs.push("matric number should be an integer!");        
      } else
      {
         Clearance.findOne({"matricNo": req.body.mat_number}).then(function(result){
           console.log(result);
        
           if(!result) errs.push("matric number not found!");
         });
      }

      if(req.body.trans_reference == undefined)
      {
        errs.push("Transaction ref cannot be empty!");
      } else if(req.body.trans_reference=="" || req.body.trans_reference==" ")
      {
        errs.push("Transaction ref cannot be empty!");        
      }

      if(errs.length==0)
        {
         // verify the payment
          var http = require("https");
          var api_secret_key = "";

          var option ={
"method": "GET",
"hostname": [
  "api",
  "co"
],
"path": [
  "transaction",
  "verify",
  req.body.trans_reference
],
"headers":{
  "cache-control": "no-cache",
  "Authorization": "Bearer "+ api_secret_key
}

};

var req = http.request(options, function (res){
  var chunks = [];

  res.on("data", function(chunk){
    chunks.push(chunk)
  });
  res.on("end", function(){
    var body = Buffer.concat(chunks);


    var res = JSON.parse(body);
    if(res.data.status=="success")
      {
console.log("succes")
      }

    console.log(body.tostring());
  });
});

req.end();


// paystack.transactions.verify(req.body.trans_reference, function(error, body) {
//   if(error){
// res.json({"err":"Unknow error: "+error});
//   } 

//   if(body.data.status=="success")
//     {

      // update user data....


  //     Clearance.findOneAndUpdate({"matricNo": req.body.mat_number},
  // {$set:{"payment": true}}, 
  // {new: true}).then((result)=>{
  //   console.log(result)
  // })

//   console.log("yoyoyoyoyoyoyo")

//       res.json({"success":true})
//     }
// });

//             res.json({"name": "hello"});  
        } else 
        {
          console.log("failure")
          res.json(JSON.stringify(errs));
        }
});

module.exports = router;


function  studentLoggedIn(req, res,next){
  if (req.user.role=="student" && req.isAuthenticated()){
    console.log(req.isAuthenticated())
    return next()
  }


  res.redirect('/login')
}


function  libraryLoggedIn(req, res,next){
  
  if (req.user.role=="library" && req.isAuthenticated()){
    return next()
  }
     res.redirect('/login')
}

function  bursaryLoggedIn(req, res,next){
  
  if (req.user.role=="bursary" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}

function  sportLoggedIn(req, res,next){
  
  if (req.user.role=="sport" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}

function  internalLoggedIn(req, res,next){
  
  if (req.user.role=="library" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}

function  affairsLoggedIn(req, res,next){
  
  if (req.user.role=="student-affairs" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}

function  facultyLoggedIn(req, res,next){
  
  if (req.user.role=="faculty" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}

function  internalLoggedIn(req, res,next){
  
  if (req.user.role=="internal-audit" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/login')

}