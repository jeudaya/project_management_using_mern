import React, { Component } from 'react';
import {Link} from 'react-router'


class Landing extends Component {
  // constructor(props){
  //   super(props)

  // }

  render() {

    return (


<center>
<div class="jumbotron">
  <h3>Welcome to Project Tracking Managment Application</h3>
       <h4>Client:ReactJs</h4>  
       <h4>Server:NodeJs</h4> 

  <p>
       <button className="btn btn-default" ><Link to='/register' >Register</Link></button>
         &nbsp; <button className="btn btn-default"><Link to='/login' >Login</Link></button>

  </p>
</div>
</center>
     
    );
  }
}


// const mapStateToProps=(state)=>{
//   return{
//     landing:state.landing
//   }
// }

export default Landing;
