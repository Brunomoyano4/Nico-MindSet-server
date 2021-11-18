const validateAdminCreation = (req, res, next) => {
  if(!req.body?.first_name) {
    return res.status(400).send("First name is missing")
  }
  if(!req.body?.last_name) {
    return res.status(400).send("Last name is missing")
  }
  if(!req.body?.user_name) {
    return res.status(400).send("Username is missing")
  }
  if(!req.body?.email) {
    return res.status(400).send("Email is missing")
  }
  if(!req.body?.password) {
    return res.status(400).send("Password is missing")
  }
  next()
}

const validateBodyContent = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }
  next()
}

module.exports = {
  validateAdminCreation,
  validateBodyContent
} 
