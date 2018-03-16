const express = require('express')
const path = require('path')
const api = require('./api')
const bodyParser = require('body-parser') // 解析 post 请求的中间件
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const app = express()

app.set('port', (process.env.port || 3000))
// app.use(favicon(path.join(__dirname, '../dist/favicon.ico')))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(api)

app.get('*', (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'))
})
