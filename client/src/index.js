import React, { Component } from 'react';
import { render } from 'react-dom';
import {Router, Route,browserHistory, IndexRoute} from 'react-router';
import Landing from './components/landing'
import Dashboard from './components/App'
import Users from './components/users'
import Projects from './components/projects'
import Requirements from './components/requirements'
import Detail from './components/detail'

import DashboardContent from './components/dashboard_content';
import DashboardContentAdmin from './components/dashboard_content_admin';
import {Provider} from 'react-redux' ;
import store from './store'
import Login from './components/auth/login'
import Register from './components/auth/register'
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Landing} ></Route>

            <Route path="/login" component={Login}></Route>

            <Route path="/register" component={Register}></Route>
            

           
                  <Route path='/dashboardadmin'  component={DashboardContentAdmin}>
                    <IndexRoute component={Users}></IndexRoute>
                    <Route path='/projects' component={Projects}></Route>
                    <Route path='/requirements' component={Requirements}></Route>
                 
                  </Route>
            <Route path='detailview/:projectid' component={Detail}>
          
            </Route>
            <Route path='/dashboard' component={DashboardContent}>
                // <IndexRoute  component={DashboardContent}></IndexRoute>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
