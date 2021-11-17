const missingInputsValidation = (req, res, next) => {
  let pos = post = date = time = stat = "";
  let okey = true;
  if (!req.body.positionId) {
    pos= 'positionId, '
    okey= false
  }
  if (!req.body.postulantId) {
    post='postulantId, '
    okey=false
  }
  if (!req.body.dateTime) {
    date='date, '
    okey=false
  }
  if (!req.body.status) {
    stat='status, '
    okey=false
  }
  if (!okey){ 
    res.status(400).send({ msg: pos + post + date + time + stat + 'are missing'})
  }
  next()
}

module.exports = missingInputsValidation