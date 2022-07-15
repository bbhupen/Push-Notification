const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const webpush = require('web-push')
require('dotenv').config();

const app = express()
const PORT = 3000

const publicVapidKey = process.env.VAPID_PUBLIC_KEY

const privateVapidKey= process.env.VAPID_PRIVATE_KEY

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

app.use(express.static(path.join(__dirname, "client")))
app.use(bodyparser.json())


app.get('/', (req, res) => {
    res.sendFile("index.html")
})


app.post('/subscribe', (req, res) => {
    const subscription = req.body
    console.log(subscription)
    res.status(201).json({})
    const payload = JSON.stringify({title: "Yo this is a push notification hello world"})
    webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

app.listen(PORT || process.env.PORT , ()=>{
    console.log(`Listening on port ${PORT} or visit http://localhost:${PORT}/`)
  })


module.exports = app

