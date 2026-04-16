const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  share: {
    type: Number,
    required: true,
    min: [0, 'Share cannot be negative'],
  },
}, { _id: false });

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [1, 'Amount must be greater than 0'],
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Payer is required'],
  },
  splitType: {
    type: String,
    enum: ['equal', 'unequal', 'percentage', 'shares'], // percentage, shares
    required: [true, 'Split type is required'],
  },
  participants: {
    type: [participantSchema],
    validate: {
      validator: (arr) => arr.length >= 2,
      message: 'At least 2 participants required',
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);