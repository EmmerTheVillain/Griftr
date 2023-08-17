const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const updateUserRoutes = require('./updateUserRoutes');
const matchRoutes = require('./matchRoutes');


router.use('/users', userRoutes);
// router.use('/update', updateUserRoutes);
router.use('/match', matchRoutes);

module.exports = router;
