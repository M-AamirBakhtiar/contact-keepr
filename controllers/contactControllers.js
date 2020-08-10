const Contact = require('../models/contactModel');
const catchAsync = require('../middleware/catchAsync');
const ErrorResponse = require('../utils/errorResponse');

// @description     Get All Contacts
// @route           GET /api/v1/contacts
// @access          Private
exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: contacts,
  });
});

// @description     Add a New Contact
// @route           POST /api/v1/contacts
// @access          Private
exports.addContact = catchAsync(async (req, res, next) => {
  const { name, email, phone, type } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: contact,
  });
});

// @description     Update an Existing Contact
// @route           PUT /api/v1/contacts/:id
// @access          Private
exports.updateContact = catchAsync(async (req, res, next) => {
  // Search Contact in DataBase using the id from Request URL
  let contact = await Contact.findById(req.params.id);

  // If Contact is not found Return with Error
  if (!contact) {
    return next(
      new ErrorResponse(`Cant no find contact by ID ${req.params.id}`, 404)
    );
  }

  // Check to see if the Current User is the Owner of the Contact if not Return Error
  if (contact.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not Authorized', 401));
  }

  // If the User is Owner then Update the Contact and Return Response
  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: contact,
  });
});

// @description     Delete an Existing Contact
// @route           DELETE /api/v1/contacts/:id
// @access          Private
exports.deleteContact = catchAsync(async (req, res, next) => {
  // Search Contact in DataBase using the id from Request URL
  let contact = await Contact.findById(req.params.id);

  // If Contact is not found Return with Error
  if (!contact) {
    return next(
      new ErrorResponse(`Cant no find contact by ID ${req.params.id}`, 404)
    );
  }

  // Check to see if the Current User is the Owner of the Contact if not Return Error
  if (contact.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not Authorized', 401));
  }

  // If the User is Owner then Delete the Contact and Return Response
  contact = await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
