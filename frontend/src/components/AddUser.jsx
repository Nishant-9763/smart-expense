import { useState } from 'react';
import { createUser } from '../services/api';

export default function AddUser() {
  const [form, setForm]       = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!form.name || !form.email) return setMessage('Both fields required');
    try {
      await createUser(form);
      setMessage(`✅ User "${form.name}" created!`);
      setForm({ name: '', email: '' });
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Error'}`);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
      />
      <button onClick={handleSubmit} style={btnStyle}>Create User</button>
      {message && <p>{message}</p>}
    </div>
  );
}

const inputStyle = { display: 'block', marginBottom: 10, padding: 8, width: '100%', fontSize: 14 };
const btnStyle   = { padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' };