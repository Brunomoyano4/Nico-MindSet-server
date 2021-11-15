const express = require('express');
const controller = require('../controllers/sessions');
// const validation = require("../validations/sessions");
const router = express.Router();

const {
  getSessions,
  getOneSession,
  createSession,
  deleteSession
} = controller;

// const {validateSessionCreation} = validation

router.post('/',/*validateApplicationCreation,*/ createSession);
router.delete('/:_id', deleteSession);
router.get('/', getSessions);
router.get('/position/:_id', getOneSession);

module.exports = router;