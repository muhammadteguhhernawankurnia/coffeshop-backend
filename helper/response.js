const response = {};

// response.successResponse = (res, status, data) => {
//   res.status(status).json({
//     data,
//     err: null,
//   });
// };

response.successResponse = (status, message, result, res) => {
  res.send({ status: status, message: message, result: result });
};

response.errorResponse = (res, status, err) => {
  res.status(status).json({
    err,
    data: [],
  });
};
// response.js belum dipake
module.exports = response;
