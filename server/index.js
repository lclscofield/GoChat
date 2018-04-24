const express = require('express')
const path = require('path')
const api = require('./api')
const bodyParser = require('body-parser') // 解析 post 请求的中间件
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const fs = require('fs')
// const db = require('./db')
const app = express()

app.set('port', (process.env.port || 3000))
app.use(favicon(path.join(__dirname, '../favicon.ico')))
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
    console.log(req.cookies.isLoading)
    const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    if (req.path === '/home/login' || req.path === '/home' || !!req.cookies.isLoading) {
        res.send(html)
    } else {
        res.send('404')
    }
})

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'))
})
