var mongoose = require('mongoose');
exports.projectCRUD = projectCRUD;

function projectCRUD(app, router, projectModel) {

   
    router.get('/getprojects', function(req, res) {
        projectModel.find({}).sort({addedDate : -1 }).exec(function(err, data) {
            res.json({ success: true, data: data })
        });
    });

    router.post('/addproject', function(req, res) {  
        var project = new projectModel();     
        project.project_name = req.body.project_name;
        project.project_description = req.body.project_description;
        project.addedDate = new Date();
        project.save(function(err, data) {
            if (err) {
                res.json({ success: false, msg: "Error in Project Creation"+err })
            } else {
                res.json({ success: true, msg: "Project Created Succesfully",data:data })
            }
        });
    });



  router.put('/updateproject/:id', function(req, res) {
     var updateData={};
      if(req.body.project_name)
      {
        updateData.project_name=req.body.project_name;
      }
      if(req.body.project_description)
      {
        updateData.project_description=req.body.project_description
      }
        projectModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.id) }, { $set: updateData}, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Project with this id" })
            } else {
                res.json({ success: true, data: data, msg: "Project Updated Succesfully" })
            }
        })
    })


  router.get('/getproject/:id', function(req, res) {
        projectModel.findById(req.params.id, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Project with this id" })
            } else {
                res.json({ success: true, data: data })
            }

        })
    });


   router.delete('/removeproject/:id', function(req, res) {
        projectModel.remove({ '_id': mongoose.Types.ObjectId(req.params.id) }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No Project with this id" })
            } else {
                res.json({ success: true, data: data, msg: "Project Deleted Succesfully" })
            }

        })
    })

}
