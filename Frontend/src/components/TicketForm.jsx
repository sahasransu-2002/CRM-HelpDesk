import React, { useState } from 'react';
import { api } from '../api/api';
import { getToken } from '../utils/auth';

export default function TicketForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await api.post('/tickets', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Ticket created successfully!');
      setTitle('');
      setDescription('');

      if (onCreated) onCreated(); // refresh user’s list only
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Create Ticket</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
