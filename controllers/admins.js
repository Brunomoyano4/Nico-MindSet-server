const Admin = require('../models/Admins');

exports.createAdmin = (req, res) => {
  const admin = new Admin({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
  });

  admin.save((error, admin) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(admin)
  })
};

exports.findAllAdmins = (req, res) => {
  Admin.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        msg: e.message || "There was an error while retrieving admins",
      });
    });
};

exports.findOneAdmin = (req, res) => {
  Admin.findOne({ _id: req.params.id },
    (error, admin) => {
      if (!admin) {
        return res.status(404).json({
          msg: `Admin with id: ${req.params.id} was not found`
        })
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(admin)
    }
  )
};

exports.updateAdmin = (req, res) => {
  Admin.findByIdAndUpdate(req.params.id,
    req.body,
    { new: true },
    (error, updatedAdmin) => {
      if (!updatedAdmin) {
        return res.status(404).json({
          msg: `Admin with id: ${req.params.id} was not found`
        })
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(updatedAdmin)
    }
  )
};

exports.deleteAdmin = (req, res) => {
  Admin.findOneAndRemove({ _id: req.params.id },
    { useFindAndModify: false },
    (error, adminDeleted) => {
      if (!adminDeleted) {
        return res.status(404).json({
          msg: `Admin with id: ${req.params.id} was not found`
        })
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).send({
        msg: `Admin ${req.params.id} was deleted successfully`
      });
    }
  )
};