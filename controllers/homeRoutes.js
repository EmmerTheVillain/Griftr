// Import the necessary modules and middleware
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
    const currentUser = await User.findByPk(req.session.user_id);
    // Fetch user IDs that are not the current user's type or in the excluded list
    const availableUserIds = await User.findAll({
      where: {
        id: {
          [Op.not]: req.session.user_id,
          [Op.notIn]: excludedReceiverIds,
        },
        user_type:{
          [Op.ne]: currentUser.user_type,
        }
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

    // Get plain object representation of user data
    const user = userData.get({ plain: true });

    // Render the homepage template with user data and logged-in flag
    res.render('homepage', {
      user,
      // Pass the logged-in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle errors by sending a 500 response with error details
    res.status(500).json(err);
  }
});

// Handle rendering the login page
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the login template with any necessary data
  res.render('login', {
    // Pass any necessary data to the login template
  });
});

// Handle rendering the new user registration page
router.get('/newUser', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the newUser template with any necessary data
  res.render('newUser', {
    // Pass any necessary data to the newUser template
  });
});

// Handle rendering the edit profile page
router.get('/edit', withAuth, async (req, res) => {
  try {
    // Find user data based on the logged-in user's ID
    const userData = await User.findByPk(req.session.user_id);

    // Get plain object representation of user data
    const user = userData.get({ plain: true });

    // Render the edit-profile template with user data and logged-in flag
    res.render('edit-profile', {
      user,
      logged_in: req.session.logged_in
    });
  } catch {
    // Handle errors by sending a 500 response with error details
    res.status(500).json(err);
  }
});

// Handle rendering the match page
router.get('/match', withAuth, async (req, res) => {
  try {
    // Render the match template with logged-in flag and user ID
    res.render('match', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, // Pass the user ID to the template
    });
  } catch (err) {
    // Handle errors by sending a 500 response with error details
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
