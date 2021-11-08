const fs = require('fs')
const Positions = require('../data/positions.json')
const missingInputs = (req, res) => {
  if (!req.query.clientId && !req.query.job && !req.query.description) {
    return res.status(400).send({ msg: 'clientId, job and description are empty' })
  }
  if (!req.query.clientId && !req.query.job) {
    return res.status(400).send({ msg: 'clientId and job are empty' })
  }
  if (!req.query.clientId && !req.query.description) {
    return res.status(400).send({ msg: 'clientId and description are empty' })
  }
  if (!req.query.job && !req.query.description) {
    return res.status(400).send({ msg: 'job and description are empty' })
  }
  if (!req.query.clientId) {
    return res.status(400).send({ msg: 'clientId is empty' })
  }
  if (!req.query.job) {
    return res.status(400).send({ msg: 'job is empty' })
  }
  if (!req.query.description) {
    return res.status(400).send({ msg: 'description is empty' })
  }
}

const findIndex = (req) => {
  return Positions.findIndex((item) => item.id === req.query.id)
}

const getPositions = (req, res) => {
  res.status(200).json(Positions)
}

const getOnePosition = (req, res) => {
  const index = findIndex(req)
  if (index !== -1) {
    res.status(200).json(Positions[index])
  } else {
    res.status(404).json({ msg: `No position with the Id of ${req.query.id}` })
  }
}

const createPosition = (req, res) => {
  missingInputs(req, res)
  const newPosition = {
    id: (parseInt(Positions[Positions.length - 1].id) + 1).toString() /*new Date().getTime().toString()*/,
    clientId: req.query.clientId,
    job: req.query.job,
    description: req.query.description,
    createdAt: Date.now().toString()
  }
  Positions.push(newPosition)
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, (error) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).json(newPosition)
    }
  })
}

const deletePosition = (req, res) => {
  missingInputs(req, res)
  const index = findIndex(req)
  if (index !== -1) {
    res.status(202).send({ msg: `Position with id ${req.query.id} deleted` })
    Positions.splice(index, 1)
    fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, (error) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.status(200).json(Positions[index])
      }
    })
  } else {
    res.status(404).json({ msg: `No position with the id of ${req.query.id}` })
  }
}

const updatePosition = (req, res) => {
  missingInputs(req, res)
  const index = findIndex(req)
  if (index !== -1) {
    res.status(202).send({ msg: `Position with id ${req.query.id} updated` })
    Positions[index] = {
      id: Positions[index].id,
      clientID: req.query.clientId || Positions[index].clientId,
      job: req.query.job || Positions[index].job,
      description: req.query.description || Positions[index].description,
      createdAt: Positions[index].createdAt
    }
    fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, (error) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.status(201).json(Positions[index])
      }
    })
  } else {
    res.status(404).json({ msg: `No position with the id of ${req.query.id}` })
  }
}

module.exports = {
  getPositions,
  getOnePosition,
  createPosition,
  deletePosition,
  updatePosition
}