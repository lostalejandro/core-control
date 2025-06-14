const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  type: {
    type: String,
    enum: ['cliente', 'proveedor', 'ambos'],
    default: 'cliente',
  },
  paymentMethods: [String],
  identityNumber: String,
  birthDate: Date,
  address: String,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
