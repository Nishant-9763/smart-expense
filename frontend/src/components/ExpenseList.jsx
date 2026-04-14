import { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/api';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  const load = () => getExpenses().then(r => setExpenses(r.data.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    load();
  };

  return (
    <div>
      <h2>All Expenses</h2>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      {expenses.map(e => (
        <div key={e._id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{e.description}</strong>
            <span>₹{e.totalAmount}</span>
          </div>
          <p style={{ margin: '4px 0', color: '#555' }}>
            Paid by: <b>{e.paidBy.name}</b> | Split: {e.splitType}
          </p>
          <p style={{ margin: '4px 0', fontSize: 13, color: '#666' }}>
            Participants: {e.participants.map(p => `${p.user.name} (₹${p.share})`).join(', ')}
          </p>
          <button onClick={() => handleDelete(e._id)} style={deleteBtnStyle}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const cardStyle      = { border: '1px solid #e5e7eb', borderRadius: 8, padding: 14, marginBottom: 12 };
const deleteBtnStyle = { marginTop: 8, padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' };