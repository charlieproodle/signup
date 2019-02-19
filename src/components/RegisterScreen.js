import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';


const validate = values => {
    const errors = {}
    if(!values.firstName){
        errors.firstName = 'Required'
    }
    if(!values.secondName){
        errors.secondName = 'Required'
    }
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


const RegisterScreen = ({handleSubmit}) => {
    return (
        <div className='mainContainer'>
            <div className='loginForm'>
                <h2 className='loginTitle'>Register Form</h2>
                <form onSubmit={handleSubmit} testval='Test'>
                    <Field name="firstName" component={renderField} type={"text"} label={"First Name"} placeholder={'First Name'}/>
                    <Field name="secondName" component={renderField} type={"text"} label={"Second Name"} placeholder={'Second Name'}/>
                    <Field name="email" component={renderField} type={"email"} label={"Email"} placeholder={'Email'}/>
                    <Field name="password" component={renderField} type={"password"} label={"Password"} placeholder={'Password'}/>
                    <button className='btn btn-primary'>
                        Sign Up
                    </button>
                    <Link to='/' className='link'>Already have an account?</Link>
                </form>
            </div>
        </div>
    )
}


const RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterScreen)

export default RegisterForm;