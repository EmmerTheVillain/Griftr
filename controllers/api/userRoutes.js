const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const path = require('path');

// avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use unique filenames
  },
});
const upload = multer({ storage: storage });


router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route to create a new user
router.post('/create', upload.single('avatar'), async (req, res) => {
    try {
      const avatarPath = req.file.filename.replace('public/images/', '');
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last,
        user_type: req.body.user_type,
        bio: req.body.bio,
        avatar: avatarPath,
      });
  
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Route to get user info for Matched page
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['first', 'last', 'username', 'bio', 'avatar'],
      });
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
});

//edit user
router.put('/:id', withAuth, async (req,res) => {
  try {
    const userData = await User.update(
      {
        first: req.body.first,
        last: req.body.last,
        user_type: req.body.user_type,
        bio: req.body.bio,
        email: req.body.email,
        avatar: req.body.avatar,
        username: req.body.username
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id.' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;
