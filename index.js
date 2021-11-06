const express = require('express')
const admins = require('./controllers/admins')
const positions = require('./controllers/positions')
const applications = require('./controllers/applications')


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

// Positions resource

app.get('/positions', positions.getPositions)
app.get('/position', positions.getOnePosition)
app.get('/position/create', positions.createPosition)
app.get('/position/delete', positions.deletePosition)

// Applications resource

app.get('/applications', applications.getApplications)
app.get('/application/positionId', applications.getApplicationByPositionId)
app.get('/application/postulantId', applications.getApplicationByPostulantId)
app.get('/application/create', applications.createApplication)
app.get('/application/delete', applications.deleteApplication)

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})