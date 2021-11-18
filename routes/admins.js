const router = require("express").Router();
const {findAllAdmins,findOneAdmin,createAdmin,updateAdmin,deleteAdmin} = require("../controllers/admins");
const {validateBodyContent, validateAdminCreation} = require("../validations/admins")


router.get("/", findAllAdmins);
router.get("/:id", findOneAdmin);
router.post("/", validateAdminCreation, createAdmin);
router.put("/:id", validateBodyContent, updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;