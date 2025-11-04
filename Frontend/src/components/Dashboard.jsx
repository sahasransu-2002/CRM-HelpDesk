import React from 'react';
import TicketForm from './TicketForm';
import TicketList from './TicketList';
import { clearToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  const handleLogout = () => {
    clearToken();
    nav('/login');
  };

  const handleTicketCreated = () => {
    if (TicketList.current) {
      TicketList.current.loadTickets();
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Helpdesk Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <TicketForm onCreated={handleTicketCreated} />
        <TicketList ref={TicketList} />
      </div>
    </div>
  );
}
