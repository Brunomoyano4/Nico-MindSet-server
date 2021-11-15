const express = require('express')
const router = express.Router()

const profile = require ('../controllers/profiles')
const missingInputs = require ('../validations/profiles')

router.get("/", profile.getProfiles)
router.get("/:id", profile.getOneProfile)
router.post("/", missingInputs, profile.createProfile)
router.delete("/:id", profile.deleteProfile)
router.put("/:id", missingInputs, profile.editProfile)

module.exports = router