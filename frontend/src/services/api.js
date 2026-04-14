import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Users
export const getUsers    = ()       => API.get('/users');
export const createUser  = (data)   => API.post('/users', data);

// Expenses
export const getExpenses    = ()     => API.get('/expenses');
export const createExpense  = (data) => API.post('/expenses', data);
export const deleteExpense  = (id)   => API.delete(`/expenses/${id}`);

// Balances & Settlements
export const getBalances    = () => API.get('/expenses/balances');
export const getSettlements = () => API.get('/expenses/settlements');
