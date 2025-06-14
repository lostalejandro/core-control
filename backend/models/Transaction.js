const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['compra', 'venta'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  counterparty: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  amountGiven: {
    type: Number,
    required: true,
  },
  currencyGiven: {
    type: String,
    required: true,
  },
  amountReceived: {
    type: Number,
    required: true,
  },
  currencyReceived: {
    type: String,
    required: true,
  },
  exchangeRate: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  receiptUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
