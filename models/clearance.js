let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let clearanceSchema = new Schema({
    userFullName: {type: String},
    department: {type: String},
    email: {type: String},    
    studentStatus: {
        status: Boolean,
        default: false
    },
    buttonStatus: {type: String},
    matricNo: {type: String},
    bursaryUnit: {
        document: {type: String},
        status: {type: String},
        message: {type: String}
    },
    libraryUnit: {
        status: {type: String},
        message: {type: String}
    },
    sportCenterUnit: {
        status: {type: String},
        message: {type: String}
    },
    facultyUnit: {
        status: {type: String},
        message: {type: String}
    },
    studentAffairs: {
        status: {type: String},
        message: {type: String}
    },
    internalAuditUnit: {
        status: {type: String},
        message: {type: String}
    },
    fullyCleared: {
        status: {type: String}
    },
    payment: {
      type: Boolean, default: false}
})


module.exports = mongoose.model("Clearance", clearanceSchema)