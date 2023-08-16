const router = require('express').Router();
const { User, Match } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');


// Prevent non-logged-in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all user IDs that the current user has sent match requests to
    const sentMatches = await Match.findAll({
      where: {
        sender_id: req.session.user_id,
      },
      attributes: ['receiver_id'],
    });

    // Extract the receiver IDs from sentMatches
    const excludedReceiverIds = sentMatches.map(match => match.receiver_id);

    // Fetch user IDs that are not the current user or in the excluded list
    const availableUserIds = await User.findAll({
      where: {
        id: {
          [Op.not]: req.session.user_id,
          [Op.notIn]: excludedReceiverIds,
        },
      },
      attributes: ['id'], // Fetch only user IDs
    });

    // Randomly select a user ID from the availableUserIds list
    const randomUserIdIndex = Math.floor(Math.random() * availableUserIds.length);
    const selectedUserId = availableUserIds[randomUserIdIndex].id;

    // Fetch user data using the selected user ID
    const userData = await User.findByPk(selectedUserId, {
      attributes: { exclude: ['password'] },
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

router.get('/match', withAuth, async (req, res) => {
  try {
    res.render('match', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, // Pass the user ID to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
