const firebase = require('../helper/firebase');

const postulant = 'postulant';
const psychologist = 'psychologist';
const admin = 'admin';

const authMiddlewarePostulant = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Undefined Token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const role = decodedToken?.role;
      if (role === postulant || role === psychologist || role === admin)
        return next();
      throw new Error('No User Privileges');
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

const authMiddlewarePsychologist = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Undefined Token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const role = decodedToken?.role;
      if (role === psychologist || role === admin) return next();
      throw new Error('No User Privileges');
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

const authMiddlewareAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Undefined Token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const role = decodedToken?.role;
      if (role === admin) return next();
      throw new Error('No User Privileges');
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = {
  authMiddlewarePostulant,
  authMiddlewarePsychologist,
  authMiddlewareAdmin,
};
