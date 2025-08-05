const supplier = require('../../models/supplier.js');

const supplierAPI = {

    // GET /suppliers - list all suppliers as JSON
    index (req, res) {
      res.json(res.locals.data.suppliers)
    },

    // GET /suppliers/:id - get one supplier by id
    show (req, res) {
      res.json(res.locals.data.supplier)
    },

    // POST /suppliers - create a new supplier
    create (req, res) {
        res.status(201).json(res.locals.data.supplier)
    },

    // PUT /suppliers/:id - update supplier by id
    update (req, res) {
        res.json(res.locals.data.supplier)
    },

    // DELETE /suppliers/:id - delete supplier by id
    destroy (req, res) {
        res.status(200).json({ message: 'supplier deleted' })
    }
}

module.exports = supplierAPI