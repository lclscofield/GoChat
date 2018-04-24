const express = require('express')
const router = express.Router()
const db = require('./db')

// 注册
router.post('/api/signUp', (req, res) => {
    const { username, phone } = req.body
    db.UserInfo.findOne({ username }, (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !!doc:
                res.send({ errType: 'username' })
                break
            default:
                db.UserInfo.findOne({ phone }, (err, doc) => {
                    switch (true) {
                        case !!err:
                            console.log(err)
                            break
                        case !!doc:
                            res.send({ errType: 'phone' })
                            break
                        default:
                            db.UserInfo.create(req.body)
                            res.send({ errType: 'success' })
                    }
                })
        }
    })
})

// 登录
router.post('/api/login', (req, res) => {
    const { account, password } = req.body
    console.log(req.body)
    db.UserInfo.findOne({ $or: [{ username: account }, { phone: account }] }, (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc:
                res.send({ errType: 'account' })
                break
            case doc.password !== password:
                res.send({ errType: 'password' })
                break
            default:
                res.cookie('isLoading', doc._id)
                res.send({
                    username: doc.username,
                    phone: doc.phone,
                    _id: doc._id,
                    friends: doc.friends,
                    groups: doc.groups,
                    chatHistory: doc.chatHistory
                })
        }
    })
})

// 添加会话状态
router.post('/api/addSession', (req, res) => {
    const item = req.body
    console.log(req.body)
    console.log(req.cookies.isLoading)
    console.log(1)
    db.UserInfo.update({
        _id: req.cookies.isLoading
    }, { $addToSet: { chatHistory: { chatId: item.chatId, name: item.name } } }, err => {
        if (err) console.log(err)
        db.UserInfo.findById(req.cookies.isLoading, { password: 0 }, (err, doc) => {
            console.log(2)
            switch (true) {
                case !!err:
                    console.log(err)
                    break
                default:
                    console.log(2)
                    console.log(doc)
                    res.send(doc)
            }
        })
    })
})

// 拿到聊天记录
router.post('/api/getMessage', (req, res) => {
    const chatId = req.body
    console.log(4)
    console.log(req.body)
    db.ChatHistory.findById(chatId, (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc:
                console.log('拿不到聊天记录')
                break
            default:
                console.log(5)
                res.send(doc)
        }
    })
})

module.exports = router
