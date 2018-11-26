let User = require('../models/users');
let Clearance = require('../models/clearance');

exports.home = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.login = function(req, res, next) {
  let loginError = req.flash('loginError');
  let wrongMatric = req.flash('wrongMatric');
  res.render('login',  {loginError: loginError, wrongMatric: wrongMatric})
}

exports.profile = function(req, res, next) {
    let name = req.user.fullname;
    let matricNo = req.user.matricNo;
    let email = req.user.email;
    let department= req.user.department;
    
    Clearance.findOne({"matricNo": matricNo}).then(function(result){
      if (result){
        result.buttonStatus = "View Clearance Progress";
        res.render("profile", {name: name, email:email,  matricNo: matricNo, button: result.buttonStatus, department: department})
      } else if (!result){
        res.render("profile", {name: name, email:email, matricNo: matricNo, button: "Start Clearance Process", department: department})
      }
      })

    
  }

exports.students = function(req, res, next){   
  let userMatric = req.user.matricNo;
  let userFullname = req.user.fullname;
  let userDepartment = req.user.department;
  let userName = req.user.username;
   let userEmail = req.user.email;
    Clearance.findOne({"matricNo": userMatric}).then(function(result){
      if (!result){

          let newClearance = new Clearance();
        newClearance.userFullName = userFullname;
        newClearance.department = userDepartment;
        newClearance.email = userEmail;
        newClearance.studentStatus.status = true;
        newClearance.bursaryUnit.document = null;
        newClearance.matricNo = userMatric;
        newClearance.bursaryUnit.status = "NOT ENROLLED";
        newClearance.libraryUnit.status = "NOT ENROLLED";
        newClearance.sportCenterUnit.status = "NOT ENROLLED";
        newClearance.facultyUnit.status = "NOT ENROLLED";
        newClearance.studentAffairs.status = "NOT ENROLLED";
        newClearance.internalAuditUnit.status = "NOT ENROLLED";
        newClearance.fullyCleared.status = "Awaiting Approval";
        

        newClearance.save()
        

          console.log(result);
         res.render('students', {doc: newClearance, userName: userName})

        } else {
              console.log(result)
         res.render('students', {doc: result, userName: userName})

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
                 
  
  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
    pendingResult = [];
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "PENDING") {
        pendingCount++
        pendingResult.push(result[i])
      }
      else if (result[i].bursaryUnit.status == "CLEARED") {
        clearedCount++
        
      }else if (result[i].bursaryUnit.status == "REJECTED") {
        rejectCount++
        
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
    
     res.render('bursary', {title: "bursary", result : pendingResult, pendingCount, clearedCount, rejectCount})

})
 
  
}


exports.clearedBursary = function(req, res, next){

  
  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
  
    clearedResult = [];
  
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "PENDING") {
        pendingCount++
  
      }
      else if (result[i].bursaryUnit.status == "CLEARED") {
        clearedCount++
        clearedResult.push(result[i])
        
      }else if (result[i].bursaryUnit.status == "REJECTED") {
        rejectCount++
          
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
      
     res.render('clearBursary', {title: "bursary", pendingCount, clearedCount, rejectCount, doc:clearedResult})

})

}

exports.rejectedBursary = function(req, res, next){
  

  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
  
    rejectedResult = [];
  
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "PENDING") {
        pendingCount++
  
      }
      else if (result[i].bursaryUnit.status == "CLEARED") {
        clearedCount++
       
        
      }else if (result[i].bursaryUnit.status == "REJECTED") {
        rejectCount++
        rejectedResult.push(result[i])   
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
  
      
     res.render('rejectBursary', {title: "bursary", pendingCount, clearedCount, rejectCount, file: rejectedResult})

})


}


exports.library = function(req, res, next){
  
  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
    pendingResult = [];
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "PENDING") {
        pendingCount++
        pendingResult.push(result[i])
      }
      else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "CLEARED") {
        clearedCount++
        
      }else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "REJECTED") {
        rejectCount++
        
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
    
     res.render('library', {title: "Library", result : pendingResult, pendingCount, clearedCount, rejectCount})

})

};


