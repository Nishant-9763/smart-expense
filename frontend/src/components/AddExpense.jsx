import { useState, useEffect } from 'react';
import { getUsers, createExpense } from '../services/api';

export default function AddExpense() {
  const [users, setUsers]           = useState([]);
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paidBy, setPaidBy]         = useState('');
  const [splitType, setSplitType]   = useState('equal');
  const [participants, setParticipants] = useState([]);
  const [message, setMessage]       = useState('');

  useEffect(() => { getUsers().then(r => setUsers(r.data.data)); }, []);

  const toggleParticipant = (userId) => {
    setParticipants(prev =>
      prev.find(p => p.user === userId)
        ? prev.filter(p => p.user !== userId)
        : [...prev, { user: userId, share: '' }]
    );
  };

  const updateShare = (userId, share) => {
    setParticipants(prev =>
      prev.map(p => p.user === userId ? { ...p, share: parseFloat(share) || 0 } : p)
    );
  };

  const handleSubmit = async () => {
    if (!description || !totalAmount || !paidBy || participants.length < 2) {
      return setMessage('❌ Fill all fields and select at least 2 participants');
    }
    try {
      await createExpense({ description, totalAmount: parseFloat(totalAmount), paidBy, splitType, participants });
      setMessage('✅ Expense created!');
      setDescription(''); setTotalAmount(''); setPaidBy(''); setParticipants([]);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Error'}`);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} />
      <input placeholder="Total Amount" type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Paid By:</label>
      <select value={paidBy} onChange={e => setPaidBy(e.target.value)} style={inputStyle}>
        <option value="">-- Select Payer --</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>

      <label style={labelStyle}>Split Type:</label>
      <select value={splitType} onChange={e => setSplitType(e.target.value)} style={inputStyle}>
        <option value="equal">Equal</option>
        <option value="unequal">Unequal</option>
      </select>

      <label style={labelStyle}>Participants:</label>
      {users.map(u => (
        <div key={u._id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={!!participants.find(p => p.user === u._id)}
            onChange={() => toggleParticipant(u._id)}
          />
          <span style={{ width: 100 }}>{u.name}</span>
          {splitType === 'unequal' && participants.find(p => p.user === u._id) && (
            <input
              type="number"
              placeholder="Share"
              style={{ padding: 6, width: 100 }}
              onChange={e => updateShare(u._id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ ...btnStyle, marginTop: 12 }}>Add Expense</button>
      {message && <p>{message}</p>}
    </div>
  );
}

const inputStyle = { display: 'block', marginBottom: 10, padding: 8, width: '100%', fontSize: 14 };
const labelStyle = { fontWeight: 600, marginBottom: 4, display: 'block' };
const btnStyle   = { padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' };