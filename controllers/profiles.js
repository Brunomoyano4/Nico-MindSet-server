const fs = require('fs');
const Profiles = require('../data/profiles.json');

const writeJson = (file, obj, res, msg, code) => {
  fs.writeFile(file, JSON.stringify(obj), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(code).send({
      msg: msg
    });
  });
}

const getProfiles = (req, res) => {
  res.status(200).json(Profiles);
}

const getOneProfile = (req, res) => {
  const index = Profiles.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    res.status(200).json(Profiles[index]);
  }
  res.status(400).json({ msg: `No profile with the Id of ${req.query.id}` });
}

const createProfile = (req, res) => {
  if (!req.query?.profile_name) {
    return res.status(400).send({
      msg: 'The profile name is missing'
    });
  }
  else if (!req.query?.branch) {
    return res.status(400).send({
      msg: 'The branch is missing'
    });
  }
  else if (!req.query?.description) {
    return res.status(400).send({
      msg: 'The description is missing'
    });
  }
  const {
    profile_name,
    branch,
    description,
  } = req.query;
  const newProfile = {
    id: (parseInt(Profiles[Profiles.length - 1].id) + 1).toString(),
    profile_name,
    branch,
    description,
  }
  Profiles.push(newProfile);
  writeJson('./data/profiles.json', Profiles, res, 'Profile Created', 201);
}

const editProfile = (req, res) => {
  const index = Profiles.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    Profiles[index] = {
      id: Profiles[index].id,
      profile_name: req.query.profile_name || Profiles[index].profile_name,
      branch: req.query.branch || Profiles[index].branch,
      description: req.query.description || Profiles[index].description,
    };
    writeJson('./data/profiles.json', Profiles, res, `Profile ${req.query.id} Edited`, 200);
  }
  else { res.status(404).send({ msg: `Profile ${req.query.id} not found` }) };
}

const deleteProfile = (req, res) => {
  const index = Profiles.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    Profiles.splice(index, 1)
    writeJson('./data/profiles.json', Profiles, res, `Profile with id ${req.query.id} deleted`, 202);
  }
  else { res.status(404).send({ msg: `Profile ${req.query.id} not found` }); }
}

module.exports = {
  getProfiles,
  getOneProfile,
  editProfile,
  createProfile,
  deleteProfile
}