const authModel = require('../model/auth.model');

const authController = {
  login: (req, res) =>
    authModel
      .login(req.body)
      .then((result) =>
        res.status(200).send({
          message: 'success',
          data: {
            user: result,
            token: 'adnajdjNjnjXJnd/,',
          },
        })
      )
      .catch((error) => res.status(500).send({ message: error })),

  register: (req, res) =>
    authModel
      .register(req.body)
      .then((result) =>
        res.status(200).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error })),
};

module.exports = authController;
