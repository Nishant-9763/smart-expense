const { getBalances } = require('./balanceService');
const { roundTo2 } = require('../utils/mathUtils');

const getSettlements = async () => {

  const { balanceMap } = await getBalances();

  // Build creditors (to receive) and debtors (to pay) arrays
  const creditors = []; // balance > 0
  const debtors = [];   // balance < 0

  for (const [uid, data] of Object.entries(balanceMap)) {
    if (data.balance > 0) {
      creditors.push({ id: uid, name: data.name, amount: data.balance });
    } else if (data.balance < 0) {
      debtors.push({ id: uid, name: data.name, amount: Math.abs(data.balance) });
    }
  }

  // Sort descending
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const transactions = [];

  let i = 0; // creditor
  let j = 0; // debtor

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];

    // Settlement amount = minimum of what creditor needs and debtor owes
    const amount = roundTo2(Math.min(creditor.amount, debtor.amount));

    transactions.push({
      from: debtor.name,      // who pays
      fromId: debtor.id,
      to: creditor.name,      // who receives
      toId: creditor.id,
      amount,
    });

    creditor.amount = roundTo2(creditor.amount - amount);
    debtor.amount = roundTo2(debtor.amount - amount);

    if (creditor.amount === 0) i++;
    if (debtor.amount === 0) j++;
  }
  // console.log("transactions=============**=====",transactions)
  return {
    totalTransactions: transactions.length,
    transactions,
  };
};

module.exports = { getSettlements };