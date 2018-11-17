let mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
let Schema = mongoose.Schema;


let userSchema = new Schema({
    fullname: {type: String},
    username: {type: String, trim: true},
    password: {type: String},
    matricNo: {type: String},
    email: {type: String},
    department: {type: String},
    role: {type: String},
    createdDate: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)