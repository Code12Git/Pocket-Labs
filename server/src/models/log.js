const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: { type: String, required: true },
  description: { type: String },
  expenseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
