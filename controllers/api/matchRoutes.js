const router = require('express').Router();
const { Match } = require('../../models');
const { Op } = require('sequelize')

// routing for getting matched users
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch confirmed match IDs related to the provided user ID
    const confirmedMatches = await Match.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
    });
    console.log('confirmedMatches:', confirmedMatches)
    const confirmedMatchIds = confirmedMatches.map(match => {
      return match.sender_id === userId ? match.receiver_id : match.sender_id;
    });
    console.log('Ids:', confirmedMatchIds);
    
// Convert userId to an integer
const userIdAsInt = parseInt(userId);

// Filter out userId from confirmedMatchIds
const filteredConfirmedMatchIds = confirmedMatchIds.filter(id => parseInt(id) !== userIdAsInt);

res.json({ matchedUserIds: filteredConfirmedMatchIds }); // Send JSON response
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