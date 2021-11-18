const fs = require('fs')
const sessions = require('../data/sessions.json')

const missingInputs = (req,res) => {
  let psy = post = date = time = stat = "";
  let okey=true;
  if (!req.query.psychologyId) {
    psy= 'psychologyId, '
    okey=false
  }
  if (!req.query.postulantId) {
    post='postulantId, '
    okey=false
  }
  if (!req.query.date) {
    date='date, '
    okey=false
  }
  if (!req.query.time) {
    time='time, '
    okey=false
  }
  if (!req.query.status) {
    stat='status, '
    okey=false
  }
  if (!okey){ 
    res.status(400).send({ msg: psy + post + date + time + stat + 'are missing'})
  }
}

const findIndex = (req) => {
  return sessions.findIndex((item) => item.id === req.query.id)
}

const getSessions = (req, res) => {
  res.status(200).json(sessions)
}

const getOneSession = (req, res) => {
  const index = findIndex(req) 
  if (index !== -1) {
    res.status(200).json(sessions[index])
  } else {
    res.status(400).json({ msg: `No session found with the Id of ${req.query.id}` })
  }
}

const createSession = (req, res) => {
  missingInputs (req,res)
  const newSession = {
    id: (parseInt(sessions[sessions.length - 1].id) + 1).toString(),
    psychologyId: req.query.psychologyId,
    postulantId: req.query.postulantId,
    date: req.query.date,
    time: req.query.time,
    status: req.query.status
  }
  sessions.push(newSession)
  fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (error) => {
    if (error) {
      res.status(400).json({ msg: "Problems adding the new session" })
    } else {
      res.status(200).json(newSession)
    }
  })
}

const deleteSession = (req, res) => {
  const index = findIndex(req)  
  if (index !== -1) {
		res.status(202).send({ msg: "Session with id " + req.query.id + " deleted" })
    const deletedElement = {
      ...sessions[index]
    }
		sessions.splice(index, 1)
		fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (error) => {
      if (error) {
        res.status(400).json({ msg: "Problems deleting the session" })
      } else {
        res.status(200).json(deletedElement)
      }
		})
	}
  else {
		res.status(400).json({ msg: `No session with the id of ${req.query.id}` });
	}
}

module.exports = {
  getSessions,
  getOneSession,
  createSession,
  deleteSession
}