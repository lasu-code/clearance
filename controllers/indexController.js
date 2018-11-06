let User = require('../models/users');
let Clearance = require('../models/clearance');

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
    Clearance.findOne({"matricNo": userMatric}).then(function(result){
      if (!result){

          let newClearance = new Clearance();
        newClearance.studentStatus.status = true;
        newClearance.matricNo = userMatric;
        newClearance.bursaryUnit.status = "pending"
        newClearance.libraryUnit.status = "pending";
        newClearance.sportCenterUnit.status = "pending";
        newClearance.save()
        
          console.log(result);

        }
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



exports.bursary = function(req, res, next){
    res.render('bursary', {title: "busary", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};