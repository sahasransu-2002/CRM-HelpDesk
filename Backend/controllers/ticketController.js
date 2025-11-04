const Ticket = require('../models/Ticket');

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user._id,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Tickets (Admin → All, User → Own)
exports.getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === 'admin') {
      // Admin can see all tickets
      tickets = await Ticket.find().populate('createdBy assignedTo', 'name email role');
    } else {
      // Normal user can see only their own tickets
      tickets = await Ticket.find({ createdBy: req.user.id }).populate('createdBy assignedTo', 'name email role');
    }

    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err.message);
    res.status(500).json({ message: err.message });
  }
};


// Update Ticket Status
exports.updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
