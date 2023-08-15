const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


// Prevent non-logged-in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const count = await User.count();
    const num = Math.ceil(Math.random()*count);

    const userData = await User.findByPk(num, {
      attributes: { exclude: ['password'] },
      order: [['first', 'ASC'], ['last', 'ASC']],
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      user,
      // Pass the logged-in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    // Pass any necessary data to the login template
  });
});

router.get('/newUser', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('newUser', {
    // Pass any necessary data to the login template
  });
});

router.get('/edit', withAuth, async (req,res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });

    res.render('edit-profile', {
      user,
      logged_in: req.session.logged_in
    });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
