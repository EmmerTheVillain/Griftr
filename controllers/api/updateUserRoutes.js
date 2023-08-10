const router = require('express').Router();
const { User } = require('../../models');

// Update the first name of the user
router.put('/:id/first', async (req, res) => {
  try {
    const updatedUser = await User.update(
      {
        first: req.body.first,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedUser[0]) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'First name updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update the last name of the user
router.put('/:id/last', async (req, res) => {
  try {
    const updatedUser = await User.update(
      {
        last: req.body.last,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedUser[0]) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Last name updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Bio
router.put('/:id/bio', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          bio: req.body.bio,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedUser[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'Bio updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Update Avatar
  router.put('/:id/avatar', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          avatar: req.body.avatar,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedUser[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'Avatar updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });


//   Update Username
router.put('/:id/username', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          username: req.body.username,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedUser[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'Username updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//   Update Password
router.put('/:id/password', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          password: req.body.password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedUser[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Update User type
router.put('/:id/user_type', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          user_type: req.body.user_type,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedUser[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'User type updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;