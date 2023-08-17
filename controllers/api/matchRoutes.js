const router = require('express').Router();
const { Match } = require('../../models');
const { Op } = require('sequelize')

// routing for getting matched users
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const confirmedMatches = await Match.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
    });

    const matchedUserIds = confirmedMatches
      .filter(match => {
        return confirmedMatches.some(otherMatch => (
          otherMatch.sender_id === match.receiver_id && 
          otherMatch.receiver_id === match.sender_id
        ));
      })
      .map(match => {
        return match.sender_id === userId ? match.receiver_id : match.sender_id;
      });

    const uniqueMatchedUserIds = [...new Set(matchedUserIds)];

    res.json({ matchedUserIds: uniqueMatchedUserIds });
  } catch (err) {
    res.status(500).json(err);
  }
});


// routing for liking/requesting match
router.post('/', async (req, res) => {
  try {
    const { receiver_id } = req.body;

    // Check if the match already exists
    const existingMatch = await Match.findOne({
      where: {
        sender_id: req.session.user_id, // Assuming you have a session with user_id
        receiver_id: receiver_id,
      },
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'Match already exists.' });
    }

    // Create a new match entry
    const newMatch = await Match.create({
      sender_id: req.session.user_id,
      receiver_id: receiver_id,
    });

    res.status(201).json(newMatch);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;