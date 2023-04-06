const { ROLE } = require('../constants/enum')
const mongoose = require('mongoose');
const { dateToString } = require('../helpers/date');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  sub: [
    {
      subId: {
        type: Schema.Types.ObjectId,
        ref: "Company"
      },
      role: {
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.View,
        require: true,
      },
      default: Boolean
    }
  ],
  createdAt: {
    type: String,
    default: dateToString(new Date())
  }
});

module.exports = mongoose.model('User', userSchema);
