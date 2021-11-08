const fs = require('fs')
const sessions = require('../data/sessions.json')

const getSessions = (req, res) => {
    res.status(200).json(sessions)
}

const getOneSession = (req, res) => {
    const oneSession = sessions.list.filter(item => item.id === req.query.sessionId)
    if (oneSession != false) {
        res.status(200).json(oneSession)
    } else {
        res.status(400).json({ msg: `No session found with the Id of ${req.query.sessionId}` })
    }
}

psi=post=date=time=stat="";
okey=true;
const createSession = (req, res) => {
    if (!req.query.psychologyId) {
        pos = 'psychologyId, '
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
    if okey=false{ 
        res.status(400).send({ msg: psy + post + date + time + stat + 'are missing'})
    }
    const newSession = {
        psychologyId: Object.keys(sessions).length + 1 
        positionId: req.query.postionId,
        postulantId: req.query.postulantId,
        date: req.query.date
        time: req.query.time
        stat: req.query.stat
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
    const oneSession = sessions.list.filter(item => item.psychologyId === req.query.psychologyId)
    if (oneSession != False) {
		res.status(202).send({ msg: "Session with id ", ${req.query.psychologyId} ," deleted" })
		sessions.splice(oneSession, 1)
		fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (error) => {
			if (error) {
                return res.status(400).json({ msg: "Problems deleting the session" })
            } else {
                return res.status(200).json(oneSession)
            }
		})
	} else {
		return res.status(400).json({ msg: `No session with the id of ${req.query.sessionId}` });
	}
}

module.exports = {
	getSessions,
    getOneSession,
    createSession,
    deleteSession
}