const { createExpense, getAllExpenses, deleteExpense } = require('../services/expenseService');
const { getBalances } = require('../services/balanceService');
const { getSettlements } = require('../services/settlementService');

const createExpenseHandler = async (req, res, next) => {
  try {
    const expense = await createExpense(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

const getAllExpensesHandler = async (req, res, next) => {
  try {
    const expenses = await getAllExpenses();
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    next(error);
  }
};

const deleteExpenseHandler = async (req, res, next) => {
  try {
    const result = await deleteExpense(req.params.id);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

const getBalancesHandler = async (req, res, next) => {
  try {
    const balances = await getBalances();
    res.status(200).json({ success: true, data: balances });
  } catch (error) {
    next(error);
  }
};

const getSettlementsHandler = async (req, res, next) => {
  try {
    const settlements = await getSettlements();
    res.status(200).json({ success: true, data: settlements });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpenseHandler,
  getAllExpensesHandler,
  deleteExpenseHandler,
  getBalancesHandler,
  getSettlementsHandler,
};