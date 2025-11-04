const express = require('express');
const protect = require('../middleware/authMiddleware');
const { createTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.put('/:id', protect, updateTicket);
router.delete('/:id', protect, deleteTicket);

module.exports = router;
