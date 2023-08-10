const sequelize = require('../config/connection');

const { User, Match } = require('../models');

const userData = require('./userData.json');
const matchData = require('./matchData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  await Match.bulkCreate(matchData);


  process.exit(0);
};

seedDatabase();
