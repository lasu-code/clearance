var express = require("express");
var router = express.Router();
let indexController = require("../controllers/indexController.js");
let userController = require("../controllers/userController.js");
let passport = require("passport");
let User = require("../models/users");
let Clearance = require("../models/clearance");

/* GET home page. */
router.get("/", indexController.home);

router.get("/login", indexController.login);

router.get("/profile", isLoggedIn, indexController.profile);

router.get("/students", isLoggedIn, indexController.students);

router.get("/main", indexController.main);

router.get("/registerBursary", userController.bursary);

router.get("/registerSport", userController.registerSport);

router.get("/sportCenterLogin", indexController.sportCenterLogin);

router.get("/bursarylogin", indexController.bursarylogin);

router.get("/bursary", isLoggedIn, indexController.bursary);

router.get("/registerStudent", userController.student);

router.get("/sportCenter", isLoggedIn, indexController.sportCenter);

router.get("/unitsLogin", indexController.unitsLogin);

router.get('/registerLibrary', userController.registerLibrary);

router.get('/libraryLogin', indexController.libraryLogin)

router.get('/library', isLoggedIn, indexController.library)

router.get('/unauthorized', indexController.unauthorized)

router.post(
  "/register/student",
  passport.authenticate("local.registerStudent", {
    successRedirect: "/profile",
    failureRedirect: "/registerStudent",
    failureFlash: true
  })
);

router.post(
  "/login/student",
  passport.authenticate("local.loginStudent", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post(
  "/register/bursary",
  passport.authenticate("local.registerBursary", {
    successRedirect: "/bursary",
    failureRedirect: "/bursarylogin",
    failureFlash: true
  })
);

router.post(
  "/login/bursary",
  passport.authenticate("local.loginBursary", {
    successRedirect: "/bursary",
    failureRedirect: "/bursarylogin",
    failureFlash: true
  })
);

router.post(
  "/register/sportCenter",
  passport.authenticate("local.registerSportCenter", {
    successRedirect: "/sportCenterLogin",
    failureRedirect: "/registerSport",
    failureFlash: true
  })
);

router.post(
  "/login/sportCenter",
  passport.authenticate("local.loginSportCenter", {
    successRedirect: "/sportCenter",
    failureRedirect: "/sportCenterLogin",
    failureFlash: true
  })
);

router.post(
  "/register/library",
  passport.authenticate("local.registerLibrary", {
    successRedirect: "/libraryLogin",
    failureRedirect: "/registerlibrary",
    failureFlash: true
  })
);


router.post("/login/library", passport.authenticate("local.loginLibrary",{
  successRedirect: "/library",
  failureRedirect: "/libraryLogin",
  failureFlash: true
  })
);

router.get("/logout", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/logoutBursary", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/logoutSportCenter", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/logoutLibrary", (req, res, next)=>{
  req.logout();
  res.redirect('/')
})

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}
