const fs = require('fs')

const validateApplicationCreation = (req, res, next) => {
  if (!req.body?.postulantId && !req.body?.positionId) {
    return res.status(400).send({ msg: 'postulantId and positionId are empty' })
  }
  if (!req.body?.postulantId) {
    return res.status(400).send({ msg: 'postulantId is empty' })
  }
  if (!req.body?.positionId) {
    return res.status(400).send({ msg: 'positionId is empty' })
  }
  next()
}

module.exports = {
validateApplicationCreation
}