exports.clearedLibrary= function(req, res, next){
  
  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
  
    clearedResult = [];
  
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "PENDING") {
        pendingCount++
  
      }
      else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "CLEARED") {
        clearedCount++
        clearedResult.push(result[i])
        
      }else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "REJECTED") {
        rejectCount++
          
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
      
     res.render('clearLibrary', {title: "Library", pendingCount, clearedCount, rejectCount, doc:clearedResult})

})

}

exports.rejectedLibrary= function(req, res, next){


  Clearance.find({}).then((result)=>{
    //console.log(result.length);
    console.log(result) 
    pendingCount = 0;
    clearedCount = 0;
    rejectCount = 0;
  
    rejectedResult = [];
  
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "PENDING") {
        pendingCount++
  
      }
      else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "CLEARED") {
        clearedCount++
       
        
      }else if (result[i].bursaryUnit.status == "CLEARED" && result[i].libraryUnit.status == "REJECTED") {
        rejectCount++
        rejectedResult.push(result[i])   
      }
      console.log(pendingCount)
      console.log(clearedCount)
      console.log(rejectCount)
      var element = result[i];
      }
  
      
     res.render('rejectLibrary', {title: "Library", pendingCount, clearedCount, rejectCount, file: rejectedResult})

})

}


exports.faculty = function(req, res, next){
  Clearance.find({"bursaryUnit.status": "CLEARED", "facultyUnit.status": "PENDING"}).then((result)=>{
    console.log(result);
     res.render('faculty', {title: "Faculty", result : result})

})

};


exports.clearedFaculty= function(req, res, next){
  Clearance.find({"facultyUnit.status": "CLEARED"}).then((result)=>{
    console.log(result);
     res.render('faculty', {title: "Faculty", result : result})

})
}

exports.rejectedFaculty= function(req, res, next){
  Clearance.find({"facultyUnit.status": "REJECTED"}).then((result)=>{
    console.log(result);
     res.render('faculty', {title: "Faculty", result : result})

})
}


exports.studentaff = function(req, res, next){
  Clearance.find({"bursaryUnit.status": "CLEARED", "studentAffairs.status": "PENDING"}).then((result)=>{
    console.log(result);
     res.render('student-aff', {title: "STUDENT AFFAIRS", result : result})

})

};


exports.clearedStudentAffairs= function(req, res, next){
  Clearance.find({"studentAffairs.status": "CLEARED"}).then((result)=>{
    console.log(result);
     res.render('student-aff', {title: "STUDENT AFFAIRS", result : result})

})
}

exports.rejectedStudentAffairs= function(req, res, next){
  Clearance.find({"studentAffairs.status": "REJECTED"}).then((result)=>{
    console.log(result);
     res.render('student-aff', {title: "STUDENT AFFAIRS", result : result})

})

}


exports.sport = function(req, res, next){
  Clearance.find({"bursaryUnit.status": "CLEARED", "sportCenterUnit.status": "PENDING"}).then((result)=>{
    console.log(result);
     res.render('sport', {title: "SPORT CENTER", result : result})

})

};


exports.clearedSport= function(req, res, next){
  Clearance.find({"sportCenterUnit.status": "CLEARED"}).then((result)=>{
    console.log(result);
     res.render('sport', {title: "SPORT CENTER", result : result})

})
}

exports.rejectedSport= function(req, res, next){
  Clearance.find({"sportCenterUnit.status": "REJECTED"}).then((result)=>{
    console.log(result);
     res.render('sport', {title: "SPORT CENTER", result : result})

})
}


exports.internal = function(req, res, next){
  Clearance.find({"bursaryUnit.status": "CLEARED", "internalAuditUnit.status": "PENDING"}).then((result)=>{
    console.log(result);
     res.render('internal', {title: "INTERNAL AUDIT", result : result})

})

};


exports.clearedInternal= function(req, res, next){
  Clearance.find({"internalAuditUnit.status": "CLEARED"}).then((result)=>{
    console.log(result);
     res.render('internal', {title: "INTERNAL AUDIT", result : result})

})
}

exports.rejectedInternal= function(req, res, next){
  Clearance.find({"internalAuditUnit.status": "REJECTED"}).then((result)=>{
    console.log(result);
     res.render('internal', {title: "INTERNAL AUDIT", result : result})

})
}

