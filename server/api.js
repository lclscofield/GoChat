const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/signUp', (req, res) => {
    const { username, phone } = req.body
    db.UserInfo.count({ username }, (err, count) => {
        if (!err && count) {
            res.send({ errType: 'username' })
        } else {
            db.UserInfo.count({ phone }, (err, count) => {
                if (!err && count) {
                    res.send({ errType: 'phone' })
                } else {
                    db.UserInfo.create(req.body)
                    res.send({ type: 'success' })
                }
            })
        }
    })
})

module.exports = router
