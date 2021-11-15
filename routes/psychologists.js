const express = require('express')
const router = express.Router()

const psychologists = require ('../controllers/psychologists')
/*const psychologistsValidation = require ('../validations/psychologists')*/

router.get("/", psychologists.getPsychologists)
router.get("/:id", psychologists.getOnePsychologist)
router.post("/", psychologists.createPsychologist)
router.delete("/:id", psychologists.deletePsychologist)
router.put("/:id", psychologists.editPsychologist)

module.exports = router