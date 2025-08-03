const supplier = require('../../models/supplier');
const supplierAPI = {}

const normalizeAvailableField = (body) => {
  body.available = body.available === true || body.available === 'on'
  return body
}

// GET /suppliers - list all suppliers as JSON
supplierAPI.index = async (req, res) => {
  try {
    const suppliers = await supplier.find({})
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /suppliers/:id - get one supplier by id
supplierAPI.show = async (req, res) => {
  try {
    const supplier = await supplier.findById(req.params.id)
    if (!supplier) {
      return res.status(404).json({ error: 'supplier not found' })
    }
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /suppliers - create a new supplier
supplierAPI.create = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const newsupplier = await supplier.create(req.body)
    res.status(201).json(newsupplier)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// PUT /suppliers/:id - update supplier by id
supplierAPI.update = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const updatedsupplier = await supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedsupplier) {
      return res.status(404).json({ error: 'supplier not found' })
    }
    res.status(200).json(updatedsupplier)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /suppliers/:id - delete supplier by id
supplierAPI.destroy = async (req, res) => {
  try {
    const deleted = await supplier.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'supplier not found' })
    }
    res.status(200).json({ message: 'supplier deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = supplierAPI