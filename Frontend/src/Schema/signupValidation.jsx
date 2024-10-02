import React from 'react';
import * as yup from 'yup'

const signUpValidation = yup.object({
    name: yup.string().trim("The Name can't include leading and trailing spaces").strict(true).min(3).max(25).required('Please Enter Your Name'),
    email: yup.string().trim("The Email can't include leading and trailing spaces").strict(true).email().required('Pleasse Enter Email'),
    // subject:yup.string().trim("The Subject can't include leading and trailing spaces").strict(true).min(10).max(50).required('Please Enter Subject'),
    // message:yup.string().trim("The Message can't include leading and trailing spaces").strict(true).min(10).max(250).required('Please Enter Message'),
    password: yup.string().min(6).max(8).required('Please Enter Password'),
    // conf_password:yup.string().required().oneOf([yup.ref('password'),null] , 'Password must match')
})

export default signUpValidation;