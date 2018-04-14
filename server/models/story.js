var {mongoose} = require('../db/mongoose');
const _ = require('lodash');

var StorySchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true, minlength: 1 },
  text: { type: String, required: true, trim: true, minlength: 1 },
  privacy: { type:Boolean, default: false },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null },
  comments: [{
    commentedAt: { type: Number },
    comment: {
      type: String,
      required: true,
      minlength:1,
      trim: true
    },
    commentedBy_userName: {
      type: String,
      required: true
    },
    commentedBy_userId: {
      type: String,
      required: true
    }
  }],
  creatorName: {
    type: String,
    required: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

StorySchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, [
    '_id',
    'heading', 
    'text', 
    'privacy',
    'creatorName',
    '_creator',
    'comments',
    'completed',
    'completedAt'
   ])
}

var Story = mongoose.model('Story', StorySchema);

module.exports = {Story};
