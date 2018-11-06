let User = require('../models/users');
let Clearance = require('../models/clearance1');

exports.home = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.login = function(req, res, next) {
  let loginError = req.flash('loginError');
  let wrongMatric = req.flash('wrongMatric')
  res.render('login',  {loginError: loginError, wrongMatric: wrongMatric})
}

exports.profile = function(req, res, next) {
    let name = req.user.fullname;
    let matricNo = req.user.matricNo;
    res.render("profile", {name: name, matricNo: matricNo})
}

exports.students = function(req, res, next){ 
  let userMatric = req.user.matricNo;
  let fullName = req.user.fullname;
   let newClearance = new Clearance();
        newClearance.studentStatus.status = true;
        newClearance.matricNo = userMatric;
        newClearance.bursaryUnit.status = "pending"
        newClearance.libraryUnit.status = "pending";
        newClearance.sportCenterUnit.status = "pending";
        newClearance.save()
      
        Clearance.findOne({"matricNo": req.user.matricNo}).then(function(result){
          console.log(result);
  
          res.render('students', {doc: result})
        })
       
}

exports.main = function(req, res, next){
  res.render("main")
}

exports.bursarylogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("bursarylogin", {loginError: loginError, wrongPassword: wrongPassword})
}

exports.sportCenterLogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("sportCenterlogin", {loginError: loginError, wrongPassword: wrongPassword})
}

// for instance by tuface and sound sultan and alex ekubo
// spiritual healing by tuface
// implication by tufacex

exports.bursary = function(req, res, next){
  let matricNo = req.user.matricNo
    res.render('bursary', {title: "busary", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: matricNo,
    });
};

exports.sportCenter = (req, res, next) =>{
  res.render("sportCenter", {title: 'sportCenterUnit',
  fname: "fawas",
  midname: "olamilekan",
  lastName: "kareem" ,
  matricNo: 170115028,
  })
}