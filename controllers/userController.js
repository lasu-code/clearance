
exports.student = function(req, res, next) {
  res.render('registerStudent');
}

exports.bursary = function(req, res, next) {
  res.render('registerBursary');
}

exports.registerSport = (re, res, next) =>{
  res.render('registerSport', {title: "sportCenterSignup"});
}
