const order = require('../../models/order.js');

const orderAPI = {

    // GET /orders - list all orders as JSON
    index (req, res) {
      res.json(res.locals.data.orders)
    },

    // GET /orders/:id - get one order by id
    show (req, res) {
      res.json(res.locals.data.order)
    },

    // POST /orders - create a new order
    create (req, res) {
        res.status(201).json(res.locals.data.order)
    },

    // PUT /orders/:id - update order by id
    update (req, res) {
        res.json(res.locals.data.order)
    },

    // DELETE /orders/:id - delete order by id
    destroy (req, res) {
        res.status(200).json({ message: 'order deleted' })
    }
}

module.exports = orderAPI