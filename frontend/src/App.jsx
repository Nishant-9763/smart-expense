import { useState } from 'react';
import AddUser      from './components/AddUser';
import AddExpense   from './components/AddExpense';
import ExpenseList  from './components/ExpenseList';
import Balances     from './components/Balances';
import Settlements  from './components/Settlements';

const tabs = ['Add User', 'Add Expense', 'Expenses', 'Balances', 'Settlements'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Add Expense');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>💸 Smart Expense Splitter</h1>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: 6,
              border: 'none',
              background: activeTab === tab ? '#4f46e5' : '#e5e7eb',
              color: activeTab === tab ? '#fff' : '#111',
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Add User'    && <AddUser />}
      {activeTab === 'Add Expense' && <AddExpense />}
      {activeTab === 'Expenses'    && <ExpenseList />}
      {activeTab === 'Balances'    && <Balances />}
      {activeTab === 'Settlements' && <Settlements />}
    </div>
  );
}