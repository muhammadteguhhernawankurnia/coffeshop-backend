const productModel = require('../model/product.model');
const { unlink } = require('node:fs');

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

  remove: (req, res) => {
    // const { id } = req.params;
    // const result = productModel
    //   .remove(id)
    return productModel
      .remove(req.params.id)
      .then((result) => {
        console.log(result[0].filename);
        for (let index = 0; index < result.length; index++) {
          unlink(`public/uploads/images/${result[index].filename}`, (err) => {
            if (err) throw err;
            console.log(`succesfully deleted ${result[index].filename}`);
          });
        }
        return res.status(201).send({
          message: 'success deleted',
          data: result,
        });
      })
      .catch((error) => res.status(500).send({ message: error }));
  },
};

module.exports = productController;
