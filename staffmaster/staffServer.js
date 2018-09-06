
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
            res.status(200).json({ staff });
        }
    });
});

app.post("/api/staff", (req, res) => {
    console.log("Created a new member.");
    console.log(req.body);
    Staff.create(req.body, (err, staff) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Staff.find((err, staff) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json({ staff });
          }
        });
      }
    });
});

app.get("/api/staff/:id", (req, res) => {
    Staff.findById(req.params.id, (err, staff) => {
        if (err) {
            res.status(500).json(err);
        } else {
            // console.log(typeof(staff.id)); // string 
            // The _id field is primary key for every document. 
            // It's called _id and is also accessible via id.
            // console.log(typeof(staff._id)); // object
            // that is:
            // console.log(staff.id === staff._id.toString()); // true
            let dr = staff.directReports;
            let manager = staff.manager;
            // console.log(manager);
            Staff.find((err, members) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json({
                        staff,
                        manager: members.filter(e => manager === e._id.toString()),
                        directReports: members.filter(e => dr.includes(e.id)),
                    }); 
                }
            });
        }
    });
});

app.put("/api/staff/:id", (req, res) => {
    let id = req.params.id;
    Staff.findById(id, (err, member) => {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(req.body);
            member.fullName = req.body.fullName;
            member.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    console.log("Edited a staff member.");
                    Staff.findById(id, (err, member) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json(member);
                        }
                    });
                }
            });
        }
    });
});

app.delete("/api/staff/:id", (req, res) => {
    Staff.findById(req.params.id)
        .then(member => member
            .remove()
            .then(() => res.status(200).json({ success: true })))
        .catch(err => res.status(500).json(err));
});

app.listen(port, () => {
    console.log(`The staffmaster server has started on port ${port}...`);
});







