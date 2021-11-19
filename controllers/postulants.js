const fs = require("fs");
const Postulants = require("../models/Postulants");

const getPostulants = (req, res) => {
  Postulants.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          err.message || "There was an error while retrieving the postulants",
      });
    });
};

const getOnePostulant = (req, res) => {
  Postulants.findOne({ _id: req.params.id }, (error, postulant) => {
    if (!postulant) {
      return res.status(404).json({
        msg: `Postulant with id: ${req.params.id} was not found`,
      });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(postulant);
  });
};

const createPostulant = (req, res) => {
  const newPostulant = new Postulants({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    birthDate: req.body.birthDate,
    street: req.body.street,
    streetNumber: req.body.streetNumber,
    city: req.body.city,
    postalCode: req.body.postalCode,
    province: req.body.province,
    country: req.body.country,
    telephone: req.body.telephone,
    experience: req.body.experience,
    // experience: [
    //   {
    //     jobPosition: req.body.jobPosition,
    //     employer: req.body.employer,
    //     startDate: req.body.startDate,
    //     endDate: req.body.endDate,
    //     description: req.body.description,
    //   },
    // ],
  });
  newPostulant.save((error, postulant) => {
    if (error) {
      return res.status(400).json(error);
    }
    else {
      return res.status(201).json(postulant);
    }
    
  });
};

const editPostulants = (req, res) => {
  Postulants.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedPostulant) => {
      if (!updatedPostulant) {
        return res
          .status(404)
          .json({ msg: `Postulant with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(updatedPostulant);
    }
  );
};

const deletePostulants = (req, res) => {
  Postulants.findOneAndRemove(
    { _id: req.params.id },
    { useFindAndModify: false },
    (error, DeletedPostulant) => {
      if (!DeletedPostulant) {
        return res
          .status(404)
          .json({ msg: `Postulant with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).send({
        msg: `Postulant ${req.params.id} was deleted successfully`,
      });
    }
  );
};

module.exports = {
  getPostulants,
  getOnePostulant,
  createPostulant,
  editPostulants,
  deletePostulants,
};
