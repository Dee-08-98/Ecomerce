import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {

    console.log(user);
    

    const location = useLocation()
    // console.log(location.pathname.includes('/login'));

    if (!isAuthenticated && !(location.pathname.includes('/login') ||
        location.pathname.includes('/register')
    )) {
        return <Navigate to={'/auth/login'} />
    }


    if (isAuthenticated && (location.pathname.includes('/login') ||
        location.pathname.includes('/register')
    )) {
        if(user.role === 'admin'){
            return <Navigate to='/admin/dashboard'/>
        }
        else{
            return <Navigate to='/shop/home'/>  
        }
    }

    if(isAuthenticated && user?.role !== 'admin' &&  location.pathname.includes('admin')){
        return <Navigate to='/shop/listing'/>
    }
 
    if(isAuthenticated && user?.role !== 'user' &&  location.pathname.includes('shop')){
        return <Navigate to='/admin/dashboard'/>
    }

    return children ? children : <Outlet />

}

export default CheckAuth;