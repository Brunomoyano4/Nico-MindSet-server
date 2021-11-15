const express = require('express');
const controller = require('../controllers/applications');
const validation = require("../validations/applications");
const router = express.Router();

const {
  createApplication,
  deleteApplication,
  getApplications,
  getApplicationByPositionId,
  getApplicationByPostulantId,
} = controller;

const {validateApplicationCreation} = validation

router.post('/', validateApplicationCreation, createApplication);
router.delete('/:_id', deleteApplication);
router.get('/', getApplications);
router.get('/position/:positionId', getApplicationByPositionId);
router.get('/postulant/:postulantId', getApplicationByPostulantId);

module.exports = router;