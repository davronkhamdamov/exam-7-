const { Router } = require('express');
const router = Router();
const userControl = require('../controller/usersControl');

router.post('/register', userControl.REGISTER);
router.post('/login', userControl.LOGIN);

module.exports = router;
