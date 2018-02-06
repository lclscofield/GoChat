const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/signUp', (req, res) => {
    console.log(req.body)
    const {
        username,
        phone
    } = req.body
    db.UserInfo.findOne({
        username
    }, (err, doc) => {
        if (err) {
            console.log(err)
        } else if (doc) {
            res.send({
                errType: 'username'
            })
        } else {
            db.UserInfo.findOne({
                phone
            }, (err, doc) => {
                if (err) {
                    console.log(err)
                } else if (doc) {
                    res.send({
                        errType: 'phone'
                    })
                } else {
                    db.UserInfo(req.body).save(err => {
                        console.log(err)
                    })
                    res.send({
                        type: 'success'
                    })
                }
            })
        }
    })
})

module.exports = router
