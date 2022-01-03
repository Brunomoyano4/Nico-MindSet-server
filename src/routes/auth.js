const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validations/auth');

const router = express.Router();

const { registerPostulant, registerPsychologist, registerAdmin } = controller;

router.post('/register', validations.required, registerPostulant);
router.post(
  '/register/psychologist',
  validations.required,
  registerPsychologist
);
router.post('/register/admin', validations.required, registerAdmin);

module.exports = router;
