const Product = require('../../models/product.js');

const productAPI = {

    // GET /products - list all products as JSON
    index (req, res) {
      res.json(res.locals.data.products)
    },

    // GET /products/:id - get one product by id
    show (req, res) {
      res.json(res.locals.data.product)
    },

    // POST /products - create a new product
    create (req, res) {
        res.status(201).json(res.locals.data.product)
    },

    // PUT /products/:id - update product by id
    update (req, res) {
        res.json(res.locals.data.product)
    },

    // DELETE /products/:id - delete product by id
    destroy (req, res) {
        res.status(200).json({ message: 'Product deleted' })
    }
}

module.exports = productAPI