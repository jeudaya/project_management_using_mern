import React, { Component } from 'react';
 import axios from 'axios';
 import {connect} from  'react-redux'
import {fetchUser,deleteUser,openModal,closeModal,editOpenModal,updateUser,addUser} from  '../actions/useraction.js'
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
class Users extends Component {

  openNewUserModal() {
    var modalBody={ modalIsOpen: true, modalTitle: "Add User",user:{}};
    this.props.dispatch(openModal(modalBody));
  }
  closeModal() {  
   var modalBody={ modalIsOpen: false};
   this.props.dispatch(closeModal(modalBody)); 
  }
  
  editCreate(){    
    switch(this.props.users.modalTitle){
      case "Add User":
      this.createUser()
      break;
      case "Edit User":
      this.editUserValue()
      break;
     

    }
  }


 createUser() {
     console.log("createUser");
   
      var addUserData={};

   function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

   addUserData.firstname=this.refs.firstname.value;
   addUserData.lastname=this.refs.lastname.value;
   addUserData.email=this.refs.email.value;  
   addUserData.password=makeid();
   addUserData.sendPassword=true;
   console.log("Passing New User to Reducer",addUserData)

   this.props.dispatch(addUser(addUserData));
      
    

  }





  editUserValue(){
console.log("editUserValue",JSON.stringify(this.props));
   var editedUserData={};
   editedUserData._id=this.props.users.user._id;
   editedUserData.firstname=this.refs.firstname.value;
   editedUserData.lastname=this.refs.lastname.value;
   editedUserData.email=this.refs.email.value;  
   this.props.dispatch(updateUser(editedUserData));
 
    
  }







 componentWillMount()
 {
    this.props.dispatch(fetchUser());
    // console.log("this.props",this.props);
 }

 editUser(item,index)
 {
     console.log("editUser")
   var modalBody={ modalIsOpen: true, modalTitle: "Edit User",user:item,index:index};
    this.props.dispatch(editOpenModal(modalBody));

 }

 afterOpenModal() {
    if(Object.keys(this.props.users.user).length !== 0){
        this.refs.firstname.value=this.props.users.user.firstname;
        this.refs.lastname.value=this.props.users.user.lastname;
        this.refs.email.value=this.props.users.user.email;        
      }
  }

 deleteUser(id,index){
  this.props.dispatch(deleteUser(id));

 }

  render() {
    return (
      <div>
   <button className="btn btn-primary" onClick={this.openNewUserModal.bind(this)}>Add User</button>
    <hr/>
    <Modal isOpen={this.props.users.modalIsOpen} contentLabel="Modal" style={customStyles}  onAfterOpen={this.afterOpenModal.bind(this)} >
               <h3>{this.props.users.modalTitle}</h3>
              <p><input type="text" ref="firstname"  placeholder="First Name" /></p>
              <p><input type="text"  ref="lastname" placeholder="Last Name" /></p>
              <p><input type="text" ref="email"  placeholder="email" /></p>
               <p><button className="btn btn-success" onClick={this.editCreate.bind(this)}>{this.props.users.modalTitle}</button>
                <button className="btn btn-success pull-right" onClick={this.closeModal.bind(this)}>close</button>
              </p>
        </Modal>
           <table className="table">
          <tbody>
            <tr>
              <th>SI.NO</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
        
{this.props.users.userdata.map(function (item, index) {

              return (

                <tr key={index} >
                  <td className="col-md-1">{index+1}</td>
                  <td className="col-md-3">{item.firstname}</td>
                  <td className="col-md-2">{item.lastname}</td>
                  <td className="col-md-2">{item.email}</td>
                  <td className="col-md-2">
                    <span onClick={this.editUser.bind(this, item,index)}><i className="btn glyphicon glyphicon-pencil"></i></span>
                    <span onClick={this.deleteUser.bind(this, item._id, index)}><i className="btn glyphicon glyphicon-trash"></i></span>
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
    users:state.user,
    loggeduser:state.auth.data
  }
}

export default connect(mapStateToProps)(Users);