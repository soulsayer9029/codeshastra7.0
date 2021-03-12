const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },
  email: {
    type: String,
    unique: [true, 'Email already taken'],
    required: [true, 'Please add an email id'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please add a valid email'
    ]
  },
  aadharNumber: {
    type: Number,
    required: [true, 'Please add an aadhar number'],
    unique: [true, 'Aadhar number already in use']
  },
  state: {
    type: String,
    enum: [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and  Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry" ],
    required: [true, 'Please choose a state']
  },
  pinCode: {
    type: Number,
    required: [true, 'Please add a pin-code'],
    minLength: 6,
    maxLength: 6
  },
  mobileNumber: {
    type: Number,
    required: [true, 'Please add a number'],
    unique: [true, 'Number already in use'],
    minLength: 10,
    maxLength: 10
  },
  avatar:{
    type:Buffer,
  },
  role: {
    type: String,
    enum: ['seller', 'buyer', 'middleman'],
    default: 'seller'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: 8,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);