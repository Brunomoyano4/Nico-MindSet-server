const fs = require('fs')
const Applications = require('../models/applications')

const missingInputs = (req, res) => {
  if (!req.query.postulantId && !req.query.positionId) {
    return res.status(400).send({ msg: 'postulantId and positionId are empty' })
  }
  if (!req.query.postulantId) {
    return res.status(400).send({ msg: 'postulantId is empty' })
  }
  if (!req.query.positionId) {
    return res.status(400).send({ msg: 'positionId is empty' })
  }
}

const findIndex = (req) => {
  return Applications.findIndex((element) => element.positionId === req.query.positionId && element.postulantId === req.query.PostulantId)
}

const filter = (req) => {
  return Applications.filter((element) => element.positionId === req.query.positionId)
}

const getApplications = (req, res) => {
  Applications.find()
    .then ((applications) => {
      return res.status(200).json(applications)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
  // res.status(200).json(Applications)
}

const getApplicationByPositionId = (req, res) => {
  const applicationsByPositionId = filter(req)
  if (!applicationsByPositionId) {
    res.status(400).json({ msg: `No applications for the positionId ${req.query.positionId}` })
  } else {
    res.status(200).json(applicationsByPositionId)
  }
}

const getApplicationByPostulantId = (req, res) => {
  const applicationsByPostulantId = filter(req)
  if (!applicationsByPostulantId) {
    res.status(400).json({ msg: `No applications for the positionId ${req.query.postulantId}` })
  } else {
    res.status(200).json(applicationsByPostulantId)
  }
}

const createApplication = (req, res) => {
  missingInputs(req, res)
  const newApplication = {
    postulantId: req.query.postulantId,
    positionId: req.query.positionId,
    createdAt: Date.now().toString()
  }
  Applications.push(newApplication)
  fs.writeFile('./data/applications.json', JSON.stringify(Applications), {}, (error) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).json(newApplication)
    }
  })
}

const deleteApplication = (req, res) => {
  missingInputs(req, res)
  const index = findIndex(req)
  if (index) {
    res.status(202).send({ msg: `Application with positionId ${req.query.positionId} and postulantId ${req.query.postulantId} deleted` })
    const deleteElement = {
      ...Applications[index]
    }
    Applications.splice(index, 1)
    fs.writeFile('./data/applications.json', JSON.stringify(Applications), {}, (error) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.status(200).json(deleteElement)
      }
    })
  } else {
    res.status(404).json({ msg: `No application found with  positionId ${req.query.positionId} and postulantId ${req.query.postulantId}` });
  }
}

module.exports = {
  getApplications,
  getApplicationByPositionId,
  getApplicationByPostulantId,
  createApplication,
  deleteApplication
}