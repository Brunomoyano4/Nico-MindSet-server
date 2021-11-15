const fs = require('fs');
const Psychologists = require('../models/Psychologists') 

const writeFile = (file, obj, msg, res, code) => {
  fs.writeFile(file, JSON.stringify(obj), {}, (error) => {
    if (error) {
      return res.status(400).send(error)
    }
    return res.status(code).send({
      msg: msg
    })
  })
}

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
  Psychologists.find({id: req.params.id})
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
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      msg: 'All fields are missing'
    })
  }
  if (!req.body?.first_name){
    return res.status(400).send({
      msg: 'The first name is missing'
    })
  }
  else if (!req.body?.last_name){
    return res.status(400).send({
      msg: 'The last name is missing'
    })
  }
  else if (!req.body?.user_name){
    return res.status(400).send({
      msg: 'The user name is missing'
    })
  }
  else if (!req.body?.email){
    return res.status(400).send({
      msg: 'The email is missing'
    })
  }
  else if (!req.body?.password){
    return res.status(400).send({
      msg: 'The password is missing'
    })
  }
  const psychologist = new Psychologists({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
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
    {first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password},
    {new : true}
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
  const psychologist = Psychologists.findOneAndDelete(req.params.id)
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