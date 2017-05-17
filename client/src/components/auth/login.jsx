import React from 'react';
import {connect} from  'react-redux'
import {loginUser} from  '../../actions/auth/authaction.js'
import {Link} from 'react-router'


class Login extends React.Component
{
    constructor()
    {
        super();
    }
login()
{

    var userData={};    
        userData.email=this.refs.email.value;
        userData.password=this.refs.password.value;
        this.props.dispatch(loginUser(userData))
}
    render()
    {
        return (
             <div id="loginTag">

<div className="row  col-md-offset-4"><h3>Login</h3></div>

<div className="row">
    <div className="col-md-4">
    </div>


    <div className="col-md-4">
        <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-user"></i></span>
            <input type="text" ref="email" className="form-control" placeholder="email" aria-describedby="sizing-addon2"/>
            </div>
        </div>

            <br/>

        <div className="row">
            <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"><i className="glyphicon glyphicon-asterisk"></i></span>
            <input type="password" ref="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon2"/>
            </div>
        </div>

        <div className="row">
            <br/>
            Need an account? <button className="btn btn-default" ><Link to='/register' >Register</Link></button>
            <button className="btn btn-primary pull-right" onClick={this.login.bind(this)}>Login</button>
            </div>
        {this.props.login.msg}
    
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
    login:state.auth
  }
}

export default connect(mapStateToProps)(Login);


