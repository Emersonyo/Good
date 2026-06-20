const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false })

const ConversationSchema = new Schema({
  title: { type: String, default: 'New Conversation', index: true },
  messages: { type: [MessageSchema], default: [] },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdated' } })

ConversationSchema.index({ lastUpdated: -1 })

module.exports = model('Conversation', ConversationSchema)
