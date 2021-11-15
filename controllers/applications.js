const fs = require('fs')
const Applications = require('../models/Applications')

const missingInputs = (req, res) => {
  if (!req.body.postulantId && !req.body.positionId) {
    return res.status(400).send({ msg: 'postulantId and positionId are empty' })
  }
  if (!req.body.postulantId) {
    return res.status(400).send({ msg: 'postulantId is empty' })
  }
  if (!req.body.positionId) {
    return res.status(400).send({ msg: 'positionId is empty' })
  }
}

const getApplications = (req, res) => {
  Applications.find()
  .then ((applications) => {
    return res.status(200).json(applications)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const getApplicationByPostulantId = (req, res) => {
  Applications.find({ postulantId: req.params.postulantId })
  .then ((applications) => {
    return res.status(200).json(applications)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const getApplicationByPositionId = (req, res) => {
  Applications.find({ positionId: req.params.positionId })
  .then ((applications) => {
    return res.status(200).json(applications)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const createApplication = (req, res) => {
  missingInputs(req, res)
  const newApplication = new Applications({
    postulantId: req.body.postulantId,
    positionId: req.body.positionId,
    createdAt: Date.now().toString()
  });
  newApplication.save()
    .then((newApplication) => {
      return res.status(201).json(newApplication)
    })
    .catch((error) => {
      return res.status(400).json(err)
    })
};

const deleteApplication = (req, res) => {
  Applications.findByIdAndDelete({ _id: req.params._id })
  .then ((applications) => {
    return res.status(200).json(applications)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

module.exports = {
  getApplications,
  getApplicationByPositionId,
  getApplicationByPostulantId,
  createApplication,
  deleteApplication
}