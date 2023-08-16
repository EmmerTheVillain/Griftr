const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const matchRoutes = require('./matchRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/match', matchRoutes);

module.exports = router;