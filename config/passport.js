let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;

let User = require('../models/users');

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

passport.use('local.registerStudent', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username}, function(err, user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false)
        }

        let newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.username = req.body.username;
         newUser.matricNo = req.body.matricNo;
         newUser.email = req.body.email;
         newUser.department = req.body.department,
         newUser.phone = req.body.phone,
         newUser.year = req.body.year,         
         newUser.address = req.body.address,
        newUser.password = newUser.generateHash(req.body.password);
        newUser.role = req.body.role

        newUser.save(function(err){
            if (err){
                return done(err)
            }
            
            return done(null, newUser)
        })
    })
}))


passport.use('local.loginStudent', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "student"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "Student is not valid for clearance process")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongMatric', "Wrong Matric Number")
            return done(null, false)
        }

        return done(null, user)

    })
}))



passport.use('local.registerBursary', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username}, function(err, user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false)
        }

        let newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.username = req.body.username;
        newUser.password = newUser.generateHash(req.body.password);
        newUser.role = req.body.role

        newUser.save(function(err){
            if (err){
                return done(err)
            }
            
            return done(null, newUser)
        })
    })
}))


passport.use('local.loginBursary', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "bursary"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))


passport.use('local.loginSport', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "sport"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))


passport.use('local.loginFaculty', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "faculty"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))


passport.use('local.loginLibrary', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "library"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))

passport.use('local.loginStudentAffairs', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "student-affairs"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))

passport.use('local.loginInternal', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username': username, "role": "internal-audit"}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "INVALID LOGIN")
            return done(null, false)
        }

        if(!user.validatePassword(req.body.password)) {
            req.flash('wrongPassword', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))
