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
    
    Clearance.findOne({"matricNo": matricNo}).then(function(result){
      if (result){
        result.buttonStatus = "View Clearance Progress";
        res.render("profile", {name: name, matricNo: matricNo, button: result.buttonStatus})
      } else if (!result){
        res.render("profile", {name: name, matricNo: matricNo, button: "Start Clearance Process"})
      }
      })

    
  }

exports.students = function(req, res, next){   
  let userMatric = req.user.matricNo;
    Clearance.findOne({"matricNo": userMatric}).then(function(result){
      if (!result){

          let newClearance = new Clearance();
        newClearance.studentStatus.status = true;
        newClearance.bursaryUnit.document = null;
        newClearance.matricNo = userMatric;
        newClearance.bursaryUnit.status = "pending";
        newClearance.libraryUnit.status = "Not Enrolled";
        newClearance.sportCenterUnit.status = "Not Enrolled";
        newClearance.facultyUnit.status = "Not Enrolled";
        newClearance.studentAffairs.status = "Not Enrolled";
        newClearance.internalAuditUnit.status = "Not Enrolled";
        
        newClearance.save()
        
          console.log(result);
         res.render('students', {doc: newClearance})

        } else {
         res.render('students', {doc: result})

        }
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


exports.facultylogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("facultylogin", {loginError: loginError, wrongPassword: wrongPassword})
}

exports.librarylogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("librarylogin", {loginError: loginError, wrongPassword: wrongPassword})
}

exports.studentafflogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("student-afflogin", {loginError: loginError, wrongPassword: wrongPassword})
}

exports.sportlogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("sportlogin", {loginError: loginError, wrongPassword: wrongPassword})
}


exports.internallogin = function(req, res, next){
  let loginError = req.flash('loginError');
  let wrongPassword = req.flash('wrongPassword');
  res.render("internallogin", {loginError: loginError, wrongPassword: wrongPassword})
}

exports.bursary = function(req, res, next){
    res.render('bursary', {title: "busary", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};

exports.library = function(req, res, next){
    res.render('library', {title: "library", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};

exports.faculty = function(req, res, next){
    res.render('faculty', {title: "faculty", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};

exports.sport = function(req, res, next){
    res.render('sport', {title: "Sport", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};


exports.internal = function(req, res, next){
    res.render('internal', {title: "Internal-Audit", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};

exports.studentaff = function(req, res, next){
    res.render('student-aff', {title: "Student-Affairs", 
    fname: "fawas",
    midname: "olamilekan",
    lastName: "kareem" ,
    matricNo: "170115028",
    });
};
  