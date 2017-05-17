import React, { Component } from 'react';
import {connect} from  'react-redux'
import {getUserData} from  '../actions/useraction.js'
// import Header from './header';


class Dashboard extends Component {
  constructor(props){
    super(props)
    console.log("PROPS",props)
  }
  render() {
    return (   
      <div><h3>Welcome {this.props.dashboard.data.firstname}</h3>
      <hr/>
      <div>
      {this.props.children}
    </div>
      </div>
    );
  }
}

function mapStateToProps  (state){
  return{
    dashboard:state.auth
  }
}

export default connect(mapStateToProps)(Dashboard);