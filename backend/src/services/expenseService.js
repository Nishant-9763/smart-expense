const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { roundTo2 } = require('../utils/mathUtils');

// ── Create Expense ──────────────────────────────────────────
const createExpense = async ({ description, totalAmount, paidBy, splitType, participants }) => {

  // 1. Validate paidBy user exists
  const payer = await User.findById(paidBy);
  if (!payer) throw { statusCode: 404, message: 'Payer not found' };

  // 2. Validate all participant user IDs exist
  const userIds = participants.map((p) => p.user);
  const users = await User.find({ _id: { $in: userIds } });
  if (users.length !== userIds.length) {
    throw { statusCode: 404, message: 'One or more participants not found' };
  }

  // 3. Payer must be in participants
  const payerInParticipants = userIds.some((id) => id.toString() === paidBy.toString());
  if (!payerInParticipants) {
    throw { statusCode: 400, message: 'Payer must be included in participants' };
  }

  // 4. Split logic
  let finalParticipants = [];

  if (splitType === 'equal') {
    const share = roundTo2(totalAmount / participants.length);
    finalParticipants = participants.map((p) => ({
      user: p.user,
      share,
    }));

  } else if (splitType === 'unequal') {
    // Validate shares are provided
    const hasShares = participants.every((p) => p.share !== undefined && p.share !== null);
    if (!hasShares) {
      throw { statusCode: 400, message: 'Each participant must have a share for unequal split' };
    }

    // Validate total of shares matches totalAmount
    const totalShares = roundTo2(participants.reduce((sum, p) => sum + p.share, 0));
    if (totalShares !== roundTo2(totalAmount)) {
      throw {
        statusCode: 400,
        message: `Sum of shares (${totalShares}) must equal total amount (${totalAmount})`,
      };
    }

    finalParticipants = participants.map((p) => ({
      user: p.user,
      share: roundTo2(p.share),
    }));
  }

  // 5. Save to DB
  const expense = await Expense.create({
    description,
    totalAmount: roundTo2(totalAmount),
    paidBy,
    splitType,
    participants: finalParticipants,
  });

  return await expense.populate([
    { path: 'paidBy', select: 'name email' },
    { path: 'participants.user', select: 'name email' },
  ]);
};

// ── Fetch All Expenses ──────────────────────────────────────
const getAllExpenses = async () => {
  return await Expense.find()
    .populate('paidBy', 'name email')
    .populate('participants.user', 'name email')
    .sort({ createdAt: -1 });
};

// ── Delete Expense ──────────────────────────────────────────
const deleteExpense = async (id) => {
  const expense = await Expense.findById(id);
  if (!expense) throw { statusCode: 404, message: 'Expense not found' };
  await expense.deleteOne();
  return { message: 'Expense deleted successfully' };
};

module.exports = { createExpense, getAllExpenses, deleteExpense };