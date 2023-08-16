// Import the necessary modules and middleware
const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non-logged-in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Count the number of users
    const count = await User.count();
    // Generate a random number between 1 and the user count
    const num = Math.ceil(Math.random()*count);

    // Find user data based on the generated random number
    const userData = await User.findByPk(num, {
      attributes: { exclude: ['password'] },
      order: [['first', 'ASC'], ['last', 'ASC']],
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
