const express = require('express')
const router = express.Router()

const interviews = require ('../controllers/interviews')
const missingInputsValidation = require ('../validations/interviews')

router.get("/", interviews.getInterviews)
router.get("/:id", interviews.getOneInterview)
router.post("/", missingInputsValidation, interviews.createInterview)
router.delete("/:id", interviews.deleteInterview)
router.put("/:id", interviews.editInterview)

module.exports = router