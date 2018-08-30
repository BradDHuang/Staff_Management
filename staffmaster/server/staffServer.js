
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 8081;

const Staff = require("./staff");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

mongoose.connect("mongodb://staffmaster:password123@ds237832.mlab.com:37832/staffmaster");

app.get("/api/staff", (req, res) => {
    Staff.find((err, staff) => {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log("Getting all staff members.");
            let staffArray = [];
            staff.forEach(member => staffArray.push(member)); 
            res.status(200).json(staffArray);
        }
    });
});

app.post("/api/staff", (req, res) => {
    // let member = new Staff();
    console.log(req.body);
    // member.fullName = req.body.fullName;
    // member.save((err) => {
    //     if (err) {
    //         res.status(500).json(err);
    //     } else {
    //         console.log("Created a new member.");
    //         res.status(200).json(member);
    //     }
    // });
    Staff.create(req.body, (err, member) => {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log("Created a new member.");
            res.status(200).json(member);
        }
        // saved!
    });
});

app.listen(port, () => {
    console.log(`The staffmaster server has started on port ${port}...`);
});







