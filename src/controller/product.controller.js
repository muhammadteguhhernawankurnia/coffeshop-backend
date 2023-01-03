const productModel = require("../model/product.model");

const productController = {
  get: (req, res) => {
    return productModel
      .get(req.query)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

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

  getDetail: (req, res) => {
    const id = req.params.id;
    const result = productModel
      .getDetail(id)
      .then((result) => {
        return res.status(200).send({
          message: `success get data id: ${id}`,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    return productModel
      .add(req.body)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .update(request)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  //eksplorasi kalian done
  remove: (req, res) => {
    const id = req.params.id;
    const result = productModel
      .remove(id)
      .then((result) => {
        return res.status(200).send({
          message: `success delete data id: ${id}`,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = productController;
