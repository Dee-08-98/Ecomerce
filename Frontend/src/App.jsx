import { Route, Routes } from "react-router-dom"
import Login from "./Pages/auth/Login"
import Register from "./Pages/auth/Register"
import Layout from "./Components/auth/Layout"
import AdminLayout from "./Components/admin/AdminLayout"
import Dashboard from "./Pages/admin/Dashboard"
import Products from "./Pages/admin/Products"
import Features from "./Pages/admin/Features"
import Orders from "./Pages/admin/Orders"
import ShoppingLayout from "./Components/shopping/ShoppingLayout"
import Error from "./Not_Found/Error"
import Home from "./Pages/shopping/Home"
import Listing from "./Pages/shopping/Listing"
import CheckOut from "./Pages/shopping/CheckOut"
import Accout from "./Pages/shopping/Accout"
import CheckAuth from "./Components/Common/CheckAuth"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { userExist, userNotExist } from "./Redux/Slice"
// import { profileApi } from "./Redux/Slice"


function App() {

  const {user , isAuthenticated} = useSelector(state=>state.auth)

  const dispatch = useDispatch()

  // const isAuthenticated = true
  // const user = {
  //   role: "admin"
  // }


  useEffect(() => {

    axios.get('http://localhost:8520/api/ecomerce/profile', { withCredentials: true })
      .then((res) => {
        // console.log(res);
        dispatch(userExist(res.data.user))

      })
      .catch((err) => {
        console.log(err);
        dispatch(userNotExist())
      })

  }, [dispatch])

  return (
    <>

      <div className=" flex flex-col overflow-hidden bg-white">
        <Routes>

          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="features" element={<Features />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>}>
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<Listing />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="account" element={<Accout />} />
          </Route>
          <Route path="*" element={<Error />}> </Route>


        </Routes>
      </div>

    </>
  )
}

export default App
