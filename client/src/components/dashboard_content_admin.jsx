import React, { Component } from 'react';
import {connect} from  'react-redux'
import {fetchUser} from  '../actions/useraction.js'
import {Link} from 'react-router'
 import {Route,browserHistory} from 'react-router';
 import Header from '../components/header'

var UserData;
class DashboardContentAdmin extends Component {





  componentWillUpdate(){
   
    (function checkAuth(){
     

    if(this.props.authdata.isAuth || localStorage.getItem('userdetails') ){
      var userdata=JSON.parse(localStorage.getItem('userdetails'));
       UserData=userdata.firstname + " " + userdata.lastname;

      console.log("Login")
    }
    else{
         browserHistory.push('/login');
         localStorage.removeItem('userdetails')
    }
  }).bind(this)()


  }


  render() {
    return (
        <div id="dashboardId">
     
                <div className="col-md-3">
                    <ul className="nav nav-pills nav-stacked ">
                        <li role="presentation"><a><Link activeClassName="" to="/dashboardadmin">User</Link></a></li>
                        <li role="presentation"><a><Link activeClassName="active" to="/projects">Project</Link></a></li>
                        <li role="presentation"><a><Link activeClassName="active" to="/Requirements">Requirement</Link></a></li>

                    </ul>
                </div>
           
             


             
                <div className="col-md-9">
                  <Header username={UserData}/>
                    {this.props.children}

                </div>
            </div>
    );
  }
}

function mapStateToProps  (state){

  return{
    dashboard_admin:state.user,
    authdata:state.auth
  }
}

export default connect(mapStateToProps)(DashboardContentAdmin);
