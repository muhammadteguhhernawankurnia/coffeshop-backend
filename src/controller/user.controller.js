const userModel = require('../model/user.model');
// get all done
const userController = {
  get: (req, res) =>
    userModel
      .get(req.query)
      .then((result) =>
        res.status(200).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error })),
  // get detail done
  getDetail: (req, res) => {
    const { email } = req.params;
    const result = userModel
      .getDetail(email)
      .then((result) =>
        res.status(200).send({
          message: `success get data email: ${email}`,
          data: result,
        })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },
  // Add ok
  add: (req, res) =>
    userModel
      .add(req.body)
      .then((result) =>
        res.status(201).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error })),
  //
  update: (req, res) => {
    const request = {
      ...req.body,
      email: req.params.email,
    };
    return userModel
      .update(request)
      .then((result) =>
        res.status(201).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },

  // eksplorasi kalian done
  remove: (req, res) => {
    const { email } = req.params;
    const result = userModel
      .remove(email)
      .then((result) =>
        res.status(200).send({
          message: `success delete data email: ${email}`,
          data: result,
        })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },
};

module.exports = userController;
