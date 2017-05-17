import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router'
import {connect} from  'react-redux'
import {fetchProjectRequirement,fetchUserRequirement} from  '../actions/useraction.js'
 import Header from '../components/header'


var UserData,localuserdata;
class Detail extends Component {
    constructor(props){
      super(props)
      console.log("Props",this.props)
    }
    componentWillMount()
    {


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


      // console.log("componentWillMount",JSON.parse(localStorage.getItem('userdetails'))._id);

      this.props.dispatch(fetchProjectRequirement(JSON.parse(localStorage.getItem('userdetails'))._id,this.props.params.projectid));
    }
  render() {
    console.log("STATE DATA")

    return (
        <div>
        {JSON.stringify(this.props.dashboard.projectreq[0])}
        <Header username={UserData} projectname={this.props.dashboard.projectreq}/>  
          
        <div className="col-md-3">

        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge">14</span>
            Cras justo odio
          </li>
          </ul>
        

        </div>


        <div className="col-md-9">
          
    <div className="list-group">
  <a href="#" className="list-group-item row">
    <span className="col-md-3">
     <i className="glyphicon glyphicon-user custom-icon"></i>
     <br/><span className="meta-text">posted by:sanjay b</span>
     <br/><span className="meta-text">created On: 9th May 2015</span>
    </span>
    <span className="col-md-9">
      some randome comment sdflskdfl sldkfjsdlkf @!salfk
    </span>
   
  </a>



  <a  className="list-group-item row">
    <span className="col-md-3">
     <span className="label label-primary">Add Comment</span>
    </span>
  
    <span className="col-md-9">
     <div className="input-group">
      <input type="text" className="form-control" placeholder="Post your comment"/>
      <span className="input-group-btn">
        <button className="btn btn-default" type="button">Post</button>
      </span>
      </div>
    </span>


  </a>




</div>





        </div>

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

export default connect(mapStateToProps)(Detail);
