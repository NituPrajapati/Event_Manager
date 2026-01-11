const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

//only admin can access
router.get('/admin', verifyToken, authorizeRoles('admin'),(req, res) => {
    res.send('Admin access only');
    }
);
//only user can access
router.get('/user', verifyToken, authorizeRoles('user','admin'),(req, res) => {
    res.send('User & Admin access only');
    }
);

module.exports = router;
