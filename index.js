const express = require('express')
const admins = require('./controllers/admins')
const interviews = require('./controllers/interviews')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('App MindSet already running')
})

// Admin resource 
app.get('/admins', admins.getAdmins)
app.get('/admin', admins.getOneAdmin)
app.get('/admin/edit', admins.editAdmin)
app.get('/admin/delete', admins.deleteAdmin)

//Interviews resource 
app.get('/interviews', interviews.getInterviews)
app.get('/interview', interviews.getOneInterview)
app.get('/interview/create', interviews.createInterview)
app.get('/interviews/delete', interviews.deleteInterview)

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})