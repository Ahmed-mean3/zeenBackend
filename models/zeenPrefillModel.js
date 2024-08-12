const mongoose = require("mongoose");

const zeenPrefillSchema = new mongoose.Schema({
  ipAddress: {
    type: String, // Add this field if it doesn't exist
    required: true,
  },
  custom_firstName: {
    type: String,
    required: true,
  },
  custom_lastname: {
    type: String,
    required: false,
  },
  custom_email: {
    type: String,
    required: true,
  },
  custom_phone: {
    type: String,
    required: true,
  },
  custom_country: {
    type: String,
    required: true,
  },
  custom_city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("zeenPrefill", zeenPrefillSchema);
