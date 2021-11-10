const express = require('express')
const admins = require('./controllers/admins')
const interviews = require('./controllers/interviews')
const postulants = require('./controllers/postulants')
const positions = require('./controllers/positions')
const applications = require('./controllers/applications')
const psychologists = require('./controllers/psychologists')
const sessions = require('./controllers/sessions')

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

//Postulant resource

app.get('/postulants', postulants.getPostulants)
app.get('/postulant', postulants.getOnePostulant)
app.get('/postulants/edit', postulants.editPostulants)
app.get('/postulants/delete', postulants.deletePostulants)
app.get('/postulants/create', postulants.createPostulant)

// Positions resource

app.get('/positions', positions.getPositions)
app.get('/position', positions.getOnePosition)
app.get('/position/create', positions.createPosition)
app.get('/position/delete', positions.deletePosition)
app.get('/position/update', positions.updatePosition)

// Applications resource

app.get('/applications', applications.getApplications)
app.get('/application/positionId', applications.getApplicationByPositionId)
app.get('/application/postulantId', applications.getApplicationByPostulantId)
app.get('/application/create', applications.createApplication)
app.get('/application/delete', applications.deleteApplication)

// Psychologist resource

app.get('/psychologists', psychologists.getPsychologists)
app.get('/psychologist', psychologists.getOnePsychologist)
app.get('/psychologist/edit', psychologists.editPsychologist)
app.get('/psychologist/delete', psychologists.deletePsychologist)
app.get('/psychologist/create', psychologists.createPsychologist)

//Sessions resource

app.get('/sessions', sessions.getSessions)
app.get('/session', sessions.getOneSession)
app.get('/session/create', sessions.createSession)
app.get('/session/delete', sessions.deleteSession)

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})