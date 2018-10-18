

exports.homepage = function(req, res, next){
    res.render('index', {title: "HOME"});
};

exports.authentication = function(req, res, next){
    res.render('authentication', {title: "login"});
};

exports.studentDashboard = function(req, res, next){
    res.render("studentDashboard", {title: "MY Dashboard"});
};

exports.units = function(req, res, next){
    res.render("units", {title:"units Login"});
};

exports.signup = function(req, res, next){
    res.render('unitSignup', {title: "signup"});
};

exports.bursary = function(req, res, next){
    res.render('bursary3', {title: "busary"});
};