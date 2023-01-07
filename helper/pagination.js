// get: (req, res) => {
//   const currentPage = req.body.page || 1;
//   const perPage = req.body.limit || 5;
//   let totalItems;

//   return productModel
//     .find()
//     .countDocuments()
//     .then((count) => {
//       totalItems = count;
//       return productModel
//         .find()
//         .skip((parseInt(currentPage) - 1) * parseInt(perPage))
//         .limit(parseInt(perPage));
//     })
//     .get(req.query)
//     .then((result) => {
//       return res.status(200).send({
//         message: "success",
//         data: result,
//         total_data: totalItems,
//         per_page: parseInt(perPage),
//         current_page: parseInt(currentPage),
//       });
//     })
//     .catch((error) => {
//       return res.status(500).send({ message: error });
//     });
// },
