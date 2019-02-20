import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import LoginForm from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import EmptyScreen from './components/EmptyScreen';
import RegisterForm from './components/RegisterScreen';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import onSubmit from './helper_functions/formSubmit';
import getCookie from './helper_functions/getCookie';

class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar cookies={getCookie('jwt-token') ? true : false}/>
        <Switch>
          <Route exact path='/' render={() => <LoginForm onSubmit={onSubmit}/>}/>
          <Route path='/Register' render={() => <RegisterForm onSubmit={onSubmit}/>}/>
          <PrivateRoute path='/HomeScreen' component={HomeScreen}/>
          <Route render={() => <EmptyScreen error_msg={404}/>}/>
        </Switch>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return state;
}

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
