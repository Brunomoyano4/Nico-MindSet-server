const fs = require('fs')
const Interviews = require('../data/interviews.json')

const getInterviews = (req, res) => {
    res.status(200).json(Interviews)
}
const getOneInterview = (req, res) => {
    const oneInterview = Interviews.list.filter(item => item.interviewId === req.query.interviewId)
    if (oneInterview != false) {
        res.status(200).json(oneInterview)
    } else {
        res.status(400).json({ msg: `No Interview found with the Id of ${req.query.interviewId}` })
    }
}

pos=post=date=time=stat="";
okey=true;
const createInterview = (req, res) => {
    if (!req.query.positionId) {
        pos = 'positonId, '
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
    if (okey=false) { 
        res.status(400).send({ msg: pos + post + date + time + stat + 'are missing'})
    }
    const newInterview = {
        interviewId:  Object.keys(Interviews).length + 1,
        positionId: req.query.postionId,
        postulantId: req.query.postulantId,
        date: req.query.date,
        time: req.query.time,
        stat: req.query.stat
    }
    Interviews.push(newInterview)
    fs.writeFile('./data/interviews.json', JSON.stringify(Interviews), (error) => {
        if (error) {
            res.status(400).json({ msg: "Problems adding the new Interview" })
        } else {
            res.status(200).json(newInterview)
        }
    })
}

const deleteInterview = (req, res) => {
    const oneInterview = Interviews.list.filter (item => item.interviewId === req.query.interviewId)
    if (oneInterview != False) {
		res.status(202).send({ msg: "Interview with id " + ${req.query.interviewId} + " deleted" });
		Interviews.splice(Interviews, 1);
		fs.writeFile('./data/interviews.json', JSON.stringify(Interviews), (error) => {
			if (error) {
                res.status(400).json({ msg: "Problems deleting the Interview" })
            } else {
                res.status(200).json(oneInterview)
            }
		});
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