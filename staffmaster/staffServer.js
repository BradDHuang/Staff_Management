
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const fs = require("fs");
// const multer = require("multer");

const port = 8081;

const Staff = require("./staff");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());



mongoose.connect("mongodb://staffmaster:password123@ds237832.mlab.com:37832/staffmaster");

// var upload = multer({ dest: "./uploads/",
//   rename:  (fieldname, filename) => {
//     return filename;
//   },
// });

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
    // console.log(req.files);
    console.log((req.body.manager === ""));
    // let newM = new Staff();
    // newM.fullName = req.body.fullName;
    // newM.title = req.body.title;
    // newM.sex = req.body.sex;
    // newM.manager = req.body.manager;
    // newM.officePhone = req.body.officePhone;
    // newM.cellPhone = req.body.cellPhone;
    
    // newM.image.data = fs.readFileSync(req.files.userPhoto.path);
    // newM.image.contentType = "image/jpg";
    
    if (!req.body.manager) {
    Staff.create(req.body, (err, staff) => {
    // newM.save(err => {
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
    } else {
      // newBody.image.data = fs.readFileSync(req.files.userPhoto.path);
      // newBody.image.contentType = "image/jpg";
      // update the manager's d.r.s
      // Staff.create(req.body, (err, staff) => {
      Staff.create(req.body, (err, staff) => {
      // newM.save(err => {
        if (err) {
          res.status(500).json(err);
        } else {
          Staff.findById(req.body.manager, (err, manager) => {
            if (err) {
              res.status(500).json(err);
            } else {
              console.log(staff._id);
              manager.directReports = [
                ...manager.directReports,
                staff._id
              ];
              console.log(manager.directReports);
              manager.save(err => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  console.log("updated the manager's d.r.s");
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
            
          });
        }
      });
    }
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
        
          // https://stackoverflow.com/questions/32397419/model-findone-not-returning-docs-but-returning-a-wrapper-object
          let obj = staff._doc; // .toObject()
          // console.log(typeof(staff)); // object
          console.log(obj.manager);
          console.log((req.body.manager === ""));
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
                  });
                              
                }
              }
            );
          } else {
            // manager changed: A / null -> B / null
            // delete prev manager (A)
            console.log(staff.manager);
            if (staff.manager !== "") {
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
                    
                          manager.save(
                          // newManager.save(
                            err => {
                              if (err) {
                                res.status(500).json(err);
                              } else {
                                Staff.findById(obj.manager, (err, m) => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      console.log("updated manager info.");
                                      console.log(m.fullName);
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
                        
                  }
                }
              });
            }

            // update new manager's (B's) directReports
            // console.log(req.body.manager);
            if (req.body.manager !== "") {
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
                    console.log(manager.directReports);
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
                                // Staff.findById(req.body.manager, (err, staff) => {
                                //     if (err) {
                                //       res.status(500).json(err);
                                //     } else {
                                      console.log("updated new manager's d.r. info.");
                                //       console.log(staff.fullName);
                                      
                                      Staff.find((err, staff) => {
                                        if (err) {
                                          res.status(500).json(err);
                                        } else {
                                          res.status(200).json({ staff });
                                          // Can't set headers after they are sent.
                                        }
                                      });
                                //     }
                                // });
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
    // Staff.findById(req.params.id)
    //     .then(member => member
    //         .remove()
    //         .then(() => res.status(200).json({ success: true })))
    //     .catch(err => res.status(500).json(err));
    Staff.findById(req.params.id, (err, staff) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (staff !== null) {
          let obj = staff._doc;
          console.log(obj);
          console.log((obj.manager === ""));
          
          // the staff has a manager?
          // if yes, and the staff is to be deleted, then the manager's info should be updated.
          if (obj.manager !== "") {
            Staff.findById(obj.manager, (err, manager) => {
              if (err) {
                res.status(500).json(err);
              } else {
                if (manager !== null) {
                  let index = manager.directReports
                    .indexOf(req.params.id);
                  manager.directReports = [
                    ...manager.directReports.slice(0, index),
                    ...manager.directReports.slice(index + 1, manager.directReports.length)
                  ];
                  manager.save(
                    err => {
                      if (err) {
                        res.status(500).json(err);
                      } else {
                        Staff.findById(obj.manager, (err, m) => {
                            if (err) {
                              res.status(500).json(err);
                            } else {
                              console.log("after deleting, updated obj's manager's d.r.s info.");
                              console.log(m);
                              
                            }
                        });
                      }
                    }
                  );
                  Staff.findById(obj.manager, (err, manager) => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      // if the staff has directReports.
                      if (obj.directReports.length > 0) {
                        obj.directReports.forEach(dr => {
                          console.log(dr);
                          Staff.findById(dr, (err, staff) => {
                            if (err) {
                              res.status(500).json(err);
                            } else {
                              if (staff !== null) {
                                // change the staff's d.r.s's manager
                                staff.manager = obj.manager;
                                staff.save(
                                  err => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      Staff.findById(dr, (err, staff) => {
                                          if (err) {
                                            res.status(500).json(err);
                                          } else {
                                            console.log("change the staff's d.r.s's manager");
                                            console.log(staff.manager);
                                            
                                          }
                                      });
                                    }
                                  }  
                                );
                                Staff.findById(dr, (err, staff) => {
                                  if (err) {
                                    res.status(500).json(err);
                                  } 
                                  
                                });
                              }
                            }
                          });
                        });
                        Staff.findById(obj.manager, (err, manager) => {
                          if (err) {
                            res.status(500).json(err);
                          } else {
                            if (manager !== null) {
                              // update the obj's manager's d.r.s
                              manager.directReports = [
                                ...manager.directReports,
                                ...obj.directReports
                              ];
                              manager.save(
                                err => {
                                  if (err) {
                                    res.status(500).json(err);
                                  } else {
                                    Staff.findById(obj.manager, (err, m) => {
                                        if (err) {
                                          res.status(500).json(err);
                                        } else {
                                          console.log("update the obj's manager's d.r.s");
                                          console.log(m.directReports);
                                          
                                        }
                                    });
                                  }
                                } 
                              );
                              Staff.findById(obj.manager, (err, manager) => {
                                if (err) {
                                  res.status(500).json(err);
                                } else {
                                  // Staff.remove(
                                  Staff.deleteOne(
                                    {_id: req.params.id}, err => {
                                      if (err) {
                                        res.status(500).json(err);
                                      } else {
                                        console.log("Deleted a staff.");
                                        Staff.find((err, staff) => {
                                          if (err) {
                                            res.status(500).json(err);
                                          } else {
                                            res.status(200).json({ staff });
                                          }
                                        });
                                      }
                                    }
                                  );
                                }
                              });
                            } else {
                              // Staff.remove(
                              Staff.deleteOne(
                                {_id: req.params.id}, err => {
                                  if (err) {
                                    res.status(500).json(err);
                                  } else {
                                    console.log("Deleted a staff.");
                                    Staff.find((err, staff) => {
                                      if (err) {
                                        res.status(500).json(err);
                                      } else {
                                        res.status(200).json({ staff });
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        });
                      } else {
                        // Staff.remove(
                        Staff.deleteOne(
                          {_id: req.params.id}, err => {
                            if (err) {
                              res.status(500).json(err);
                            } else {
                              console.log("Deleted a staff.");
                              Staff.find((err, staff) => {
                                if (err) {
                                  res.status(500).json(err);
                                } else {
                                  res.status(200).json({ staff });
                                }
                              });
                            }
                          }
                        );
                      }
                    }
                  });
                }
              }
            });
          } else {
            // Staff.remove(
            Staff.deleteOne(
              {_id: req.params.id}, err => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  console.log("Deleted a staff.");
                  Staff.find((err, staff) => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      res.status(200).json({ staff });
                    }
                  });
                }
              }
            );
            
          }
        } 
        // else {
          
        // }
      }
    });
});

app.listen(port, () => {
    console.log(`The staffmaster server has started on port ${port}...`);
});







