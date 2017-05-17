import React, { Component } from 'react';
 import {Route,browserHistory} from 'react-router';
 import Notifications, {notify} from 'react-notify-toast';
 import io from 'socket.io-client';
let socket = io('http://localhost:2016');
let myColor = { background: '#0E1717', text: "#FFFFFF" };
var UserData,localuserdata;;
class Header extends Component{
	constructor(props)
	{
		super(props);   
    console.log("this props",this.props)   
    //     socket.on('notification_to_user', function (data) {
    //   alert("new msg constructor"+JSON.stringify(data))
    // });
	}
	logout()
	{
		console.log("logout");
		browserHistory.push('/login');
         localStorage.removeItem('userdetails')
	}

//   componentWillMount(){
//   socket.on('notification_to_user', function (data) {
//      alert("new msg will mount"+JSON.stringify(data))
//     });
// }
   componentDidMount() {  
       console.log("componentDidMount")
   if(localStorage.getItem('userdetails') ){
      localuserdata=JSON.parse(localStorage.getItem('userdetails'));
       UserData=localuserdata.email;      
        console.log("Login")
    }  
    socket.on('connect', function(){
      console.log("socket connected")
    });
    socket.on('socketid', function (socketid) {   

    socket.emit('user_mail_id', { mail_id: UserData });    
    socket.on('notification_to_user', function (data) {
     alert("new msg did mount"+JSON.stringify(data))
     notify.show('Toasty!',"custom", 5000, myColor);
    });

  });



}



render()
{
    return(
   <nav className="navbar navbar-default">
 <Notifications />
  <div className="container-fluid">
    <div className="navbar-header" >
      <a className="navbar-brand">Project-Tracking  </a>
    </div>
    <ul className="nav navbar-nav navbar-right">
     <a className="navbar-brand"><i className="glyphicon glyphicon-user"></i>&nbsp;{this.props.username}</a>
      <li onClick={this.logout.bind(this)}><a className="pull-right" href="#">Logout&nbsp;<span className="glyphicon glyphicon-off"></span></a></li>
    </ul>
  </div>
</nav>
    )

}




}

export default Header