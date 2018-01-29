const express = require('express')
const router = express.Router()
// const db = require('./db')

router.post('/register', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

module.exports = router
