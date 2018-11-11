let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let clearanceSchema = new Schema({
  studentStatus: {
    status: Boolean,
    default: false
  },
  matricNo: { type: String },

  bursaryUnit: {
    status: { type: String },
    message: { type: String }
  },
  libraryUnit: {
    status: { type: String },
    message: { type: String }
  },
  sportCenterUnit: {
    status: { type: String },
    message: { type: String }
  },
  facultyUnit:{
    status: {type:String},
    message: {type:String}
  },
  studentAffaiirs:{
    status: {type:String},
    message: {type:String}
  },
  internalAudit:{
    status: {type:String},
    message: {type:String}
  },

  dateCreated:{
    type: Date,
    defaultS: Date.now
  }
});

module.exports = mongoose.model("Clearance", clearanceSchema);
 