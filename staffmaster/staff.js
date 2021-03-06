
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    // image: {
    //     data: Buffer,
    //     contentType: String
    // },
    fullName: {
        type: String,
        required: true,
    },
    title: String,
    sex: String,
    avatar: String,
    manager: {
        type: String,
        default: "",
    },
    directReports: {
        type: [String],
        default: [],
    },
    officePhone: Number,
    cellPhone: Number,
    email: String,
});

module.exports = mongoose.model("Staff", StaffSchema);



