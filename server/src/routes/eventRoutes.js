const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const {createEvent, readEvent, updateEvent, deleteEvent, readAllEvents} = require('../controllers/eventController');

router.post('/create', verifyToken, authorizeRoles('admin'), createEvent);
router.get('/read',  verifyToken, authorizeRoles('admin'), readAllEvents);     //Admin
router.get('/read/:id',  verifyToken, authorizeRoles('admin', 'user'), readEvent); //User+Admin
router.put('/update/:id',  verifyToken, authorizeRoles('admin'), updateEvent);
router.delete('/delete/:id',  verifyToken, authorizeRoles('admin'), deleteEvent);

module.exports = router;
