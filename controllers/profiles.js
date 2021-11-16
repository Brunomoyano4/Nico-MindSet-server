const fs = require('fs');
const Profiles = require('../models/profiles')

const getProfiles = (req, res) => {
  Profiles.find()
  .then((result) => {
    return res.status(200).json(result)     
  })
  .catch((error) => {
    return res.status(400).json(error)  
  })
}
const getOneProfile = (req, res) => {
  Profiles.find({_id: req.params.id})
  .then((result) => {
    return res.status(200).json(result)
  }) 
  .catch((error) => {
    return res.status(400).json({
       msg: `No profile with the Id of ${req.params.id}` 
      })
  })
}

const createProfile = (req, res) => {
  const newProfile = new Profiles ({
    profile_name: req.body.name,
    branch: req.body.branch,
    description: req.body.description
  })
  newProfile.save((error, profile) => {
    if (error) {
      return res.status(400).json(error)
    }
      return res.status(200).json(profile)
  })
}

const editProfile = (req, res) => {
  Profiles.findOneAndUpdate(req.params.id,
    {profile_name: req.body.name,
    branch: req.body.branch,
    description: req.body.description},
    {new : true}
  ) 
  .then((result) => {
    if (!result) {
      return res.status(400).json({
        msg:`Profile with id: ${req.params.id} was not found`
      })
    }
    return res.status(201).json(result)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const deleteProfile = (req, res) => { 
  Profiles.findOneAndDelete(req.params.id)
  .then((result) => {
    if(!result) {
      return res.status(400).json({
        msg: `Profile with id: ${req.params.id} was not found`
      })
    }
    return res.status(201).json(result)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

module.exports = {
	getProfiles,
  getOneProfile,
  createProfile,
  deleteProfile,
  editProfile
}