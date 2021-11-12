const router = require("express").Router();
const admins = require("../controllers/admins");

router.get("/", admins.findAllAdmins);
router.get("/:id", admins.findOneAdmin);
router.post("/", admins.createAdmin);
router.put("/:id", admins.updateAdmin);
router.delete("/:id", admins.deleteAdmin);

module.exports = router;