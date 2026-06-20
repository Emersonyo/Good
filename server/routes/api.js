const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const { validateChat, validateCreateConversation } = require('../middleware/validators')

router.post('/chat', validateChat, chatController.sendMessage)

router.get('/conversations', chatController.listConversations)
router.post('/conversations', validateCreateConversation, chatController.createConversation)
router.patch('/conversations/:id', chatController.renameConversation)
router.get('/conversations/:id', chatController.getConversation)
router.delete('/conversations/:id', chatController.deleteConversation)
router.delete('/conversations', chatController.clearConversations)

module.exports = router
