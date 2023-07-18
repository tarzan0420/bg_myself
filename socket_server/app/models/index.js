const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require('./role.model');
db.result = require('./result.model');

db.ROLES = ["personal", "business", "admin", "moderator"];

module.exports = db;