const router = require('express').Router();
const { Match } = require('../../models');
const { Op } = require('sequelize')

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

module.exports = router;