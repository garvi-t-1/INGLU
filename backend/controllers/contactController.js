const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    // Build a dynamic filter object
    let filter = {};

    if (search) {
      // Case-insensitive search across name, email, phone
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a contact
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    // Mongoose duplicate key error
    if (error.code === 11000) {
      res.status(400);
      error.message = 'A contact with this email already exists';
    }
    next(error);
  }
};

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return the updated document
        runValidators: true, // Re-run schema validators on update
      }
    );

    if (!contact) {
      res.status(404);
      throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    res.status(200).json({ success: true, message: 'Contact deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};