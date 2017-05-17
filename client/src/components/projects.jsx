import React, { Component } from 'react';
 import {connect} from  'react-redux'
import {addProject,fetchProjects,closeModal,openModal,updateProject,editOpenModal,deleteProject} from  '../actions/projectaction.js'
import Modal from 'react-modal';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
        border                     : '1px solid #ccc',
    padding                    : '20px'
  }
};


class Projects extends Component {

 componentWillMount()
 {
    this.props.dispatch(fetchProjects());

 }

  editCreate(){    
    switch(this.props.projects.modalTitle){
      case "Add Project":
      this.createProject()
      break;
      case "Edit Project":
      this.editProjectValue()
      break;
     

    }
  }

  openNewProjectModal(){
    var modalBody={ modalIsOpen: true, modalTitle: "Add Project",project:{}};
    this.props.dispatch(openModal(modalBody));
}


 afterOpenModal() {
    if(Object.keys(this.props.projects.project).length !== 0){
        this.refs.projectname.value=this.props.projects.project.project_name;
        this.refs.projectdesc.value=this.props.projects.project.project_description;
            
      }
  }

 closeModal() {  
   var modalBody={ modalIsOpen: false};
   this.props.dispatch(closeModal(modalBody)); 
  }

 createProject() {

      var addProjectData={};
   addProjectData.project_name=this.refs.projectname.value;
   addProjectData.project_description=this.refs.projectdesc.value;
 
   this.props.dispatch(addProject(addProjectData));
       
  }



  editProjectValue(){

   var editedProjectData={};
   editedProjectData._id=this.props.projects.project._id;
   editedProjectData.project_name=this.refs.projectname.value;
   editedProjectData.project_description=this.refs.projectdesc.value;
   this.props.dispatch(updateProject(editedProjectData));
 
    
  }

   deleteProject(id,index){
  this.props.dispatch(deleteProject(id));

 }



 editProject(item,index)
 {
   var modalBody={ modalIsOpen: true, modalTitle: "Edit Project",project:item};
    this.props.dispatch(editOpenModal(modalBody));

 }



  render() {
    return (
      <div>
         <button className="btn btn-primary" onClick={this.openNewProjectModal.bind(this)}>Add Project</button>

 <hr/>
        <Modal isOpen={this.props.projects.modalIsOpen} contentLabel="Modal" style={customStyles}  onAfterOpen={this.afterOpenModal.bind(this)}>
          <h3>{this.props.projects.modalTitle}</h3>
          <p><input type="text" ref="projectname"  className="form-control" placeholder="Project name" /></p>
          <p><textarea className="form-control" ref="projectdesc" placeholder="Project Description" /></p>
         
          <p><button className="btn btn-success" onClick={this.editCreate.bind(this)}>{this.props.projects.modalTitle}</button>
            <button className="btn btn-success pull-right" onClick={this.closeModal.bind(this)}>close</button>
          </p>
        </Modal>



<table className="table">
          <tbody>
            <tr>
              <th>id</th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Action</th>
             
            </tr>


            {this.props.projects.projectdata.map(function (item, index) {

              return (

                <tr key={index} >
                  <td className="col-md-1">{index+1}</td>
                  <td className="col-md-3">{item.project_name}</td>
                  <td className="col-md-3">{item.project_description}</td>
               
                  <td className="col-md-2">
                    <span onClick={this.editProject.bind(this, item,index)}><i className="btn glyphicon glyphicon-pencil"></i></span>
                    <span onClick={this.deleteProject.bind(this, item._id, index)}><i className="btn glyphicon glyphicon-trash"></i></span>
                  </td>
                </tr>
              )
            }, this)
            }

          </tbody>
        </table>
      </div>
    );
  }
}


function mapStateToProps  (state){
  return{
    projects:state.project,

  }
}

export default connect(mapStateToProps)(Projects);
