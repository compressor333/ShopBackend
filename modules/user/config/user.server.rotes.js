const express = require('express')
const router = express.Router()
const {
    registerUser,
    getUsers
} = require('../controllers/user.server.controller')

router.route('/register').post(registerUser)
router.route('/').get(getUsers)

module.exports = router