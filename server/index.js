const express = require('express')
const path = require('path')
const api = require('./api')
const bodyParser = require('body-parser') // 解析 post 请求的中间件
const app = express()

app.set('port', (process.env.port || 3000))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(api)

app.get('/', (req, res) => {
    res.send('404')
})

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'))
})
