const fs = require('fs')
const Sessions = require('../models/Sessions')

const getSessions = (req, res) => {
  Sessions.find().populate('psychology').populate('postulant')
    .then ((sessions) => {
      return res.status(200).json(sessions)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

const getOneSession = (req, res) => {
  Sessions.findById (req.params.id).populate('psychology').populate('postulant')
    .then ((session) => {
      return res.status(200).json(session)
    })
    .catch(() => {
      return res.status(400).json({ msg: `No session found with the Id of ${req.params.id}` })
    })
}

const createSession = (req, res) => {
  console.log('res', req.body)
  const newSession = new Sessions({
    psychology: req.body.psychology,
    postulant: req.body.postulant,
    date: req.body.date,
    time: req.body.time,
    stat: req.body.stat
  })
  newSession.save((error, session) => {
    if (error) {
      return res.status(400).json({ msg: "Problems adding the new session" })
    }
    return res.status(201).json(session)
  })
};

const deleteSession = (req, res) => {
  console.log('request',req.params)
  Sessions.findByIdAndDelete({ _id: req.params.id })
    .then (() => {
      return res.status(200).json({ msg: "Session with id " + req.params.id + " deleted" })
    })
    .catch(() => {
      return res.status(400).json({ msg: "Problems deleting the session" })
    })
}

module.exports = {
  getSessions,
  getOneSession,
  createSession,
  deleteSession
}