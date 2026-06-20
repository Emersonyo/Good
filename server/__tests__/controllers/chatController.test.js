/**
 * Tests for chatController.
 * Covers message sending, conversation creation, and error handling.
 */
const { sendMessage, createConversation, deleteConversation, renameConversation } = require('../../controllers/chatController')
const Conversation = require('../../models/Conversation')

// Mock the Conversation model and llmService
jest.mock('../../models/Conversation')
jest.mock('../../services/llmService', () => ({
  callLLM: jest.fn().mockResolvedValue({ role: 'assistant', content: 'Test response' })
}))

describe('chatController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('sendMessage', () => {
    test('should create new conversation and append messages', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: 'conv-123',
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Test response' }
        ]
      })
      const mockConvo = { save: mockSave }

      Conversation.mockImplementationOnce(() => mockConvo)
      Conversation.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: 'conv-123',
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Test response' }
        ]
      })

      const req = { body: { message: 'Hello' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await sendMessage(req, res, next)

      expect(res.json).toHaveBeenCalled()
      const call = res.json.mock.calls[0][0]
      expect(call.conversationId).toBe('conv-123')
      expect(call.assistant).toHaveProperty('role', 'assistant')
    })

    test('should append to existing conversation', async () => {
      const mockUpdated = {
        _id: 'conv-456',
        messages: [
          { role: 'user', content: 'Previous' },
          { role: 'assistant', content: 'Previous response' },
          { role: 'user', content: 'Hello again' },
          { role: 'assistant', content: 'Test response' }
        ]
      }

      Conversation.findOneAndUpdate = jest.fn().mockResolvedValueOnce(mockUpdated)
      Conversation.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockUpdated)

      const req = { body: { conversationId: 'conv-456', message: 'Hello again' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await sendMessage(req, res, next)

      expect(res.json).toHaveBeenCalled()
      const call = res.json.mock.calls[0][0]
      expect(call.conversationId).toBe('conv-456')
    })

    test('should handle errors and pass to next', async () => {
      const error = new Error('DB error')
      Conversation.mockImplementationOnce(() => {
        throw error
      })

      const req = { body: { message: 'Hello' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await sendMessage(req, res, next)

      expect(next).toHaveBeenCalledWith(error)
    })

    test('should include responseLength in LLM call options', async () => {
      const { callLLM } = require('../../services/llmService')
      const mockSave = jest.fn().mockResolvedValue({
        _id: 'conv-789',
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Test response' }
        ]
      })
      const mockConvo = { save: mockSave }

      Conversation.mockImplementationOnce(() => mockConvo)
      Conversation.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: 'conv-789',
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Test response' }
        ]
      })

      const req = { body: { message: 'Hello', responseLength: 'short' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await sendMessage(req, res, next)

      expect(callLLM).toHaveBeenCalled()
      const callOpts = callLLM.mock.calls[0][1]
      expect(callOpts.responseLength).toBe('short')
    })
  })

  describe('createConversation', () => {
    test('should create a new conversation with title', async () => {
      const mockConvo = { _id: 'new-id', title: 'Test Chat', messages: [] }
      Conversation.mockImplementationOnce(() => ({
        save: jest.fn().mockResolvedValue(mockConvo)
      }))

      const req = { body: { title: 'Test Chat' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await createConversation(req, res, next)

      expect(res.json).toHaveBeenCalledWith(mockConvo)
    })

    test('should use default title if not provided', async () => {
      const mockConvo = { _id: 'new-id', title: 'New Conversation', messages: [] }
      Conversation.mockImplementationOnce(() => ({
        save: jest.fn().mockResolvedValue(mockConvo)
      }))

      const req = { body: {} }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await createConversation(req, res, next)

      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('renameConversation', () => {
    test('should rename a conversation', async () => {
      const mockUpdated = { _id: 'conv-id', title: 'New Title', messages: [] }
      Conversation.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdated)

      const req = { params: { id: 'conv-id' }, body: { title: 'New Title' } }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
      const next = jest.fn()

      await renameConversation(req, res, next)

      expect(res.json).toHaveBeenCalledWith(mockUpdated)
    })

    test('should return 404 if conversation not found', async () => {
      Conversation.findByIdAndUpdate = jest.fn().mockResolvedValue(null)

      const req = { params: { id: 'invalid-id' }, body: { title: 'New Title' } }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
      const next = jest.fn()

      await renameConversation(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('deleteConversation', () => {
    test('should delete a conversation', async () => {
      Conversation.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'conv-id' })

      const req = { params: { id: 'conv-id' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await deleteConversation(req, res, next)

      expect(res.json).toHaveBeenCalledWith({ ok: true })
    })

    test('should handle errors', async () => {
      const error = new Error('Delete failed')
      Conversation.findByIdAndDelete = jest.fn().mockRejectedValue(error)

      const req = { params: { id: 'conv-id' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      await deleteConversation(req, res, next)

      expect(next).toHaveBeenCalledWith(error)
    })
  })
})
