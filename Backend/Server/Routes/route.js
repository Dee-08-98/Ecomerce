
const express = require('express')
const { register, login, profile, logout } = require('../Controllers/user.controllers')
const auth = require('../Middleware/auth.middleware')


const route = express.Router()

route.post('/register', register)
route.post('/login', login)
route.get('/profile', auth, profile)
route.post('/logout', auth, logout)





module.exports = route