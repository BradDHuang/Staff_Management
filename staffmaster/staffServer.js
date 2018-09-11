
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
    console.log(`With manager? ${(req.body.manager !== "")}`);
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
        console.log("created a new staff member Without manager.");
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
          console.log("created a new staff member With manager.");
          Staff.findById(req.body.manager, (err, manager) => {
            if (err) {
              res.status(500).json(err);
            } else {
              console.log(`add d.r. with id (${staff._id}) to ${manager.fullName}'s directReports.`);
              manager.directReports = [
                ...manager.directReports,
                staff._id
              ];
              console.log(`the directReports now is [${manager.directReports}].`);
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
            console.log(`GET the details of "${staff.fullName}".`);
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
    
  console.log(`Editing the member with id: ${req.params.id}.`);
  
  Staff.findById(
    req.params.id,
    (err, staff) => {
      if (err) {
        res.status(500).json(err);
      } else {
        
        if (staff != null) {
          console.log(`the member's fullName with the id is "${staff.fullName}".`);
        
          // https://stackoverflow.com/questions/32397419/model-findone-not-returning-docs-but-returning-a-wrapper-object
          let obj = staff._doc; // .toObject()
          // console.log(typeof(staff)); // object
          console.log(`the (former) manager is "None"? ${(obj.manager === "")}`);
          console.log(`the (new) manager is "None"? ${(req.body.manager === "")}`);
          console.log(`the (former) manager's id is ${obj.manager}.`);
          console.log(`the (new) manager's id is ${req.body.manager}.`);
          
          if (obj.manager === req.body.manager) {
            
            console.log("The manager doesn't change: A -> A, or none -> none.");
            
            staff.fullName = req.body.fullName;
            staff.title = req.body.title;
            staff.sex = req.body.sex;
            staff.officePhone = req.body.officePhone;
            staff.cellPhone = req.body.cellPhone;
            staff.email = req.body.email;
            staff.manager = req.body.manager;
            staff.directReports = req.body.directReports;
            // console.log(staff);
            staff.save(err => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  
                  Staff.findById(req.params.id, (err, staff) => {
                      if (err) {
                        res.status(500).json(err);
                      } else {
                        console.log(`edited the info of "${staff.fullName}".`);
                        // console.log(staff);
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
                 
          } else {
            
            console.log("manager changed: A / none -> B, or A -> none.");
            
            console.log(`the staff's (former) manager is "None"? ${(obj.manager === "")}`);
            if (obj.manager !== "") {
              console.log(`the staff's (former) manager's id is ${obj.manager}.`);
              Staff.findById(obj.manager, (err, manager) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  console.log(`deleting the directReport of ${obj.fullName}'s prev manager: ${manager.fullName}.`);
                  if (manager !== null) {
                    console.log(`${manager.fullName}'s (former) directReports is: ${manager.directReports}.`);
                    
                    manager.directReports = manager.directReports.filter(
                      m => m !== req.params.id
                    );
                    console.log(`${manager.fullName}'s (new) directReports is: ${manager.directReports}.`);
                    
                      manager.save(
                        err => {
                          if (err) {
                            res.status(500).json(err);
                          } else {
                            Staff.findById(obj.manager, (err, m) => {
                              if (err) {
                                res.status(500).json(err);
                              } else {
                                console.log(`updated the directReports of (former) manager: ${m.fullName}.`);
                                
                                Staff.findById(
                                  req.params.id,
                                  (err, obj) => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      obj.fullName = req.body.fullName;
                                      obj.title = req.body.title;
                                      obj.sex = req.body.sex;
                                      obj.officePhone = req.body.officePhone;
                                      obj.cellPhone = req.body.cellPhone;
                                      obj.email = req.body.email;
                                      obj.manager = req.body.manager;
                                      obj.directReports = req.body.directReports;
                                      
                                      obj.save(err => {
                                        if (err) {
                                          res.status(500).json(err);
                                        } else {
                                          
                                          Staff.findById(req.params.id, (err, staff) => {
                                              if (err) {
                                                res.status(500).json(err);
                                              } else {
                                                console.log(`edited the info of "${staff.fullName}".`);
                                                // console.log(staff);
                                                
                                              }
                                          });
                                        }
                                      });
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
            console.log(`the staff's (new) manager is "None"? ${(req.body.manager === "")}`);
            if (req.body.manager !== "") {
              console.log(`the staff's (new) manager's id is ${req.body.manager}.`);
              Staff.findById(req.body.manager, (err, manager) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  console.log(`updating the directReports of ${obj.fullName}'s new manager: ${manager.fullName}.`);
                  console.log(`this id (${obj._id}) is to be added to the directReports.`);
                  if (manager !== null) {
                    console.log(`${manager.fullName}'s (former) directReports is: ${manager.directReports}.`);
                    manager.directReports = [
                      ...manager.directReports,
                      obj._id
                    ];
                    console.log(`${manager.fullName}'s (new) directReports is: ${manager.directReports}.`);
                    
                      manager.save(
                        err => {
                          if (err) {
                            res.status(500).json(err);
                          } else {
                            Staff.findById(req.body.manager, (err, m) => {
                                if (err) {
                                  res.status(500).json(err);
                                } else {
                                  
                                  console.log(`updated the directReports of (new) manager: ${m.fullName}.`);
                                  
                                  Staff.findById(
                                    req.params.id,
                                    (err, obj) => {
                                      if (err) {
                                        res.status(500).json(err);
                                      } else {
                                        obj.fullName = req.body.fullName;
                                        obj.title = req.body.title;
                                        obj.sex = req.body.sex;
                                        obj.officePhone = req.body.officePhone;
                                        obj.cellPhone = req.body.cellPhone;
                                        obj.email = req.body.email;
                                        obj.manager = req.body.manager;
                                        obj.directReports = req.body.directReports;
                                        
                                        obj.save(err => {
                                          if (err) {
                                            res.status(500).json(err);
                                          } else {
                                            
                                            Staff.findById(req.params.id, (err, staff) => {
                                                if (err) {
                                                  res.status(500).json(err);
                                                } else {
                                                  console.log(`edited the info of "${staff.fullName}".`);
                                                  console.log("******");
                                                  console.log("manager changed: A / none -> B.");
                                                  console.log("******");
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
                          }
                        }
                      );
                         
                  }
                }
              });
            } else {
              setTimeout(() => { 
                console.log("******");
                console.log("manager changed: A -> none.");
                console.log("******");
                Staff.find((err, staff) => {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    res.status(200).json({ staff });
                  }
                });
              }, 500);
              
            }
            
          }
        }
      }
    }
  );
});

app.delete("/api/staff/:id", (req, res) => {
    
    Staff.findById(req.params.id, (err, staff) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (staff !== null) {
          console.log(`Deleting the member: ${staff.fullName}.`);
          let obj = staff._doc;
          // console.log(obj);
          console.log(`the member has a manager? ${(obj.manager !== "")}`);
          
          // the staff has a manager?
          // if yes, and the staff is to be deleted, then the manager's info should be updated.
          if (obj.manager !== "") {
            Staff.findById(obj.manager, (err, manager) => {
              if (err) {
                res.status(500).json(err);
              } else {
                if (manager !== null) {
                  console.log(`the manager is: ${manager.fullName}.`);
                  let index = manager.directReports.indexOf(req.params.id);
                  console.log(`the (former) directReports of ${manager.fullName} is [${manager.directReports}].`);
                  console.log(`the directReport with id (${req.params.id}) is to be removed.`);
                  manager.directReports = [
                    ...manager.directReports.slice(0, index),
                    ...manager.directReports.slice(index + 1, manager.directReports.length)
                  ];
                  console.log(`the (new) directReports of ${manager.fullName} is [${manager.directReports}].`);
                  manager.save(
                    err => {
                      if (err) {
                        res.status(500).json(err);
                      } else {
                        Staff.findById(obj.manager, (err, m) => {
                            if (err) {
                              res.status(500).json(err);
                            } else {
                              console.log(`after deleting, updated the directReports info of the manager: ${m.fullName}.`);
                              // console.log(m);
                              
                              console.log(`How many directReports does ${obj.fullName} has? ${obj.directReports.length}.`);
                              if (obj.directReports.length > 0) {
                                obj.directReports.forEach(dr => {
                                  console.log(`for directReport with id: ${dr}.`);
                                  Staff.findById(dr, (err, staff) => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      if (staff !== null) {
                                        console.log(`assign ${obj.fullName}'s manager with id (${obj.manager}) to ${staff.fullName}.`);
                                        staff.manager = obj.manager;
                                        staff.save(
                                          err => {
                                            if (err) {
                                              res.status(500).json(err);
                                            } else {
                                              Staff.findById(dr, (err, m) => {
                                                  if (err) {
                                                    res.status(500).json(err);
                                                  } else {
                                                    console.log(`changed ${m.fullName}'s manager to ${staff.manager}.`);
                                                    // console.log(staff.manager);
                                                    
                                                  }
                                              });
                                            }
                                          }  
                                        );
                                        
                                      }
                                    }
                                  });
                                });
                                // update the obj's manager's d.r.s
                                
                                setTimeout(() => {
                                
                                Staff.findById(obj.manager, (err, manager) => {
                                  if (err) {
                                    res.status(500).json(err);
                                  } else {
                                    if (manager !== null) {
                                      console.log(`the (former) d.r.s of ${manager.fullName} is [${manager.directReports}].`);
                                      console.log(`the d.r.s to be added: ${obj.directReports}.`);
                                      manager.directReports = [
                                        ...manager.directReports,
                                        ...obj.directReports
                                      ];
                                      console.log(`the (new) d.r.s of ${manager.fullName} is [${manager.directReports}].`);
                                      manager.save(
                                        err => {
                                          if (err) {
                                            res.status(500).json(err);
                                          } else {
                                            Staff.findById(obj.manager, (err, m) => {
                                                if (err) {
                                                  res.status(500).json(err);
                                                } else {
                                                  console.log(`updated ${m.fullName}'s d.r.s.`);
                                                  console.log(`there are ${m.directReports.length} of them.`);
                                                  
                                                  Staff.deleteOne(
                                                    {_id: req.params.id}, err => {
                                                      if (err) {
                                                        res.status(500).json(err);
                                                      } else {
                                                        console.log("Deleted a staff:");
                                                        console.log("******Has manager & Has directReports******");
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
                                          }
                                        } 
                                      );
                                      
                                    } 
                                  }
                                });
                                
                                }, 1000);
                                
                              } else {
                                console.log("***the staff to be deleted has NO directReports***");
                                
                                Staff.deleteOne(
                                  {_id: req.params.id}, err => {
                                    if (err) {
                                      res.status(500).json(err);
                                    } else {
                                      console.log("Deleted a staff:");
                                      console.log("******Has manager & No directReports******");
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
                  );
                  
                }
              }
            });
          } else {
            console.log(`***the member has NO manager***`);
            
            console.log(`How many directReports does the staff has? ${obj.directReports.length}.`);
            if (obj.directReports.length === 0) {
              Staff.deleteOne(
                {_id: req.params.id}, err => {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    console.log("Deleted a staff:");
                    console.log("******No manager & No directReports******");
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
            } else {
              console.log("***the staff to be deleted has directReports***");
              
              obj.directReports.forEach(dr => {
                console.log(`for d.r. with id: ${dr}.`);
                Staff.findById(dr, (err, staff) => {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    if (staff !== null) {
                      console.log(`assign "None" as manager to ${staff.fullName}.`);
                      staff.manager = "";
                      staff.save(
                        err => {
                          if (err) {
                            res.status(500).json(err);
                          } else {
                            Staff.findById(dr, (err, m) => {
                                if (err) {
                                  res.status(500).json(err);
                                } else {
                                  console.log(`changed ${m.fullName}'s manager to "None".`);
                                  // console.log(staff.manager);
                                  
                                }
                            });
                          }
                        }  
                      );
                      
                    }
                  }
                });
              });
              
              setTimeout(() => {
                
                Staff.deleteOne(
                  {_id: req.params.id}, err => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      console.log("Deleted a staff:");
                      console.log("******No manager & Has directReports******");
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
                
              }, 1000);
              
            }
          }
        } 
        
      }
    });
});

app.listen(port, () => {
    console.log(`The staffmaster server has started on port ${port}...`);
});







