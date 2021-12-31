// const Users = require('../models/Users');
const Firebase = require('../helper/firebase');

const register = async (req, res) => {
  try {
    const { email, password, displayName, role } = req.body;

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });
    // console.log(newFirebaseUser);

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role,
    });
    console.log(await Firebase.auth().getUserByEmail(email));
    // const userCreated = new Users({
    //   email: req.body.email,
    //   firebaseUid: newFirebaseUser.uid,
    // });
    // const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created',
      data: newFirebaseUser.uid,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  register,
};
