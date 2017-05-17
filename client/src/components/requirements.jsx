import React, { Component } from 'react';
 import {connect} from  'react-redux';
 import {addRequirement,fetchRequirements,closeModal,openModal,updateRequirement,editOpenModal,deleteRequirement}from  '../actions/requirementaction.js'
import {fetchProjects} from  '../actions/projectaction.js'
import {fetchUser} from  '../actions/useraction.js'
import Modal from 'react-modal';
 var selectedUserData,selectedProjectData,selectedReqStatus;
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
// value={this.props.value.projects.project}
class Requirements extends Component {

	 componentWillMount()
 {
    this.props.dispatch(fetchRequirements());
    this.props.dispatch(fetchProjects());
    this.props.dispatch(fetchUser());
 }
	  editCreate(){    
    switch(this.props.projects.modalTitle){
      case "Add Requirement":
      this.createRequirement()
      break;
      case "Edit Requirement":
      this.editRequirementValue()
      break;    
    }
  }


 afterOpenModal() {
    if(Object.keys(this.props.requirements.requirement).length !== 0){
        this.refs.requirementname.value=this.props.requirements.requirement.requirement;
        // this.refs.projectdesc.value=this.props.projects.project.project_description;
        this.refs.selectedUser.value=this.props.requirements.requirement.userData._id;
        this.refs.selectedProject.value=this.props.requirements.requirement.projectData._id;
        this.refs.req_status.value=this.props.requirements.requirement.status;
        console.log("requirements",JSON.stringify(this.props.requirements.requirement,null,2))
            
      }
  }
   createRequirement() {
      var addRequirementData={};
   addRequirementData.requirement=this.refs.requirementname.value;  
   addRequirementData.user=selectedUserData;
   addRequirementData.project=selectedProjectData;
   this.props.dispatch(addRequirement(addRequirementData));   
  }

  editRequirementValue(){
   var editedRequirementData={};
   editedRequirementData._id=this.props.requirements.requirement._id;
   editedRequirementData.requirement=this.refs.requirementname.value;
   editedRequirementData.user=selectedUserData;
   editedRequirementData.project=selectedProjectData;
   editedRequirementData.status=selectedReqStatus;
   this.props.dispatch(updateRequirement(editedRequirementData));    
  }
	closeModal()
	{
var modalBody={ modalIsOpen: false};
   this.props.dispatch(closeModal(modalBody)); 
	}
	
	  deleteRequirement(id,index){
  this.props.dispatch(deleteRequirement(id));

 }


  editRequirement(item,index)
 {
   var modalBody={ modalIsOpen: true, modalTitle: "Edit Requirement",requirement:item};
    this.props.dispatch(editOpenModal(modalBody));

 }

  openNewRequirementModal(){
    var modalBody={ modalIsOpen: true, modalTitle: "Add Requirement",requirement:{}};
    this.props.dispatch(openModal(modalBody));
}
selectedUser(event)
{  console.log("selectedUser",selectedUserData)
  selectedUserData=event.target.value;
}
selectedProject(event)
{	

  selectedProjectData=event.target.value;

}

 updateStatus(event){
   selectedReqStatus=event.target.value;  
}


  render() {
    return (
      <div>               
        <button className="btn btn-primary" onClick={this.openNewRequirementModal.bind(this)}>Add Requirement</button>

          <hr/>
        <Modal isOpen={this.props.requirements.modalIsOpen} contentLabel="Modal" style={customStyles}  onAfterOpen={this.afterOpenModal.bind(this)}>
          <h3>{this.props.requirements.modalTitle}</h3>
          <p><input type="text" className="form-control" ref="requirementname"  placeholder="Requirement Name" /></p>
          <p>


         

             
       <select  ref="selectedProject"   className="form-control"  onChange={this.selectedProject.bind(this)}>

    {this.props.projects.projectdata.map(function (item, index) {
        return (

                <option key={index} value={item._id}>{item.project_name}</option>
              )
            }, this)
            }
            </select>
</p>
<p>

             <select   className="form-control" ref="selectedUser" onChange={this.selectedUser.bind(this)}>

    {this.props.users.userdata.map(function (item, index) {

              return (

                <option key={index} value={item._id}> {item.firstname} {item.lastname} </option>
              )
            }, this)
            }
            </select>

         </p>
           
   <p>
    <select  className="form-control" ref="req_status"  onChange={e => this.updateStatus(e)}>
                          <option>NEW</option>
                           <option>INPROGRESS</option>
                            <option>PENDING</option>
                            <option>COMPLETED</option>
                            
                        </select>
   </p>
          
          <p><button className="btn btn-success" onClick={this.editCreate.bind(this)}>{this.props.requirements.modalTitle}</button>
           &nbsp; <button className="btn btn-success pull-right" onClick={this.closeModal.bind(this)}>close</button>
          </p>
        </Modal>
              
       <table className="table">
          <tbody>
            <tr>
              <th>id</th>
              <th>Requirement</th>
              <th>Project</th>
               <th>User</th>
               <th>Status</th>
               <th>Actions</th>
             
            </tr>


              {this.props.requirements.requirementdata.map(function (item, index) {

              return (

                <tr key={index} >
                  <td className="col-md-1">{index+1}</td>
                  <td className="col-md-2">{item.requirement}</td>
                  <td className="col-md-2">{item.projectData.project_name}</td>
                   <td className="col-md-3">{item.userData.firstname} {item.userData.lastname}</td>
               <td className="col-md-2">{item.status}</td>
                  <td className="col-md-2">
                    <span onClick={this.editRequirement.bind(this, item,index)}><i className="btn glyphicon glyphicon-pencil"></i></span>
                    <span onClick={this.deleteRequirement.bind(this, item._id, index)}><i className="btn glyphicon glyphicon-trash"></i></span>
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
    requirements:state.requirement,
    projects:state.project,
     users:state.user,
  }
}

export default connect(mapStateToProps)(Requirements);