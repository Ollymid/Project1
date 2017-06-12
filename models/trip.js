const mongoose = require('mongoose');

// commenting model

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now}
});

commentSchema.methods.belongsTo = function commentbelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


// trip reporting model
const tripSchema = new mongoose.Schema({
  latitude: {type: String, required: true},
  longitude: {type: String, required: true},
  title: {type: String, required: true},
  image: {type: String},
  fallType: {type: String, required: true },
  description: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
});

// attaching trip creation to the user
tripSchema.methods.belongsTo = function tripBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};



module.exports = mongoose.model('Trip', tripSchema);
