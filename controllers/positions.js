const fs = require('fs')
const Positions = require('../models/Positions')

const getPositions = (req, res) => {
  Positions.find()
   .then((Positions)=>{
    res.status(200).json(Positions)
   })
   .catch((error)=>{
    res.status(400).json(error)
   })
}

const getOnePosition = (req, res) => {
  Positions.findById(req.params.id,
  (error,Positions) => {
    if(!Positions) {
      return res.status(404).json({
        msg: `Position with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(Positions)
  })
}

const updatePosition = (req, res) => {
  Positions.findByIdAndUpdate(req.params.id,
    { 
      clientId: req.body.clientID,
      job: req.body.job,
      description:req.body.description,
    },
    { new: true }, 
    (error, newPosition) => {
      if(!newPosition) {
        return res.status(404).json({
          msg: `Position with id: ${req.params.id} was not found`
        })
      }
      if(error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(newPosition)
    }
  )
}

const createPosition=(req, res) => {
  const position = new Positions({
    clientId: req.body.clientId,
    job: req.body.job,
    description:req.body.description,
  })

  position.save((error, position) => {
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(position)
  })
}

const deletePosition=(req,res)=>{
  Positions.findByIdAndRemove(req.params.id,
  (error,Positions) => {
    if(!Positions) {
      return res.status(404).json({
        msg: `Position with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(Positions)
  })
}

module.exports = {
  getPositions,
  getOnePosition,
  createPosition,
  updatePosition,
  deletePosition
}