exports.homepage = function (req, res, next) {
    res.render('index', {
        title: "HOME"
    });
};

exports.authentication = function (req, res, next) {
    res.render('authentication', {
        title: "login"
    });
};

exports.studentDashboard = function (req, res, next) {
    res.render("studentDashboard", {
        title: "MY Dashboard"
    });
};

exports.units = function (req, res, next) {
    res.render("units", {
        title: "units Login"
    });
};

exports.signup = function (req, res, next) {
    res.render('unitSignup', {
        title: "signup"
    });
};

exports.unitdashboard = function (req, res, next) {
        res.render('unitDashboard', {
                title: "Unit Dashboard1",
                fname: "Lukman",
                midname: "omoyemi",
                lastName: "Azeez",
                matricNo: "170115015",
                Dept: "Computer Science Education}",
                startdate: new Date().toLocaleTimeString()});
        };

        exports.bursary4 = function (req, res, next) {
            res.render('bursary4', {
                title: "Unit Dashboard"
            });
        };

        exports.bursary = function (req, res, next) {
            res.render('bursary3', {
                title: "busary",
                fname: "Lukman",
                midname: "Omoyemi",
                lastName: "Azeez",
                matricNo: "170115015",
            });
        };