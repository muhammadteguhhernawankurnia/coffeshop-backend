const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = process.env;
const verifyToken = (req, res, next) => {
  const token = req.header('token');
  if (!req.header('token')) {
    return res.status(400).send({
      message: 'token is required',
    });
  } else {
    jwt.verify(token, JWT_PRIVATE_KEY, function (err, decoded) {
      if (!err) {
        //ini yg disebut authorization
        if (decoded.role === 'admin') {
          next();
        } else if (decoded.role === 'user') {
          return res.status(403).send({
            message: 'kamu tidak memiliki akses',
          });
        }
        console.log(decoded);
      } else {
        return res.statu(400).send({
          message: 'token tidak valid',
        });
      }
    });
  }
};

module.exports = verifyToken;
