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

const deletePostulants = (req, res) => {

	const postulantIndex = Postulants.findIndex((item) => item.id === parseInt(req.query.id))
	if (postulantIndex !== -1) {
		res.status(202).send({
			msg: `Postulant with id ${req.query.id} deleted`
		});
		Postulants.splice(postulantIndex, 1)
		fs.writeFile('./data/postulants.json', JSON.stringify(Postulants), {}, (error) => {
			if (error) {
				res.status(400).send(error)
			} else {
				res.status(200).json(Postulants[postulantIndex])
			}
		});
	}
	else {
		res.status(400).json({ msg: `No postulant with the id of ${req.query.id}` });
	}
}

const createPostulant = (req, res) =>{
	const postulantIndex=Postulants.length+1
	const newPostulantIndex=postulantIndex.toString()
	if(req.query.first_name==undefined){
		res.status(400).send({
			msg: `Please enter a name`
		});
	} 
	else if(req.query.last_name==undefined){
		res.status(400).send({
			msg: `Please enter a last name`
		});
	}
	else if(req.query.user_name==undefined){
		res.status(400).send({
			msg: `Please enter an user name`
		});
	}
	else if(req.query.email==undefined){
		res.status(400).send({
			msg: `Please enter an email`
		});
	}
	else if(req.query.password==undefined){
		res.status(400).send({
			msg: `Please enter a password`
		});
	}
	else if(req.query.birth_date==undefined){
		res.status(400).send({
			msg: `Please enter a birth_date`
		});
	}
	else if(req.query.street==undefined || req.query.street_number==undefined ){
		res.status(400).send({
			msg: `Please enter a street adress`
		});
	}
	else if(req.query.city==undefined){
		res.status(400).send({
			msg: `Please enter a city`
		});
	}
	else if(req.query.postal_code==undefined){
		res.status(400).send({
			msg: `Please enter a postal_code`
		});
	}
	else if(req.query.province==undefined){
		res.status(400).send({
			msg: `Please enter a province`
		});
	}
	else if(req.query.country==undefined){
		res.status(400).send({
			msg: `Please enter a country`
		});
	}
	else if(req.query.telephone==undefined){
		res.status(400).send({
			msg: `Please enter a telephone`
		});
	}
	else{
		const newPostulant={
			id:parseInt(newPostulantIndex),
			first_name: req.query.first_name,
			last_name: req.query.last_name,
			user_name: req.query.user_name,
			email: req.query.email,
			password: req.query.password,
			birth_date:req.query.birth_date,
			street:req.query.street,
			street_number:req.query.street_number,
			city:req.query.city,
			postal_code:req.query.postal_code,
			province:req.query.province,
			country:req.query.country,
			telephone:req.query.telephone
		}
		res.status(202).send({
			msg: `Postulant with id ${newPostulantIndex} created`
		});
		Postulants.push(newPostulant)
	}		
}

module.exports = {
	getPostulants,
	getOnePostulant,
	editPostulants,
	deletePostulants,
	createPostulant
} 
