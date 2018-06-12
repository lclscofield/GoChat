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
                res.cookie('isLoading', doc._id, { path: `/home/user/${doc.username}` })
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
    const isLoading = req.query.id
    db.UserInfo.update({
        _id: isLoading
    }, { $addToSet: { chatHistory: { chatId: item.chatId, name: item.name } } }, err => {
        if (err) console.log(err)
        db.UserInfo.findById(isLoading, { password: 0 }, (err, doc) => {
            switch (true) {
                case !!err:
                    console.log(err)
                    break
                default:
                    res.send(doc)
            }
        })
    })
})

// 获取聊天记录
router.post('/api/getMessage', (req, res) => {
    const chatId = req.body.chatId
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
                if (doc.chat.length > 50) {
                    doc.chat = doc.chat.slice(doc.chat.length - 50)
                }
                res.send(doc)
        }
    })
})

// 添加好友
router.post('/api/addFriend', (req, res) => {
    const account = req.body.account
    const isLoading = req.query.id
    db.UserInfo.findOne({ $or: [{ username: account }, { phone: account }] }, (err, doc1) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc1:
                res.send({ errType: 'account' })
                break
            case !!doc1:
                db.UserInfo.findById(isLoading, (err, doc2) => {
                    switch (true) {
                        case !!err:
                            console.log(err)
                            break
                        case !doc2:
                            console.log('error')
                            break
                        case !!doc2:
                            console.log(1)
                            if (doc2.friends.some(item => {
                                return item.userId + '' === doc1._id + ''
                            })) {
                                console.log(2)
                                res.send({ errType: 'added' })
                            } else {
                                console.log(3)
                                db.ChatHistory.create({
                                    member: [{
                                        userId: doc1._id, // 这个 id 是 UserInfo 的默认 _id
                                        name: doc1.username
                                    }, {
                                        userId: doc2._id, // 这个 id 是 UserInfo 的默认 _id
                                        name: doc2.username
                                    }], // 聊天纪录成员
                                    chat: []
                                }, (err, newDoc) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    doc1.friends.push({
                                        name: doc2.username,
                                        userId: doc2._id,
                                        chatId: newDoc._id
                                    })
                                    doc2.friends.push({
                                        name: doc1.username,
                                        userId: doc1._id,
                                        chatId: newDoc._id
                                    })
                                    doc1.save()
                                    doc2.save()
                                    res.send(doc2.friends)
                                })
                            }
                    }
                })
        }
    })
})

module.exports = router
