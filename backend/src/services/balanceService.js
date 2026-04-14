const Expense = require("../models/expenseModel");
const { roundTo2 } = require("../utils/mathUtils");

const getBalances = async () => {
  const expenses = await Expense.find()
    .populate("paidBy", "name")
    .populate("participants.user", "name");

  // net balance map → { userId: { name, balance } }
  // positive = should receive money
  // negative = owes money
  const balanceMap = {};

  const ensureUser = (id, name) => {
    if (!balanceMap[id]) balanceMap[id] = { name, balance: 0 };
  };

  for (const expense of expenses) {
    // console.log("expense-----------",expense)
    const payerId = expense.paidBy._id.toString();
    const payerName = expense.paidBy.name;

    // Payer gets credited the full amount
    ensureUser(payerId, payerName);
    balanceMap[payerId].balance += expense.totalAmount;

    // Each participant gets debited their share
    for (const p of expense.participants) {
      const uid = p.user._id.toString();
      ensureUser(uid, p.user.name);
      balanceMap[uid].balance -= p.share;
    }
  }

  // Round all balances
  for (const uid in balanceMap) {
    balanceMap[uid].balance = roundTo2(balanceMap[uid].balance);
  }
  // console.log("balanceMap==================",balanceMap)
  // Build readable result → "A owes B ₹500"
  const owes = [];
  const entries = Object.entries(balanceMap);

  for (const [uid, data] of entries) {
    if (data.balance < 0) {
      owes.push({
        userId: uid,
        name: data.name,
        owes: Math.abs(data.balance),
      });
    } else if (data.balance > 0) {
      owes.push({
        userId: uid,
        name: data.name,
        toReceive: data.balance,
      });
    } else {
      owes.push({
        userId: uid,
        name: data.name,
        status: "settled",
      });
    }
  }
  // console.log("owes==================",owes)
  return { balanceMap, summary: owes };
};

module.exports = { getBalances };
