import React from 'react';
import './styles/LoginScreen.css'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';


const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } 
    if(!values.password){
        errors.password = 'Required'
    }
    return errors
  }



const renderField = ({ placeholder, label, type, input, meta: {touched, error} }) => (
    <div className='form-group field-container'>
        <label>{label}</label> 
            {touched && error &&
                <span className="error">({error})</span>}
        <input {...input} type={type} className='form-control' placeholder={placeholder}/>
    </div>
  )


const LoginScreen = ({handleSubmit}) => {
    return (
        <div className='mainContainer'>
            <div className='loginForm'>
                <h2 className='loginTitle'>Login Form</h2>
                <form onSubmit={handleSubmit} testval='Test'>
                    <Field name="email" component={renderField} type={"email"} label={"Email"} placeholder={'Email'}/>
                    <Field name="password" component={renderField} type={"password"} label={"Password"} placeholder={'Password'}/>
                    <button className='btn btn-primary'>
                        Log In
                    </button>
                    <Link className='link' to='/Register'>Don't have an account?</Link>
                </form>
            </div>
        </div>
    )
}


const LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginScreen)

export default LoginForm