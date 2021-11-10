const fs = require('fs')
const Interviews = require('../data/interviews.json')

const missingInputs = (req,res) => {
  const pos = post = date = time = stat = "";
  const okey = true;
  if (!req.query.positionId) {
    pos= 'psychologyId, '
    okey= false
  }
  if (!req.query.postulantId) {
    post='postulantId, '
    okey=false
  }
  if (!req.query.dateId) {
    date='date, '
    okey=false
  }
  if (!req.query.timeId) {
    time='time, '
    okey=false
  }
  if (!req.query.statusId) {
    stat='status, '
    okey=false
  }
  if (!okey){ 
    res.status(400).send({ msg: pos + post + date + time + stat + 'are missing'})
  }
}

const findIndex = (req) => {
  return Interviews.findIndex((item) => item.id === req.query.interviewId)
} 

const getInterviews = (req, res) => {
  res.status(200).json(Interviews)
}

const getOneInterview = (req, res) => {
  const index = findIndex (req) 
  if (index !== -1) {
    res.status(200).json(Interviews[index])
  } else {
    res.status(400).json({ msg: `No interview found with the Id of ${req.query.interviewId}` })
  }
}

const createInterview = (req, res) => {
  missingInputs (req,res)
  const newInterview = {
    interviewId: (parseInt(Interviews[Interviews.length - 1].interviewId) + 1).toString(),
    positionId: req.query.positionId,
    postulantId: req.query.postulantId,
    date: req.query.date,
    time: req.query.time,
    stat: req.query.stat
  }
  sessions.push(newInterview)
  fs.writeFile('./data/interviews.json', JSON.stringify(Interviews), (error) => {
    if (error) {
      res.status(400).json({ msg: "Problems adding the new interview" })
    } else {
      res.status(200).json(newInterview)
    }
  })
}

const deleteInterview = (req, res) => {
  missingInputs(req, res)
  const index = findIndex(req)  
  if (index !== -1) {
		res.status(202).send({ msg: "Interview with id " + req.query.interviewId + " deleted" })
    const deletedElement = {
      ...Interviews[index]
    }
		Interviews.splice(index, 1)
		fs.writeFile('./data/interviews.json', JSON.stringify(Interviews), (error) => {
      if (error) {
        res.status(400).json({ msg: "Problems deleting the interview" })
      } else {
        res.status(200).json(deletedElement)
      }
		})
	}
  else {
		res.status(400).json({ msg: `No interview with the id of ${req.query.interviewId}` });
	}
}

module.exports = {
	getInterviews,
  getOneInterview,
  createInterview,
  deleteInterview
}