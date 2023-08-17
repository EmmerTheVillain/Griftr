// Import the User and Match models
const User = require('./User');
const Match = require('./match_request');

// Define associations between User and Match models

// A User can have many matches sent as a sender
User.hasMany(Match, {
  foreignKey: 'sender_id', // Set the foreign key in Match referencing User as sender
  as: 'sent_matches', // Create an alias for the relationship
});

// A User can have many matches received as a receiver
User.hasMany(Match, {
  foreignKey: 'receiver_id', // Set the foreign key in Match referencing User as receiver
  as: 'received_matches', // Create an alias for the relationship
});

// A Match belongs to a User as the sender
Match.belongsTo(User, {
  foreignKey: 'sender_id', // Set the foreign key in Match referencing User as sender
  as: 'sender', // Create an alias for the relationship
});

// A Match belongs to a User as the receiver
Match.belongsTo(User, {
  foreignKey: 'receiver_id', // Set the foreign key in Match referencing User as receiver
  as: 'receiver', // Create an alias for the relationship
});

// Export the User and Match models with associations
module.exports = { User, Match };
