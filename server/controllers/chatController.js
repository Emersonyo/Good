const Conversation = require('../models/Conversation')
const { callLLM } = require('../services/llmService')

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body || {}

    const userMsg = { role: 'user', content: message }

    // Atomically append user message; create conversation if missing
    let convo = null
    if (conversationId) {
      convo = await Conversation.findOneAndUpdate(
        { _id: conversationId },
        { $push: { messages: userMsg } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
    } else {
      convo = new Conversation({ messages: [userMsg] })
      await convo.save()
    }

    // Build messages for LLM including system prompt
    const systemPrompt = process.env.SYSTEM_PROMPT || 'You are Emerson, an intelligent, helpful assistant.'
    const llmMessages = [{ role: 'system', content: systemPrompt }, ...convo.messages.map(m => ({ role: m.role, content: m.content }))]

    const assistant = await callLLM(llmMessages, { responseLength: req.body.responseLength })

    // Atomically append assistant response and update lastUpdated
    const updated = await Conversation.findByIdAndUpdate(convo._id, { $push: { messages: assistant } }, { new: true })

    res.json({ conversationId: convo._id, assistant, conversation: updated })
  } catch (err) {
    next(err)
  }
}

exports.listConversations = async (req, res, next) => {
  try{
    const items = await Conversation.find().sort({ createdAt: -1 }).limit(50)
    res.json(items)
  }catch(err){ next(err) }
}

exports.createConversation = async (req, res, next) => {
  try{
    const convo = new Conversation({ title: req.body.title || 'New Conversation' })
    await convo.save()
    res.json(convo)
  }catch(err){ next(err) }
}

exports.getConversation = async (req, res, next) => {
  try{
    const convo = await Conversation.findById(req.params.id)
    if (!convo) return res.status(404).json({ error: 'Conversation not found' })
    res.json(convo)
  }catch(err){ next(err) }
}

exports.deleteConversation = async (req, res, next) => {
  try{
    await Conversation.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  }catch(err){ next(err) }
}

exports.clearConversations = async (req, res, next) => {
  try{
    await Conversation.deleteMany({})
    res.json({ ok: true })
  }catch(err){ next(err) }
}

exports.renameConversation = async (req, res, next) => {
  try{
    const id = req.params.id
    const title = (req.body && req.body.title) ? String(req.body.title).trim().slice(0,200) : undefined
    if (!title) return res.status(400).json({ error: 'Invalid title' })
    const convo = await Conversation.findByIdAndUpdate(id, { $set: { title } }, { new: true })
    if (!convo) return res.status(404).json({ error: 'Conversation not found' })
    res.json(convo)
  }catch(err){ next(err) }
}
