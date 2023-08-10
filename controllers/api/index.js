const router = require('express').Router();
const userRoutes = require('./userRoutes');
const updateUserRoutes = require('./updateUserRoutes');


router.use('/users', userRoutes);
router.use('/update', updateUserRoutes);

module.exports = router;
