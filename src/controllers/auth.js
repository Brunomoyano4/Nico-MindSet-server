const Users = require('../models/Users');
const Firebase = require('../helper/firebase');

const register = async (req, res) => {
  try {
    const { email, password, displayName, role } = req.body;

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role,
    });
    // console.log(await Firebase.auth().getUserByEmail(email));
    const userCreated = new Users({
      email,
      role,
      firebaseUid: newFirebaseUser.uid,
    });

    const { firebaseUid } = await userCreated.save();

    return res.status(201).json({
      message: 'User created',
      data: firebaseUid,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  register,
};
