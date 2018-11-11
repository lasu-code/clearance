exports.student = function(req, res, next) {
  res.render("registerStudent");
};

exports.bursary = function(req, res, next) {
  res.render("registerBursary");
};

exports.registerSport = (req, res, next) => {
  res.render("registerSport", { title: "sportCenterSignup" });
};
exports.registerLibrary = (req, res, next) => {
  res.render("registerLibrary", {title: "registerLIbrary"});
  // res.send("register user")
};

