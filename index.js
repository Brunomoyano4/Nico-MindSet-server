const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://MindSet:BaSD-MindSet2021@cluster0.rblv6.mongodb.net/mindSet?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      console.log('Error : ', error)
    } else {
      console.log('Mindset db connected')
    }
  }
)

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})