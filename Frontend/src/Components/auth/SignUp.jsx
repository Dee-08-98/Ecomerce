import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import signUpValidation from '../../Schema/signupValidation';
import axios from 'axios'

function SignUp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpValidation,
        onSubmit: async (values) => {
            setLoading(true); // Enable loading state
            let value = { ...values, role: "user" };

            axios.post("http://localhost:8520/api/ecomerce/register", value, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res)=>{
                // console.log(res);
                alert(res.data.message)
                setLoading(false)
                navigate('/auth/login')
                
            })
            .catch((err)=>{
                alert(err.response.data.message);
                setLoading(false)
                
            })
        },
    });

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className='text-white font-extrabold mb-5 text-3xl text-center'>SignUp</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            type='text'
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder='Name'
                            className='w-full p-2 font-bold indent-2 outline-none bg-gray-700 text-white border-2 border-white rounded-xl'
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className='text-red-500 font-bold'>{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type='email'
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder='Email'
                            className='w-full p-2 font-bold indent-2 outline-none bg-gray-700 text-white border-2 border-white rounded-xl'
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='text-red-500 font-bold'>{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder='Password'
                            className='w-full font-bold p-2 indent-2 bg-gray-700 outline-none text-white border-2 border-white rounded-xl'
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className='text-red-500 font-bold'>{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={loading}  // Disable button if loading
                        className={`text-white font-bold bg-cyan-500 w-full p-2 rounded-xl mb-4 text-xl ${loading && 'opacity-50'}`}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className='text-center text-white mt-4'>
                    Already have an account? <Link to='/auth/login' className='text-green-500 font-bold underline'>Login Here</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
