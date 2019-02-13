import React from 'react';
import { reduxForm, Field } from 'redux-form';
import FieldText from './FieldText';
import isValidEmail from 'sane-email-validation'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid Email Format'
  }
  return errors
}


let LoginForm = ({handleSubmit, onSubmit}) => {

    return (
        <div className="flex flex-column justify-center items-center">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-80">
                <Field
                    name="firstName"
                    label="First Name"
                    component={FieldText}
                />
                 <Field
                    name="lastName"
                    label="Last Name"
                    component={FieldText}
                />
                <Field
                    name="email"
                    label="Email"
                    component={FieldText}
                />
                <button type="submit" className="link br2 bg-grey black dim pa3 f6 sans-serif b--grey ba">Submit</button>
            </form>
        </div>
    )
}

const formConfiguration = {
    form: 'login-form',
    validate
}

export default (reduxForm(formConfiguration)(LoginForm));