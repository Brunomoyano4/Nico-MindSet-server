const fs = require('fs')
const Admins = require('../data/admins.json')

const getAdmins = (req, res) => {
	res.status(200).json(Admins)
}

const editAdmin = (req, res) => {
	const adminIndex = Admins.findIndex((item) => item.id === req.query.id)
	if(adminIndex !== -1) {
		Admins[adminIndex] = {
			id: Admins[adminIndex].id,
			first_name: req.query.first_name || Admins[adminIndex].first_name,
			last_name: req.query.last_name || Admins[adminIndex].last_name,
			user_name: req.query.user_name || Admins[adminIndex].user_name,
			email: req.query.email || Admins[adminIndex].email,
			password: req.query.password || Admins[adminIndex].password,
		}
		fs.writeFile('./data/admins.json', JSON.stringify(Admins), {}, (error) => {
			if(error) {
				res.status(400).send(error)
			} else {
				res.status(201).json(Admins[adminIndex])
			}
		})
	} else {
		res.status(404).send("Admin not found")
	}
}

module.exports = {
	getAdmins,
	editAdmin,
}