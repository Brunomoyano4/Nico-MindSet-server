const fs = require('fs')
const Postulants = require('../data/postulants.json')

const getPostulants = (req, res) => {
	res.status(200).json(Postulants)
}

const getOnePostulant = (req, res) => {
	const postulantIndex = Postulants.findIndex((item) => item.id === parseInt(req.query.id))
	if (postulantIndex != -1) {
		res.status(200).json(Postulants[postulantIndex])
	}
	else {
		res.status(400).json({ msg: `No postulant with the Id of ${req.query.id}` })
	}
}



module.exports = {
	getPostulants,
	getOnePostulant,
} 
