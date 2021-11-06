const express = require('express')
const admins = require('./controllers/admins')
const postulants = require('./controllers/postulants')
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

//Postulant resource
app.get('/postulants', postulants.getPostulants)
app.get('/postulant', postulants.getOnePostulant)
app.get('/postulants/edit', postulants.editPostulants)
app.get('/postulants/delete', postulants.deletePostulants)
app.get('/postulants/create', postulants.createPostulant)

app.listen(port, () => {
  console.log(`App MindSet listening at http://localhost:${port}`)
})