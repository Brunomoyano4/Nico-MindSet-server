const Admin = require('../models/Admins.js')

exports.createAdmin = (req, res) => {
  if (
    !req.body?.first_name ||
    !req.body?.last_name ||
    !req.body?.user_name ||
    !req.body?.email ||
    !req.body?.password
  ) {
    return res.status(400).send({
      msg: "There are missing inputs",
    });
  }
  const admin = new Admin({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
  });

  admin
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        msg: e.message || "There was an error during admin creation",
      });
    });
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
  Admin.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          msg: `Admin with id ${req.params.id} was not found`,
        });
      }
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        msg: e.message || "There was an error while retrieving admins",
      });
    });
};


exports.updateAdmin = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      msg: "Data to update can not be empty!",
    });
  }

  Admin.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update admin with the id: ${id},admin was not found!`,
        });
      } else
        res.send({
          message: `Admin with the id: ${id} was update successfully.`,
        });
    })
    .catch((e) => {
      res.status(500).send({
        msg: e.message || `Error updating the admin with id: ${id}`,
      });
    });
};


exports.deleteAdmin = (req, res) => {
  Admin.findOneAndRemove({ id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          msg: "Admin not found",
        });
      } else {
        res.send({
          msg: "Admin was deleted successfully",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({
        msg: `Error while deleting admin with id ${id}`,
      });
    });
};
