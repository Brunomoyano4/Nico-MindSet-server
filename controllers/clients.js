const fs = require('fs');
const Clients = require('../data/clients.json');

const writeJson = (file, obj, res, msg, code) => {
  fs.writeFile(file, JSON.stringify(obj), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(code).send({
      msg: msg
    });
  });
}

const getClients = (req, res) => {
  res.status(200).json(Clients);
}

const getOneClient = (req, res) => {
  const index = Clients.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    res.status(200).json(Clients[index]);
  }
  res.status(400).json({ msg: `No client with the Id of ${req.query.id}` });
}

const createClient = (req, res) => {
  if (!req.query?.customer_name) {
    return res.status(400).send({
      msg: 'The customer name is missing'
    });
  }
  else if (!req.query?.branch) {
    return res.status(400).send({
      msg: 'The branch is missing'
    });
  }
  else if (!req.query?.phone) {
    return res.status(400).send({
      msg: 'The phone is missing'
    });
  }
  else if (!req.query?.email) {
    return res.status(400).send({
      msg: 'The email is missing'
    });
  }
  else if (!req.query?.description) {
    return res.status(400).send({
      msg: 'The description is missing'
    });
  }

  const {
    customer_name,
    branch,
    phone,
    email,
    description,
  } = req.query;

  const newClient = {
    id: (parseInt(Clients[Clients.length - 1].id) + 1).toString(),
    customer_name,
    branch,
    phone,
    email,
    description,
  }
  console.log(newClient)
  Clients.push(newClient);
  writeJson('./data/clients.json', Clients, res, 'Client Created', 201);
}

const editClient = (req, res) => {
  const index = Clients.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    Clients[index] = {
      id: Clients[index].id,
      customer_name: req.query.customer_name || Clients[index].customer_name,
      branch: req.query.branch || Clients[index].branch,
      phone: req.query.phone || Clients[index].phone,
      email: req.query.email || Clients[index].email,
      description: req.query.description || Clients[index].description,
    };
    writeJson('./data/clients.json', Clients, res, `Client ${req.query.id} Edited`, 200);
  }
  else { res.status(404).send({ msg: `Client ${req.query.id} not found` }) };
}

const deleteClient = (req, res) => {
  const index = Clients.findIndex((item) => item.id === req.query.id);
  if (index !== -1) {
    Clients.splice(index, 1)
    writeJson('./data/clients.json', Clients, res, `Client with id ${req.query.id} deleted`, 202);
  }
  else { res.status(404).send({ msg: `Client ${req.query.id} not found` }); }
}

module.exports = {
  getClients,
  getOneClient,
  editClient,
  createClient,
  deleteClient
}