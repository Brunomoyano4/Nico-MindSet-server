const fs = require('fs');
const Psychologists = require('../models/Psychologists')

const getPsychologists = (req, res) => {
  Psychologists.find()
    .then((result) => {
      return res.status(200).json(result)     
    })
    .catch((error) => {
      return res.status(400).json(error)  
    })
}

const getOnePsychologist = (req, res) => {
  Psychologists.find({_id: req.params.id})
    .then((result) => {
      return res.status(200).json(result)
    }) 
    .catch((error) => {
      return res.status(400).json({
        msg: `No psychologist with the Id of ${req.params.id}` 
        })
    })  
}

const createPsychologist = (req,res) => {
  const psychologist = new Psychologists({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
  psychologist.save((error, psychologist) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(psychologist)
  })
}

const editPsychologist = (req, res) => {
  Psychologists.findOneAndUpdate(req.params.id,
    {firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password}, {new : true}
  ) 
  .then((result) => {
    if (!result) {
      return res.status(400).json({
        msg:`Psychologist with id: ${req.params.id} was not found`
      })
    }
    return res.status(201).json(result)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const deletePsychologist = (req, res) => {
  Psychologists.findOneAndDelete(req.params.id)
  .then((result) => {
    if(!result) {
      return res.status(400).json({
        msg: `Psychologist with id: ${req.params.id} was not found`
      })
    }
    return res.status(201).json(result)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

module.exports = {
	getPsychologists,
	getOnePsychologist,
	editPsychologist,
  createPsychologist,
	deletePsychologist
}