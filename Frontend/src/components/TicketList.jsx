import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { getToken } from '../utils/auth';
import TicketItem from './TicketItem';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');

    const loadTickets = async () => {
        try {
            const token = getToken();
            const { data } = await api.get('/tickets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTickets(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tickets');
        }
    };

    const handleUpdate = async (id, body) => {
        try {
            const token = getToken();
            const { data } = await api.put(`/tickets/${id}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });

            //  Remove resolved tickets instantly for admin
            if (body.status === "Resolved") {
                setTickets((prev) => prev.filter((t) => t._id !== id));
                alert(` Ticket "${data.title}" resolved and removed from dashboard.`);
            } else {
                loadTickets();
            }
        } catch (err) {
            setError("Failed to update ticket");
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm('Delete this ticket?')) return;
        try {
            const token = getToken();
            await api.delete(`/tickets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            loadTickets();
        } catch (err) {
            setError('Failed to delete');
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div>
            <h3>All Tickets</h3>

            {error && <p className="error">{error}</p>}
            {tickets.map((t) => (
                <TicketItem key={t._id} ticket={t} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
        </div>
    );
}
