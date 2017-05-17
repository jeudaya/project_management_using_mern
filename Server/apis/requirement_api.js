var mongoose = require('mongoose');

exports.requirementCRUD = requirementCRUD;

function requirementCRUD(app, router, requirementModel, userModel, io) {

    router.post('/addrequirement', function(req, res) {
        var requirement = new requirementModel();
        // console.log("body", JSON.stringify(req.body));
        requirement.requirement = req.body.requirement;
        requirement.project = req.body.project;
        requirement.user = req.body.user;
        requirement.addedDate = new Date();
        requirement.save(function(err, data) {
            if (err) {
                res.json({ success: false, msg: "Error in Requirement Creation" + err })
            } else {
                requirementModel.aggregate({
                    $lookup: {
                        from: 'project_data',
                        localField: 'project',
                        foreignField: '_id',
                        as: 'projectData'
                    }
                }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
                    $lookup: {
                        from: 'user_data',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userData'
                    }
                }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { '_id': data._id } }, function(err, requirmentdata) {
                    if (err) {
                        res.json({ success: false, msg: err })
                    } else {                     
                      
                              io.sockets.in(requirmentdata[0].userData.email).emit('notification_to_user', requirmentdata[0]);
                               res.json({ success: true, msg: "Requirement Created Succesfully", data: requirmentdata })
                        }
                })
            }
        });
    });


    router.get('/getrequirement', function(req, res) {
        requirementModel.aggregate({
            $lookup: {
                from: 'project_data',
                localField: 'project',
                foreignField: '_id',
                as: 'projectData'
            }
        }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: 'user_data',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: err })
            } else {
                res.json({ success: true, data: data })
            }
        })
    });

    router.put('/updaterequirement/:id', function(req, res) {
        var updateData = {};
        if (req.body.requirement) {
            updateData.requirement = req.body.requirement;
        }
        if (req.body.project) {
            updateData.project = req.body.project
        }
        if (req.body.user) {
            updateData.user = req.body.user
        }
        if (req.body.status) {
            updateData.status = req.body.status;
        }
        requirementModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.id) }, { $set: updateData }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Requirement with this id" })
            } else {

                requirementModel.aggregate({
                    $lookup: {
                        from: 'project_data',
                        localField: 'project',
                        foreignField: '_id',
                        as: 'projectData'
                    }
                }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
                    $lookup: {
                        from: 'user_data',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userData'
                    }
                }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { '_id': mongoose.Types.ObjectId(req.params.id) } }, function(err, requirmentdata) {
                    if (err) {
                        res.json({ success: false, msg: err })
                    } else {
                        res.json({ success: true, data: requirmentdata, msg: "Requirement Updated Succesfully" })
                    }
                })

            }
        })
    })
   

    router.get('/getrequirement/:id', function(req, res) {
        // requirementModel.findById(req.params.id, function(err, data) {
        //     if (err) {
        //         res.json({ success: false, msg: "No Requirement with this id" })
        //     } else {
        //         res.json({ success: true, data: data })
        //     }

        // })

        requirementModel.aggregate({
            $lookup: {
                from: 'project_data',
                localField: 'project',
                foreignField: '_id',
                as: 'projectData'
            }
        }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: 'user_data',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { "_id": mongoose.Types.ObjectId(req.params.id) } }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: err })
            } else {
                res.json({ success: true, data: data })
            }
        })
    });





    router.delete('/removerequirement/:id', function(req, res) {
        requirementModel.remove({ '_id': mongoose.Types.ObjectId(req.params.id) }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Requirement with this id" })
            } else {
                res.json({ success: true, data: data, msg: "Requirement Deleted Succesfully" })
            }

        })
    })



    router.get('/getuserrequirements/:id', function(req, res) {


        requirementModel.aggregate({
            $lookup: {
                from: 'project_data',
                localField: 'project',
                foreignField: '_id',
                as: 'projectData'
            }
        }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: 'user_data',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { "userData._id": mongoose.Types.ObjectId(req.params.id) } }, 
        {
            $group: {
                _id: "$projectData._id",
                projectname: { $first: "$projectData.project_name" },
                addedDate:{$first:"$projectData.addedDate"},
                requirment: { $push: { req_id: "$_id", name: "$requirement", status: "$status",comments:"$comments"} },
            }
        }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: err })
            } else {
                res.json({ success: true, data: data })
            }
        })
    });





 router.get('/getuserrequirements/:userid/:projectid', function(req, res) {


        requirementModel.aggregate({
            $lookup: {
                from: 'project_data',
                localField: 'project',
                foreignField: '_id',
                as: 'projectData'
            }
        }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: 'user_data',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { "userData._id": mongoose.Types.ObjectId(req.params.userid) } }, 
        {
            $group: {
                _id: "$projectData._id",
                projectname: { $first: "$projectData.project_name" },
                addedDate:{$first:"$projectData.addedDate"},
                requirment: { $push: { req_id: "$_id", name: "$requirement", status: "$status",comments:"$comments"} },
            }
        },{$match:{_id:mongoose.Types.ObjectId(req.params.projectid)}}, function(err, data) {
            if (err) {
                res.json({ success: false, msg: err })
            } else {
                res.json({ success: true, data: data })
            }
        })
    });



       router.put('/addcomment/:projectid/', function(req, res) {
       
        requirementModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.projectid) }, { $push: { comments: req.body.comment } }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Requirement with this id" })
            } else {
               

            }
        })
    })



    router.put('/updateuserrequirement/:id/:userid', function(req, res) {
        var updateData = {};
        if (req.body.requirement) {
            updateData.requirement = req.body.requirement;
        }
        if (req.body.project) {
            updateData.project = req.body.project
        }
        if (req.body.user) {
            updateData.user = req.body.user
        }
        if (req.body.status) {
            updateData.status = req.body.status;
        }
        requirementModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.id) }, { $set: updateData }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Requirement with this id" })
            } else {
                requirementModel.aggregate({
                    $lookup: {
                        from: 'project_data',
                        localField: 'project',
                        foreignField: '_id',
                        as: 'projectData'
                    }
                }, { $unwind: { path: "$projectData", preserveNullAndEmptyArrays: true } }, {
                    $lookup: {
                        from: 'user_data',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userData'
                    }
                }, { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } }, { $project: { "userData.password": 0, "userData.isAdmin": 0, "userData.addedDate": 0, "projectData.addedDate": 0, "projectData.__v": 0, "userData.__v": 0 } }, { $match: { "userData._id": mongoose.Types.ObjectId(req.params.userid) } }, {
                    $group: {
                        _id: "$projectData._id",
                        projectname: { $first: "$projectData.project_name" },
                        requirment: { $push: { req_id: "$_id", name: "$requirement", status: "$status" } },
                    }
                }, function(err, requserdata) {
                    if (err) {
                        res.json({ success: false, msg: err })
                    } else {
                        res.json({ success: true, data: requserdata, msg: "Requirement Updated Succesfully" })
                    }
                })

            }
        })
    })

    io.on('connection', function(socket) {
        // console.log("socket", socket.id)
        // socket.join('user_room_'+socket.id);
        console.log("user connected");

        socket.emit('socketid', { socketid: socket.id });
        socket.on('user_mail_id', function(data) {
            console.log("recived user mail", data)
            socket.join(data.mail_id);
            // var clients =  io.sockets.in('b@b.com');
            // console.log("socket",clients);
        });

        socket.on('disconnect', function() {
            io.emit('user disconnected');
        });
    });


}
