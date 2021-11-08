const fs = require('fs');
const Psychologists = require('../data/psychologists.json');

const getPsychologistIndex = (req) => {
  return (Psychologists.findIndex((item) => item.id === req.query.id));
}

const writeFile = (file, obj, msg, res, code) => {
  fs.writeFile(file, JSON.stringify(obj), {}, (error) => {
    if (error) {
      return res.status(400).send(error);
    }
    return res.status(code).send({
      msg: msg
    });
  });
}

const getPsychologists = (req, res) => {
	res.status(200).json(Psychologists);
}

const getOnePsychologist = (req, res) => {
  const psychologistIndex = getPsychologistIndex(req);
  if (psychologistIndex !== -1) {
    return res.status(200).json(Psychologists[psychologistIndex]);
  }
  return res.status(400).json({ msg: `No psychologist with the Id of ${req.query.id}` });
}

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
    id: (parseInt(Psychologists[Psychologists.length - 1].id) + 1).toString(),
    first_name,
    last_name,
    user_name,
    email,
    password,
  }
  Psychologists.push(newPsychologist);
  return writeFile('./data/psychologists.json', Psychologists, 'Psychologist Created', res, 201);
}

const editPsychologist = (req, res) => {
  const psychologistIndex = getPsychologistIndex(req);
  if (psychologistIndex !== -1) {
    Psychologists[psychologistIndex] = {
      id: Psychologists[psychologistIndex].id,
      first_name: req.query.first_name || Psychologists[psychologistIndex].first_name,
      last_name: req.query.last_name || Psychologists[psychologistIndex].last_name,
      user_name: req.query.user_name || Psychologists[psychologistIndex].user_name,
      email: req.query.email || Psychologists[psychologistIndex].email,
      password: req.query.password || Psychologists[psychologistIndex].password,
    };
    return writeFile('./data/psychologists.json', Psychologists, 'Psychologist Edited', res, 201);
  }
  return res.status(404).send('Psychologist not found');
}

const deletePsychologist = (req, res) => {
	const psychologistIndex = getPsychologistIndex(req);
	if (psychologistIndex !== -1) {
    Psychologists.splice(psychologistIndex, 1)
    return writeFile('./data/psychologists.json', Psychologists, `Psychologist with id ${req.query.id} deleted`, res, 202);
	}
  return res.status(404).send('Psychologist not found');
}

module.exports = {
	getPsychologists,
	getOnePsychologist,
	editPsychologist,
  createPsychologist,
	deletePsychologist
}