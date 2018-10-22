
exports.home = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.login = function(req, res, next) {
  res.render('login')
}

exports.profile = function(req, res, next) {
    res.render("profile")
}

exports.students = function(req, res, next){
  res.render("students")
}

exports.main = function(req, res, next){
  res.render("main")
}

exports.bursarylogin = function(req, res, next){
  res.render("bursarylogin")
}



exports.bursary = function(req, res, next){
    res.render('bursary', {title: "busary", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};