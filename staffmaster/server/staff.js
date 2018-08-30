
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    fullName: String,
    title: String,
    sex: String,
});

module.exports = mongoose.model("Staff", StaffSchema);



