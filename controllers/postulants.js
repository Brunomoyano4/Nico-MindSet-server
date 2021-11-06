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

const editPostulants = (req, res) => {
	const postulantIndex = Postulants.findIndex((item) => item.id === parseInt(req.query.id))
	if (postulantIndex !== -1) {
		Postulants[postulantIndex] = {
			id: Postulants[postulantIndex].id,
			first_name: req.query.first_name || Postulants[postulantIndex].first_name,
			last_name: req.query.last_name || Postulants[postulantIndex].last_name,
			user_name: req.query.user_name || Postulants[postulantIndex].user_name,
			email: req.query.email || Postulants[postulantIndex].email,
			password: req.query.password || Postulants[postulantIndex].password,
			birth_date:req.query.birth_date || Postulants[postulantIndex].birth_date,
			street:req.query.street || Postulants[postulantIndex].street,
			street_number:req.query.street_number || Postulants[postulantIndex].street_number,
			city:req.query.city || Postulants[postulantIndex].city,
			postal_code:req.query.postal_code || Postulants[postulantIndex].postal_code,
			province_code:req.query.province || Postulants[postulantIndex].province,
			country:req.query.country || Postulants[postulantIndex].country,
		}
		fs.writeFile('./data/postulants.json', JSON.stringify(Postulants), {}, (error) => {
			if (error) {
				res.status(400).send(error)
			} else {
				res.status(201).json(Postulants[postulantIndex])
			}
		})
	} else {
		res.status(404).send("Postulant not found")
	}
}

module.exports = {
	getPostulants,
	getOnePostulant,
	editPostulants
} 
