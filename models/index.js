const User = require('./User');
const Match = require('./match_request');

User.hasMany(Match, {
    foreignKey: 'sender_id',
    as: 'sent_matches',
  });
  
  User.hasMany(Match, {
    foreignKey: 'receiver_id',
    as: 'received_matches',
  });
  
  Match.belongsTo(User, {
    foreignKey: 'sender_id',
    as: 'sender',
  });
  
  Match.belongsTo(User, {
    foreignKey: 'receiver_id',
    as: 'receiver',
  });

module.exports = { User, Match };
