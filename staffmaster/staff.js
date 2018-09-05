
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    title: String,
    sex: String,
    avatar: String,
    manager: String,
    directReports: [String],
    officePhone: Number,
    cellPhone: Number,
    email: String,
});

module.exports = mongoose.model("Staff", StaffSchema);



