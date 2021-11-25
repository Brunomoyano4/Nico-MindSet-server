const express = require('express');
const controller = require('../controllers/sessions');
const validation = require("../validations/sessions");
const router = express.Router();

const {
  getSessions,
  getOneSession,
  createSession,
  deleteSession
} = controller;

/*const {
  validateSessionCreation,
  validateTimeOfSession
} = validation;*/

router.post('/', /*validateSessionCreation, validateTimeOfSession,*/ createSession);
router.delete('/:id', deleteSession);
router.get('/', getSessions);
router.get('/:id', getOneSession);

module.exports = router;