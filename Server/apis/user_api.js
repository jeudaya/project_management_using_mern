var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var From = 'frommailid';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'frommailid',
        pass: ''
    }
});

exports.userCRUD = userCRUD;

function userCRUD(app, router, userModel) {

    router.get('/getusers', function(req, res) {
        userModel.find({ isAdmin: { $ne: true } }, { password: 0 }).sort({ addedDate: -1 }).exec(function(err, data) {
            res.json({ success: true, data: data })
        });
    })

    router.get('/getusers/:id', function(req, res) {
        userModel.findById(req.params.id, { password: 0 }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data })
            }

        })
    })

    router.put('/updateuser/:id', function(req, res) {
        var user = {};
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.firstname) {
            user.firstname = req.body.firstname
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname
        }
        userModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.id) }, { $set: user }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data, msg: "User Updated Succesfully" })
            }
        })
    })




    router.delete('/removeuser/:id', function(req, res) {
        userModel.remove({ '_id': mongoose.Types.ObjectId(req.params.id) }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data, msg: "User Deleted Succesfully" })
            }

        })
    })

    router.post('/adduser', function(req, res) {
        var user = new userModel();
        user.password = req.body.password;
        user.email = req.body.email;
        user.lastname = req.body.lastname;
        user.firstname = req.body.firstname;
        user.addedDate = new Date();
        user.save(function(err, data) {
            if (err) {
                res.json({ success: false, msg: "Error in User Creation", data: err })
            } else {
               /* if (req.body.sendPassword) {
                    var mailOptions = {
                        from: From,
                        to: data.email,
                        subject: 'Project Tracking Management - Please Check Your Password',
                        html: '<p>User Name: <b>' + data.email + '</b> <hr/> Password:+'
                        data.password + ' <b></b> <hr/></p>'
                    }
                    transporter.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log("error" + JSON.stringify(error))
                            console.log("mail Not send Some Error Occursc" + JSON.stringify(error));
                        } else {
                            console.log('Mail Send Successfully');
                        }
                    });
                }*/
                res.json({ success: true, data: data, msg: "User Created Succesfully" })
            }
        })


    })



    router.post('/loginuser', function(req, res) {

        userModel.findOne({ email: req.body.email, password: req.body.password }, { password: 0 }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "Error in Log in " })
            } else {
                if (data) {
                    res.json({ success: true, data: data, msg: "User Logged in Succesfully" })
                } else {
                    res.json({ success: false, msg: "Error in Log in " })
                }

            }
        })


    })















}
