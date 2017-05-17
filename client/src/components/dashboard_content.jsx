import React, { Component } from 'react';
import {connect} from  'react-redux'
 import Header from '../components/header'
import {fetchUserRequirement,updateUserRequirement} from  '../actions/useraction.js'
 import {Route,browserHistory , Link} from 'react-router';


var UserData,localuserdata;
class DashboardContent extends Component {

constructor(){
  super()
}





componentWillMount(){

  
    (function checkAuth(){

    if(this.props.authdata.isAuth || localStorage.getItem('userdetails') ){
      localuserdata=JSON.parse(localStorage.getItem('userdetails'));
       UserData=localuserdata.firstname + " " + localuserdata.lastname;
      this.props.dispatch(fetchUserRequirement(localuserdata._id));
        console.log("Login")
    }
    else{
         browserHistory.push('/login');
         localStorage.removeItem('userdetails')
    }
  }).bind(this)()


  }

  updateStatus(id,event){
      console.log("req",id)
  console.log("event",event.target.value)
var editedRequirementData={};
   editedRequirementData._id=id;  
   editedRequirementData.status=event.target.value;

   this.props.dispatch(updateUserRequirement(editedRequirementData,localuserdata._id));  
  
}

  render() {
   
    return (  
      <div>
     <Header username={UserData}/>   

<table className="table table-bordered">


    <thead>
      <tr>
      <th>S.No</th>
        <th>Project Name</th>
        <th>Created date</th>
        <th>No. of Requirements</th>
        <th></th>
      </tr>
    </thead>

      {this.props.dashboard.userreq.map(function (item, index) {    
          var that=this;
      
            
  
        return (

          


 
    <tbody>
    
      <tr>
        <td className="col-md-1">{index+1}</td>
        <td className="col-md-3">{item.projectname}</td>
        <td className="col-md-2">
      {(new Date(item.addedDate)).toString()}
      </td>
        
         <td className="col-md-2"><span className="badge">{item.requirment.length}</span></td>
         <td className="col-md-2">
           <button><Link to={"/detailview/"+item._id}>Detail View</Link></button>
         </td>
      </tr>
   
    </tbody>
 





              )
            }, this)
            }

 </table>
















    {this.props.dashboard.userreq.map(function (item, index) {    
          var that=this;
       var requirement = item.requirment.map(function(req) {




                    return (
                        <div >
                        <div><span className="meta-text">Requirement:</span><b>{req.name}</b></div>
                        <div><span className="meta-text">Status:</span>:<b>
                       
                        <select  className="form-control" value={req.status}  onChange={e => that.updateStatus(req.req_id,e)}>
                          <option>NEW</option>
                           <option>INPROGRESS</option>
                            <option>PENDING</option>
                            <option>COMPLETED</option>
                            
                        </select>
                        

                        </b> </div>
                        <hr/>
                        </div>
                       
                    )
                });

        return (

          
 <div className="col-md-3" key={index}>
<div className="panel panel-primary"> 
<div className="panel-heading"> <h3 className="panel-title">{item.projectname}</h3> </div>
 <div className="panel-body" > 
 {requirement}


 </div> 
 </div>
 </div>




              )
            }, this)
            }


</div>




    );
  }
}

function mapStateToProps  (state){

  return{
    dashboard:state.user,
     authdata:state.auth
  }
}

export default connect(mapStateToProps)(DashboardContent);
