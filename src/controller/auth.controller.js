const authModel = require('../model/auth.model');
const bcrypt = require('bcrypt');

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        return res.status(200).send({
          message: 'success',
          data: {
            user: result,
            token: '*Xkjkdfndk',
          },
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  register: (req, res) => {
    // if(req.body.password == 0){

    // } validasi eksplorasi pr bikin validasi kalo password kurang dari 6 karakter dll
    console.log(req.body.password);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          username: req.body.username,
          password: hash,
        };
        return authModel
          .register(request)
          .then((result) => {
            return res.status(200).send({ message: 'success', data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },
};

module.exports = authController;
