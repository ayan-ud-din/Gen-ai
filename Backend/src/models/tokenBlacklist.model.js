 const mongoose = require('mongoose')
const { applyTimestamps } = require('./user.model')

const tokenBlackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token required to be blacklisted']
    }
  },
  {
    timestamps: true
  }
)

const TokenBlacklistModel = mongoose.model('TokenBlacklist', tokenBlackListSchema)

module.exports = TokenBlacklistModel