import { useEffect, useState } from 'react';
import { getSettlements } from '../services/api';

export default function Settlements() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSettlements().then(r => setData(r.data.data));
  }, []);

  return (
    <div>
      <h2>Optimized Settlements</h2>
      {data && <p style={{ color: '#4f46e5', fontWeight: 600 }}>Minimum transactions needed: {data.totalTransactions}</p>}
      {data?.transactions.map((t, i) => (
        <div key={i} style={cardStyle}>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>{t.from}</span>
          <span style={{ margin: '0 10px' }}>→ pays →</span>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{t.to}</span>
          <span style={{ float: 'right', fontWeight: 700 }}>₹{t.amount}</span>
        </div>
      ))}
      {data?.transactions.length === 0 && <p>✅ Everyone is settled!</p>}
    </div>
  );
}

const cardStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: 14, marginBottom: 10 };