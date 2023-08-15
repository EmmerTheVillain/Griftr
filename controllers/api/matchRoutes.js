const router = require('express').Router();
const { Match } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try {
        const matchData = await Match.create({
            sender_id: req.session.user_id,
            reciever_id: req.body.reciever_id
        });
        res.json(matchData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;