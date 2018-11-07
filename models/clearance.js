let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let clearanceSchema = new Schema({
    studentStatus: {
        status: Boolean,
        default: false
    },
    buttonStatus: {type: String},
    matricNo: {type: String},
    bursaryUnit: {
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
    }
})


module.exports = mongoose.model("Clearance", clearanceSchema)