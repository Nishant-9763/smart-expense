const express = require('express');
const router = express.Router();
const {
  createExpenseHandler,
  getAllExpensesHandler,
  deleteExpenseHandler,
  getBalancesHandler,
  getSettlementsHandler,
} = require('../controllers/expenseController');

router.post('/', createExpenseHandler);
router.get('/', getAllExpensesHandler);
router.delete('/:id', deleteExpenseHandler);
router.get('/balances', getBalancesHandler);
router.get('/settlements', getSettlementsHandler);

module.exports = router;