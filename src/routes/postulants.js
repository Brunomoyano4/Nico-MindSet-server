const router = require("express").Router();
const {
  getPostulants,
  getOnePostulant,
  createPostulant,
  editPostulants,
  deletePostulants,
} = require("../controllers/postulants");
const { missingInputs } = require("../validations/postulants");

router.get("/", getPostulants);
router.get("/:id", getOnePostulant);
router.post("/", missingInputs, createPostulant);
router.put("/:id", editPostulants);
router.delete("/:id", deletePostulants);

module.exports = router;
