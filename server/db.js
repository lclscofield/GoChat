// 引用mongoose模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection
// 连接成功
db.on('connected', () => {
    console.log('连接成功')
})
// 连接失败
db.on('error', () => {
    console.log('连接失败')
})

// mongoose.Schema 方法用来定义数据集的格式
const Schema = mongoose.Schema
// 用户信息数据格式
const UserSchema = new Schema({
    username: String, // 定义一个属性 username，类型为 String
    password: String,
    phone: String,
    friends: [],
    groups: []
})
// 聊天记录数据格式
const ChatHistory = new Schema({})

// mongoose.model方法将格式分配给指定的数据集
const Models = {
    UserInfo: mongoose.model('UserInfo', UserSchema),
    ChatHistory: mongoose.model('ChatHistory', ChatHistory)
}

// function inset () {
//     new Models.UserInfo({
//         username: 'haha',
//         password: 'haha123456'
//     }).save((err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(res)
//         }
//     })
// }
// inset()

function find () {
    Models.UserInfo.findOne({
        username: 'lcl'
    }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log('res:')
            console.log(res)
        }
    })
}
find()

module.exports = Models
