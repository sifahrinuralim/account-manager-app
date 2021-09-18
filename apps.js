require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes/index')
const path = require ('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//set view engine
app.set ('view engine', 'ejs')

//load assets
app.use ('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use ('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use ('/js', express.static(path.resolve(__dirname, 'assets/js')))

app.use('/', router)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})