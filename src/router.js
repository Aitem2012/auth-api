const express = require('express');
const router = express.Router();

const auth = require('./controllers/authController');

router.get('/get-user-by-id/:id', auth.getUserById);
router.get('', auth.getAllUsers);

router.post('/create-user', auth.createUser);
router.post('/login', auth.login);

router.patch('/update-user/:id', auth.updateUser);

router.delete('/delete-user/:id', auth.deleteUser);

module.exports = router;
