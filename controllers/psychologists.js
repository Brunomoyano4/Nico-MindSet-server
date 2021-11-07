const fs = require('fs')
const Psychologists = require('../data/psychologists.json')
const getPsychologistIndex = (req) => {
  return (Psychologists.findIndex((item) => item.id === req.query.id))
}
const writeFile = (file, obj) => {
  fs.writeFile(file, JSON.stringify(obj), {}, (error) => {
    if (error) {
      res.status(400).send(error)
    }
  })
}

// Get All Psychologysts
const getPsychologists = (req, res) => {
	res.status(200).json(Psychologists);
}

// Get One Psychologysts
const getOnePsychologist = (req, res) => {
	const psychologistIndex = getPsychologistIndex(req);
	if (psychologistIndex != -1) {
		res.status(200).json(Psychologists[psychologistIndex])
	}
	else {
		res.status(400).json({ msg: `No psychologist with the Id of ${req.query.id}` })
	}
}

// Create New Psychologyst
const createPsychologist = (req,res) => {
  if (Object.keys(req.query).length === 0){
    return res.status(400).send({
      msg: 'Missing all files'
  });
  }
  if (!req.query?.first_name){
    return res.status(400).send({
      msg: 'The first name is missing'
    });
  }
  else if (!req.query?.last_name){
    return res.status(400).send({
      msg: 'The last name is missing'
  });
  }
  else if (!req.query?.user_name){
    return res.status(400).send({
      msg: 'The user name is missing'
  });
  }
  else if (!req.query?.email){
    return res.status(400).send({
      msg: 'The email is missing'
  });
  }
  else if (!req.query?.password){
    return res.status(400).send({
      msg: 'The password is missing'
  });
  }

  const {
    first_name,
    last_name,
    user_name,
    email,
    password,
  } = req.query;

  const newPsychologist = {
    id: (parseInt((Psychologists.length) + 1)).toString(),
    first_name,
    last_name,
    user_name,
    email,
    password,
  }

  Psychologists.push(newPsychologist);
  writeFile('./data/psychologists.json', Psychologists)
  return res.status(201).send({
    msg: 'Psychologist Created'
  })
}

// Edit Existing Psychologist
const editPsychologist = (req, res) => {
	const psychologistIndex = getPsychologistIndex(req);
	if (psychologistIndex != -1) {
		Psychologists[psychologistIndex] = {
			id: Psychologists[psychologistIndex].id,
			first_name: req.query.first_name || Psychologists[psychologistIndex].first_name,
			last_name: req.query.last_name || Psychologists[psychologistIndex].last_name,
			user_name: req.query.user_name || Psychologists[psychologistIndex].user_name,
			email: req.query.email || Psychologists[psychologistIndex].email,
			password: req.query.password || Psychologists[psychologistIndex].password,
		}
		fs.writeFile('./data/psychologists.json', JSON.stringify(Psychologists), {}, (error) => {
			if (error) {
				res.status(400).send(error)
			} else {
				res.status(201).json(Psychologists[psychologistIndex])
			}
		});
	} else {
		res.status(404).send('Psychologist not found');
	}
}

// Delete Existing Psychologist
const deletePsychologist = (req, res) => {
	const psychologistIndex = getPsychologistIndex(req);
	if (psychologistIndex != -1) {
		res.status(202).send({
			msg: `Psychologist with id ${req.query.id} deleted`
		});
		Psychologists.splice(psychologistIndex, 1)
		fs.writeFile('./data/psychologists.json', JSON.stringify(Psychologists), {}, (error) => {
			if (error) {
				res.status(400).send(error)
			} else {
				res.status(200).json(Psychologists[psychologistIndex])
			}
		});
	}
	else {
		res.status(404).send('Psychologist not found');
	}
}

module.exports = {
	getPsychologists,
	getOnePsychologist,
	editPsychologist,
	deletePsychologist,
  createPsychologist
}