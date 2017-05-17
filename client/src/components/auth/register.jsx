import React from 'react';
import {connect} from  'react-redux'
import {registerUser} from  '../../actions/auth/authaction.js'
import {Link} from 'react-router'


class Register extends React.Component
{
    constructor()
    {
        super();
    }
    register()
    {
        console.log("user data",this.refs);
        var userData={};
        userData.firstname=this.refs.firstname.value;
        userData.lastname=this.refs.lastname.value;
        userData.email=this.refs.email.value;
        userData.password=this.refs.password.value;
        userData.sendPassword=false;
        this.props.dispatch(registerUser(userData))
    }
    clearForm(){
        console.log("CLear Form")
    }
    render()
    {
        return (
             <div id="loginTag">
       
 
<div className="row  col-md-offset-4"><h3>Register</h3></div>

<div className="row">
    <div className="col-md-4">
    </div>


    <div className="col-md-4">
        <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-user"></i></span>
            <input type="text" ref="firstname" className="form-control" placeholder="firstname" aria-describedby="sizing-addon2"/>
            </div>
        </div>
            <br/>
         <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-user"></i></span>
            <input type="text" ref="lastname" className="form-control" placeholder="lastname" aria-describedby="sizing-addon2"/>
            </div>
        </div>
        <br/>
             
         <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-envelope"></i></span>
            <input type="text" ref="email" className="form-control" placeholder="Email" aria-describedby="sizing-addon2"/>
            </div>
        </div>
         <br/>
          <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-asterisk"></i></span>
            <input type="password" ref="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon2"/>
            </div>
        </div>
<br/>
        <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-asterisk"></i></span>
            <input type="password" ref="confirm_password" className="form-control" placeholder="Confirm Password" aria-describedby="sizing-addon2"/>
            </div>
        </div>
<br/>
        <div className="row">
            <br/>
            Already a User?<button className="btn btn-default"><Link to='/login' >Login</Link></button>
            <button className="btn btn-primary pull-right" onClick={this.register.bind(this)}>Register</button>
            </div>
    {this.props.register.data}  
    
    </div>


    <div className="col-md-4">
    </div>
</div>

</div>
        )
    }
}

function mapStateToProps  (state){
  return{
    register:state.auth
  }
}

export default connect(mapStateToProps)(Register);