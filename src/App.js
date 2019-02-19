import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import LoginForm from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import EmptyScreen from './components/EmptyScreen';
import RegisterForm from './components/RegisterScreen';
import Navbar from './components/Navbar';

var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

class App extends Component {
  
  render() {

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    

    const onSubmit = (values) => {

      const header = {
        "alg": "HS256",
        "typ": "JWT"
      }

      values.password = passwordHash.generate(values.password);
      const secret =  'basic-secret-token';
      const payload = values;
      const jwtToken = jwt.sign(({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), data : payload}), secret, { header : header })

      document.cookie = 'jwt-token=' + jwtToken + 'expires=Thu, 18 Dec 2020 12:00:00 UTC';

      console.log('JWT Token: ' + getCookie('jwt-token'))
      this.props.history.push('/HomeScreen')

    }

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route
        {...rest}
        render={ (props) => 
          getCookie('jwt-token') ? (<Component {...props}/>) : (<Redirect to='/'/>)
        }
      />
    )

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
