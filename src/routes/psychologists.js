const express = require('express')
const router = express.Router()

const psychologists = require ('../controllers/psychologists')
const {createPsychologistValidation, editPsychologistValidation} = require ('../validations/psychologists')

router.get("/", psychologists.getPsychologists)
router.get("/:id", psychologists.getOnePsychologist)
router.post("/", createPsychologistValidation, psychologists.createPsychologist)
router.delete("/:id", psychologists.deletePsychologist)
router.put("/:id", editPsychologistValidation, psychologists.editPsychologist)

module.exports = router