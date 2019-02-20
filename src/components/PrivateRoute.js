import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getCookie from '../helper_functions/getCookie';



const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render={ (props) => 
        getCookie('jwt-token') ? (<Component {...props}/>) : (<Redirect to='/'/>)
      }
    />
  )

export default PrivateRoute