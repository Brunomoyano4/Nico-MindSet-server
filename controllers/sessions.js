const fs = require('fs')
const Sessions = require('../models/Sessions')

// const findIndex = (req) => {
//   return sessions.findIndex((item) => item.id === req.query.id)
// }

const getSessions = (req, res) => {
  Sessions.find()
  .then ((sessions) => {
    return res.status(200).json(sessions)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const getOneSession = (req, res) => {
  Sessions.find({ _id: req.params._id })
  .then ((sessions) => {
    return res.status(200).json(sessions)
  })
  .catch(() => {
    return res.status(400).json({ msg: `No session found with the Id of ${req.params._id}` })
  })
}
//   const index = findIndex(req) 
//   if (index !== -1) {
//     res.status(200).json(sessions[index])
//   } else {
//     res.status(400).json({ msg: `No session found with the Id of ${req.query.id}` })
//   }
// }

const createSession = (req, res) => {
  const newSession = new Sessions({
    psychologyId: req.body.psychologyId,
    postulantId: req.body.postulantId,
    date: req.body.date,
    time: req.body.time,
    stat: req.body.stat
  })
  newSession.save((error, session) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(session)
  })
};

//   missingInputs (req,res)
//   const newSession = {
//     id: (parseInt(sessions[sessions.length - 1].id) + 1).toString(),
//     psychologyId: req.query.psychologyId,
//     postulantId: req.query.postulantId,
//     date: req.query.date,
//     time: req.query.time,
//     stat: req.query.stat
//   }
//   sessions.push(newSession)
//   fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (error) => {
//     if (error) {
//       res.status(400).json({ msg: "Problems adding the new session" })
//     } else {
//       res.status(200).json(newSession)
//     }
//   })
// }

const deleteSession = (req, res) => {
  Sessions.findByIdAndDelete({ _id: req.params._id })
  .then (() => {
    return res.status(200).json({ msg: "Session with id " + req.params._id + " deleted" })
  })
  .catch(() => {
    return res.status(400).json({ msg: "Problems deleting the session" })
  })
}
//   const index = findIndex(req)  
//   if (index !== -1) {
// 		res.status(202).send({ msg: "Session with id " + req.query.id + " deleted" })
//     const deletedElement = {
//       ...sessions[index]
//     }
// 		sessions.splice(index, 1)
// 		fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (error) => {
//       if (error) {
//         res.status(400).json({ msg: "Problems deleting the session" })
//       } else {
//         res.status(200).json(deletedElement)
//       }
// 		})
// 	}
//   else {
// 		res.status(400).json({ msg: `No session with the id of ${req.query.id}` });
// 	}
// }

module.exports = {
  getSessions,
  getOneSession,
  createSession,
  deleteSession
}