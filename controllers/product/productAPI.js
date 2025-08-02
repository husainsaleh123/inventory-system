const Product = require('../../models/product');
const productAPI = {}

const normalizeAvailableField = (body) => {
  body.available = body.available === true || body.available === 'on'
  return body
}

// GET /products - list all products as JSON
productAPI.index = async (req, res) => {
  try {
    const products = await product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /products/:id - get one product by id
productAPI.show = async (req, res) => {
  try {
    const product = await product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /products - create a new product
productAPI.create = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const newproduct = await product.create(req.body)
    res.status(201).json(newproduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// PUT /products/:id - update product by id
productAPI.update = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const updatedproduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedproduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(updatedproduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /products/:id - delete product by id
productAPI.destroy = async (req, res) => {
  try {
    const deleted = await product.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = productAPI