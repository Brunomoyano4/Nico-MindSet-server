const required = (req, res, next) => {
  if(!req.body.customer_name) {
    return res.status(400).send("Customer name is required")
  }
  if(!req.body.branch) {
    return res.status(400).send("Branch is required")
  }
  if(!req.body.phone) {
    return res.status(400).send("Phone is required")
  }
  if(!req.body.email) {
    return res.status(400).send("Email is required")
  }
  if(!req.body.description) {
    return res.status(400).send("Description is required")
  }
  next()
}

module.exports={
  required,
}