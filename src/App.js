import React, { Component } from 'react';
import LoginForm  from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  state = {
    'auth_email': false
  }

  render(){

    const getCookie = (cname) => {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
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

    console.log('Cookie Length: ' + getCookie('auth_email').length);

    const submitForm = (formValues) => {
        console.log('Submitting Form: ', formValues);
        document.cookie = 'auth_email=' + formValues.email;
        this.setState({'auth_email': true}); 
    }

    return (
        <Router>
            <div>
              <Switch>
                <Route exact path='/' render={(props) =>
                  this.state.auth_email ? <Redirect to="/HomeScreen"/> :
                    <LoginForm
                      onSubmit={submitForm}
                    />
                }/>
                <Route path='/HomeScreen' render={(props) =>
                  document.cookie.indexOf("auth_email=") >= 0 ?
                    <HomeScreen/>
                  :
                    <Redirect to={{ pathname: '/' }}/>
                }/>
                <Route render={(props) =>
                  <Redirect to={{pathname: '/'}}/>
                }/>
              </Switch>
            </div>
        </Router>
    )
  }
}

export default App;