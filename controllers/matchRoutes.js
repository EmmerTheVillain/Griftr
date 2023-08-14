const router = require('express').Router();
const { User, Match } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const rnum = Math.floor(Math.random()*11); // needs to be length
        const userData = await User.findByPk(rnum, {
            attributes: { exclude: ['password'] },
        });
  
        const user = userData.get({ plain: true });
  
        res.render('matches', {
            user,
            // Pass the logged-in flag to the template
            logged_in: req.session.logged_in,
        });
    // res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err);
    }
});

const likeBtn = document.getElementById('like');
const dislikeBtn = document.getElementById('dislike');

if (likeBtn) {
    likeBtn.addEventListener("click", () => {
        router.put
    })
}

module.exports = router;