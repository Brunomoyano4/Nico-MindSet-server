const express = require('express');
const controller = require('../controllers/applications');
const validation = require("../validations/applications");
const router = express.Router();

const {
  createApplication,
  deleteApplication,
  getApplications,
  getApplicationById,
  updateApplication
} = controller;

const {validateApplicationCreation} = validation

router.post('/', validateApplicationCreation, createApplication);
router.delete('/:_id', deleteApplication);
router.get('/', getApplications);
router.get('/:_id', getApplicationById);
router.put('/:_id', updateApplication);

module.exports = router;