const express = require('express')
const admins = require('./controllers/admins')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('App MindSet already running')
})

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})