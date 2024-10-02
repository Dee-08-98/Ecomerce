import React, { useState } from 'react';
import loginValidation from '../../Schema/loginValidation';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExist } from '../../Redux/Slice';

function Login(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const dispatch = useDispatch()



    const initialValues = {
        email: "",
        password: ""
    };

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit: (values, actions) => {
            setLoading(true); 

            axios.post("http://localhost:8520/api/ecomerce/login", values, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    alert(res.data.message)
                    setLoading(false)
                    dispatch(userExist(res.data.user))
                    // if (res.data.user.role === "user") {
                    //     console.log(res.data.user.role);

                    //     // navigate('/shop/home')
                    // }
                    // if (res.data.user.role === "admin") {
                    //     // navigate('/admin/dashboard')
                    //     console.log(res.data.user.role);

                    // }
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    setLoading(false)

                })
        }
    });

    return (
        <>
            <div className=" w-full  flex justify-center items-center">
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className='text-white font-extrabold mb-5 text-3xl text-center'>Login</h3>
                    <form onSubmit={formik.handleSubmit}>
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
                            className={`text-white font-bold bg-cyan-500 w-full p-2 rounded-xl mb-4 text-xl ${loading && 'opacity-50 '}`}
                        >
                            {loading ? 'Login...' : 'Login'}
                        </button>
                    </form>
                    <p className='text-center text-white mt-4'>
                        Don't have an account? <Link to='/auth/register' className='text-green-500 font-bold underline'>SignUp Here</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;