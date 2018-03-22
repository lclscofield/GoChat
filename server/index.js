const express = require('express')
const path = require('path')
const api = require('./api')
const bodyParser = require('body-parser') // 解析 post 请求的中间件
// const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const db = require('./db')
const app = express()

app.set('port', (process.env.port || 3000))
// app.use(favicon(path.join(__dirname, '../dist/favicon.ico')))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//     if (req.method === 'OPTIONS') {
//         res.send(200) // 让options请求快速返回
//     } else {
//         next()
//     }
// })
app.use(api)

app.get('*', (req, res) => {
    console.log(123)
    const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    // res.send(html)
    if (req.cookies.isLoading) {
        const id = req.cookies.isLoading
        db.UserInfo.findOne({ id }, (err, doc) => {
            switch (true) {
                case !!err:
                    console.log(err)
                    break
                case doc:
                    res.redirect(301, `/home/user/${doc.username}`)
                    break
                default:
                    console.log('数据被意外删除')
            }
        })
    } else {
        // res.redirect(301, '/')
        res.send(html)
    }
})

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'))
})
