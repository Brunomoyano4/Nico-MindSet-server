const fs = require('fs')
const Postulants = require('../models/Postulants')

const getPostulants = (req, res) => {
	Postulants.find({})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      msg: err.message || "There was an error while retrieving the postulants",
    });
  });
}

const getOnePostulant = (req, res) => {
  Postulants.findOne({ _id: req.params.id },
    (error, postulant) => {
      if (!postulant) {
        return res.status(404).json
        ({
          msg: `Postulant with id: ${req.params.id} was not found`
        })
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(postulant)
    }
  )
};

const createPostulant = (req, res) => {
  const newPostulant = new Postulants({
    first_name: req.body.first_name, 
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    birth_date: req.body.birth_date,
    street: req.body.street,
    street_number: req.body.street_number,
    city: req.body.city,
    postal_code: req.body.postal_code,
    province: req.body.province,
    country: req.body.country,
    telephone: req.body.telephone,
    experience: req.body.experience 
    [{
        job_position: req.body.job_position,
        employer: req.body,
        star_date: req.body.star_date,
        end_date: req.body.end_date,
        description: req.body.description
    }]
  })
  newPostulant.save((error, postulant) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(postulant)
  })
};

const editPostulants = (req, res) => {
  Postulants.findByIdAndUpdate(req.params.id,
    req.body,
    { new: true },
    (error, updatedPostulant) => {
      if (!updatedPostulant) {
        return res.status(404).json({msg: `Postulant with id: ${req.params.id} was not found`})
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(updatedPostulant)
    }
  )
};

const deletePostulants = (req, res) => {
  Postulants.findOneAndRemove({ _id: req.params.id },{useFindAndModify: false },
    (error, DeletedPostulant) => {
      if (!DeletedPostulant) {
        return res.status(404).json({msg: `Postulant with id: ${req.params.id} was not found`})
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).send({
        msg: `Postulant ${req.params.id} was deleted successfully`
      });
    }
  )
};

module.exports = {
	getPostulants,
	getOnePostulant,
	createPostulant,
  editPostulants,
	deletePostulants
}