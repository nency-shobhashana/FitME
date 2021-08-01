const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const User = require('../models/User')

// router.post('/register', AuthController.register)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router