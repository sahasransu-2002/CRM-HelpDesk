import React from 'react';

export default function TicketItem({ ticket, onUpdate, onDelete }) {
  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <div>
        <button onClick={() => onUpdate(ticket._id, { status: 'In Progress' })}>In Progress</button>
        <button onClick={() => onUpdate(ticket._id, { status: 'Resolved' })}>Resolve</button>
        <button onClick={() => onDelete(ticket._id)}>Delete</button>
      </div>
    </div>
  );
}
