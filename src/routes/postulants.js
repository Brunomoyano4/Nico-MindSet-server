const router = require('express').Router();
const {
  getPostulants,
  getOnePostulant,
  createPostulant,
  editPostulants,
  deletePostulants,
} = require('../controllers/postulants');
const { missingInputs } = require('../validations/postulants');
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');

router.get('/', authMiddlewareAdmin, getPostulants);
router.get('/:id', authMiddlewareAdmin, getOnePostulant);
router.post('/', authMiddlewareAdmin, missingInputs, createPostulant);
router.put('/:id', authMiddlewareAdmin, editPostulants);
router.delete('/:id', authMiddlewareAdmin, deletePostulants);

module.exports = router;
