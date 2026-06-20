// Simple request validators and sanitizers
function validateChat(req, res, next){
  try{
    const { message } = req.body || {}
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid message' })
    }
    // Limit length and trim
    req.body.message = message.trim().slice(0, 8000)
    next()
  }catch(err){ next(err) }
}

function validateCreateConversation(req, res, next){
  try{
    const title = (req.body && req.body.title) ? String(req.body.title).trim().slice(0,200) : 'New Conversation'
    req.body.title = title
    next()
  }catch(err){ next(err) }
}

module.exports = { validateChat, validateCreateConversation }
