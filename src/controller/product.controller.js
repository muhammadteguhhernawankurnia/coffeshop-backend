const productModel = require('../model/product.model');

const productController = {
  get: (req, res) =>
    productModel
      .get(req.query)
      .then((result) =>
        res.status(200).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error })),

  getDetail: (req, res) => {
    const { id } = req.params;
    const result = productModel
      .getDetail(id)
      .then((result) =>
        res.status(200).send({
          message: `success get data id: ${id}`,
          data: result,
        })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },

  add: (req, res) => {
    const request = {
      ...req.body,
      file: req.files,
    };
    console.log(req.files); //multiple
    // console.log(req.file);//single
    return productModel
      .add(request)
      .then((result) => {
        res.status(201).send({ message: 'success', data: result });
      })
      .catch((error) => {
        res.status(500).send({ message: error });
      });
  },

  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .update(request)
      .then((result) =>
        res.status(201).send({ message: 'success', data: result })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },

  // eksplorasi kalian done
  remove: (req, res) => {
    const { id } = req.params;
    const result = productModel
      .remove(id)
      .then((result) =>
        res.status(200).send({
          message: `success delete data id: ${id}`,
          data: result,
        })
      )
      .catch((error) => res.status(500).send({ message: error }));
  },
};

module.exports = productController;
