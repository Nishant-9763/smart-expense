import { useEffect, useState } from 'react';
import { getBalances } from '../services/api';

export default function Balances() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    getBalances().then(r => setSummary(r.data.data.summary));
  }, []);

  return (
    <div>
      <h2>Balances</h2>
      {summary.length === 0 && <p>No balances yet.</p>}
      {summary.map(s => (
        <div key={s.userId} style={{ ...cardStyle, borderLeft: `4px solid ${s.toReceive ? '#22c55e' : s.owes ? '#ef4444' : '#94a3b8'}` }}>
          <strong>{s.name}</strong>
          {s.toReceive && <span style={{ color: '#22c55e', marginLeft: 10 }}>+₹{s.toReceive} (to receive)</span>}
          {s.owes      && <span style={{ color: '#ef4444', marginLeft: 10 }}>-₹{s.owes} (owes)</span>}
          {s.status    && <span style={{ color: '#94a3b8', marginLeft: 10 }}>✅ Settled</span>}
        </div>
      ))}
    </div>
  );
}

const cardStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: 14, marginBottom: 10 };