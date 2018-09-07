
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

/*
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
*/
// edit an existing member
app.put("/api/staff/:id", (req, res) => {
    
    // console.log(req.params.id);
//   Staff.findOneAndUpdate(
    Staff.findById(
    req.params.id,
    // req.body,
    (err, staff) => {
      if (err) {
        res.status(500).json(err);
      } else {
        
        if (staff != null) {
          
        //   console.log(req.body);
        //   console.log(staff);
          
        // Staff.findById(
          // req.params.id,
        //   req.body,
          // (err, staff) => {
              // console.log(staff);
            // if (err) {
              // res.status(500).json(err);
            // } else {
              
              staff.fullName = req.body.fullName;
              staff.title = req.body.title;
              staff.sex = req.body.sex;
              staff.officePhone = req.body.officePhone;
              staff.cellPhone = req.body.cellPhone;
              staff.email = req.body.email;
              staff.manager = req.body.manager;
              // console.log(staff);
              staff.save(err => {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    
                    Staff.findById(req.params.id, (err, staff) => {
                        if (err) {
                          res.status(500).json(err);
                        } else {
                          console.log("edited a staff member's info.");
                          console.log(staff);
                          
                        }
                    });
                  }
              });
              
            
          // }
        // );
          
        
          // https://stackoverflow.com/questions/32397419/model-findone-not-returning-docs-but-returning-a-wrapper-object
          let obj = staff._doc; // .toObject()
          // console.log(typeof(staff)); // object
          console.log(obj.manager, req.body.manager);
          // manager unchange: A -> A, or none -> none.
          if (obj.manager === req.body.manager) {
            // Staff.findOneAndUpdate(
            // console.log(req.params.id);
            Staff.findById(
              req.params.id,
            //   req.body,
              (err, staff) => {
                  // console.log(staff);
                if (err) {
                  res.status(500).json(err);
                } else {
                  
                  // staff.fullName = req.body.fullName;
                  // staff.title = req.body.title;
                  // staff.sex = req.body.sex;
                  // staff.officePhone = req.body.officePhone;
                  // staff.cellPhone = req.body.cellPhone;
                  // staff.email = req.body.email;
                  // // staff.manager = req.body.manager;
                  // console.log(staff);
                  // staff.save(err => {
                      // if (err) {
                      //   res.status(500).json(err);
                      // } else {
                        
                        // Staff.findById(req.params.id, (err, staff) => {
                            // if (err) {
                            //   res.status(500).json(err);
                            // } else {
                              // console.log("edited a staff member's info.");
                              // console.log(staff);
                              Staff.find((err, staff) => {
                                if (err) {
                                  res.status(500).json(err);
                                } else {
                                  res.status(200).json({ staff });
                                }
                              });
                            // }
                        // });
                      // }
                  // });
                }
              }
            );
          } else {
            // manager changed: A / null -> B / null
            // delete prev manager (A)
            // console.log(staff.manager);
            if (staff.manager !== null) {
              // console.log(obj.manager);
              Staff.findById(obj.manager, (err, manager) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  
                  if (manager !== null) {
                    console.log(manager.directReports);
                    // let newManager = Object.assign({}, manager._doc);
                    // newManager.directReports = newManager.directReports.filter(
                    manager.directReports = manager.directReports.filter(
                      m => m !== req.params.id
                    );
                    console.log(manager.directReports);
                    // console.log(obj.manager);
                    // Staff.findOneAndUpdate(
                    // Staff.findById(
                      // obj.manager,
                      
                      // newManager,
                      // (err, manager) => {
                        // if (err) {
                          // res.status(500).json(err);
                        // } else {
                          manager.save(
                            err => {
                              if (err) {
                                res.status(500).json(err);
                              } else {
                                Staff.findById(obj.manager, (err, staff) => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      console.log("updated manager info.");
                                      console.log(staff);
                                      
                                    }
                                });
                              }
                          }
                          );
                        // }
                      // }
                    // );
                  }
                }
              });
            }

            // update new manager's (B's) directReports
            // console.log(req.body.manager);
            if (req.body.manager !== null) {
              Staff.findById(req.body.manager, (err, manager) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  // console.log(manager);
                  console.log(obj._id);
                  if (manager !== null) {
                    // let newManager = Object.assign({}, manager._doc);
                    manager.directReports = [
                      ...manager.directReports,
                      obj._id
                    ];
                    // Staff.findOneAndUpdate(
                    // Staff.findById(
                      // req.body.manager,
                      
                      // newManager,
                      // (err, manager) => {
                        // if (err) {
                          // res.status(500).json(err);
                        // } else {
                          
                          manager.save(
                            err => {
                              if (err) {
                                res.status(500).json(err);
                              } else {
                                Staff.findById(req.body.manager, (err, staff) => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      console.log("updated new manager's d.r. info.");
                                      console.log(staff);
                                      
                                      Staff.find((err, staff) => {
                                        if (err) {
                                          res.status(500).json(err);
                                        } else {
                                          res.status(200).json({ staff });
                                        }
                                      });
                                    }
                                });
                              }
                          }
                          );
                          
                        // }
                      // }
                    // );
                  }
                }
              });
            }
          }
        }
      }
    }
  );
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







