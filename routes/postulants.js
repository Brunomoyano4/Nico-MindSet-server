const router = require("express").Router();
const {getPostulants,getOnePostulant,createPostulant,editPostulants,deletePostulants} = require("../controllers/postulants");
const {validateBodyContent, validatePostulantCreation} = require("../validations/postulants")


router.get("/", getPostulants);
router.get("/:id", getOnePostulant);
router.post("/", validatePostulantCreation, createPostulant);
router.put("/:id", validateBodyContent, editPostulants);
router.delete("/:id", deletePostulants);

module.exports = router;