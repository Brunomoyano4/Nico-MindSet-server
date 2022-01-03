const Users = require('../models/Users');
const Postulants = require('../models/Postulants');
const Firebase = require('../helper/firebase');

const register = async (req, res) => {
  let savedNewPostulant;
  try {
    const { email, password, userName: displayName } = req.body;
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
      contactRange: req.body.contactRange,
      availabilty: req.body.availabilty,
      experience: req.body.experience,
      profiles: req.body.profiles,
    });
    savedNewPostulant = await newPostulant.save();

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: 'postulant',
      mongoDBID: savedNewPostulant._id,
    });

    const userCreated = new Users({
      email,
      role: 'postulant',
      firebaseUID: newFirebaseUser.uid,
      mongoDBID: savedNewPostulant._id,
    });
    const { firebaseUID } = await userCreated.save();

    return res.status(201).json({
      message: 'User created',
      data: { firebaseUID, userData: savedNewPostulant },
    });
  } catch (error) {
    Postulants.findOneAndRemove(
      { _id: savedNewPostulant._id },
      { useFindAndModify: false },
      () => res.status(400).json({ message: error.toString() })
    );
  }
};

module.exports = {
  register,
};
