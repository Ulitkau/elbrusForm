const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const adminSchema = new Schema({
  login: String,
  password: String,
});

module.exports = model('admin', adminSchema);
