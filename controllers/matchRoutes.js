const router = require('express').Router();
const { User, Match } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const rnum = Math.floor(Math.random()*11); // needs to be length
        const userData = await User.findByPk(rnum, {
            attributes: { exclude: ['password'] },
        });
  
        const user = userData.get({ plain: true });
  
        res.render('match', {
            user,
            // Pass the logged-in flag to the template
            logged_in: req.session.logged_in,
        });
    // res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;
