let User = require("../models/users");
let Clearance = require("../models/clearance");

exports.home = function(req, res, next) {
  res.render("index", { title: "Express" });
};

exports.login = function(req, res, next) {
  let loginError = req.flash("loginError");
  let wrongMatric = req.flash("wrongMatric");
  res.render("login", { loginError: loginError, wrongMatric: wrongMatric });
};

exports.profile = function(req, res, next) {
  let name = req.user.fullname;
  let matricNo = req.user.matricNo;

  
  Clearance.findOne({ matricNo: matricNo }).then(function(result) {
    if (result) {
      res.render("profile", {
        name: name,
        matricNo: matricNo,
        button: "view clearance progress"
      });
    } else if (!result) {
      res.render("profile", {
        name: name,
        matricNo: matricNo,
        button: "start clearance process"
      });
    }
  });
  // res.render("profile", { name: name, matricNo: matricNo });
};

exports.unitsLogin = (req, res, next) => {
  res.render("unitsLogin");
};

exports.students = function(req, res, next) {
  let userMatric = req.user.matricNo;
  let name = req.user.fullname;
  let Name = req.user.username;

  Clearance.findOne({ matricNo: userMatric }).then(function(result) {
    if (!result) {
      let newClearance = new Clearance();
      newClearance.studentStatus.status = true;
      newClearance.matricNo = userMatric;
      newClearance.bursaryUnit.status = "pending";
      newClearance.libraryUnit.status = "pending";
      newClearance.sportCenterUnit.status = "pending";
      newClearance.facultyUnit.status = "pending";
      newClearance.internalAudit = " pending";
      newClearance.studentAffairs.status = "pending";
      newClearance.save();

      console.log(result);
    }
    res.render("students", { doc: result, Name: Name });
  });
};

exports.main = function(req, res, next) {
  res.render("main");
};

exports.bursarylogin = function(req, res, next) {
  let loginError = req.flash("loginError");
  let wrongPassword = req.flash("wrongPassword");
  res.render("bursarylogin", {
    loginError: loginError,
    wrongPassword: wrongPassword
  });
};

// for instance by tuface and sound sultan and alex ekubo
// spiritual healing by tuface
// implication by tufacex

exports.bursary = function(req, res, next) {
  let matricNo = req.user.matricNo;
  let role = req.flash("you are not authorized to view this page");
  // let role2 = req.user.role,

  User.findOne({ username: req.user.username }).then(function(result) {
    if (result.role != "bursary") {
      console.log(result + "you are not authorized to view this page");
      res.render("unauthorized");
    } else {
      res.render("bursary", {
        title: "busary",
        fname: req.user.fullname,
        midname: req.user.username,
        lastName: req.user.username,
        matricNo: matricNo
      });
    }
    // else{
    //   req.flash("you are not authorized to view this page");
    // }
  });
};

exports.sportCenterLogin = function(req, res, next) {
  let loginError = req.flash("loginError");
  let wrongPassword = req.flash("wrongPassword");
  res.render("sportCenterlogin", {
    loginError: loginError,
    wrongPassword: wrongPassword
  });
};

exports.sportCenter = (req, res, next) => {
  User.findOne({'username': req.user.username }).then(result => {
    if (result.role != "sportCenter") {
      console.log(result + "you are not an authorized user");
      res.render("unauthorized");
    } else {
      res.render("sportCenter", {
        title: "sportCenterUnit",
        fname: "fawas",
        midname: "olamilekan",
        lastName: "kareem",
        matricNo: 170115028
      });
    }
  });
};

exports.library = (req, res, next) => {

  User.findOne({"username": req.user.username}).then ((result) =>{
    if (result.role != "library"){
      console.log((result) + "an unauathorized user is trying to acces this page")
      res.render("unauthorized")
    }
    else{
      res.render("library", {
        title: "libraryUnit",
        fname: req.user.fullname,
        midname: req.user.username,
        lastName: req.user.username,
        matricNo: req.user.matricNo
      });
    }
  })
  
};

exports.libraryLogin = (req, res, next) => {
  let loginError = req.flash("loginError");
  let wrongPassword = req.flash("wrongPassword");
  res.render("libraryLogin", {
    title: "libraryLogin",
    loginError,
    wrongPassword
  });
};

exports.unauthorized = (req, res, next) => {
  res.render("unauthorized");
};
