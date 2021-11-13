const express = require('express');
const controller = require('../controllers/applications');

const router = express.Router();

const {
  createApplication,
  deleteApplication,
  getApplications,
  getApplicationByPositionId,
  getApplicationByPostulantId,
} = controller;

router.post('/', createApplication);
router.delete('/:id', deleteApplication);
router.get('/', getApplications);
router.get('/:positionId', getApplicationByPositionId);
router.get('/:postulantId', getApplicationByPostulantId);

module.exports = router;