/**
 * Tests for validators middleware.
 * Covers input validation and sanitization.
 */
const { validateChat, validateCreateConversation } = require('../../middleware/validators')

describe('validators middleware', () => {
  describe('validateChat', () => {
    test('should reject empty message', (done) => {
      const req = { body: { message: '' } }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const next = jest.fn()

      validateChat(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
      done()
    })

    test('should reject message without text', (done) => {
      const req = { body: {} }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const next = jest.fn()

      validateChat(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      done()
    })

    test('should accept valid message', (done) => {
      const req = { body: { message: 'Hello world' } }
      const res = {}
      const next = jest.fn()

      validateChat(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(req.body.message).toBe('Hello world')
      done()
    })

    test('should trim message', (done) => {
      const req = { body: { message: '  Hello world  ' } }
      const res = {}
      const next = jest.fn()

      validateChat(req, res, next)

      expect(req.body.message).toBe('Hello world')
      done()
    })

    test('should enforce max length (8000 chars)', (done) => {
      const longMsg = 'a'.repeat(9000)
      const req = { body: { message: longMsg } }
      const res = {}
      const next = jest.fn()

      validateChat(req, res, next)

      expect(req.body.message.length).toBeLessThanOrEqual(8000)
      done()
    })
  })

  describe('validateCreateConversation', () => {
    test('should set default title if not provided', (done) => {
      const req = { body: {} }
      const res = {}
      const next = jest.fn()

      validateCreateConversation(req, res, next)

      expect(req.body.title).toBe('New Conversation')
      expect(next).toHaveBeenCalled()
      done()
    })

    test('should accept valid title', (done) => {
      const req = { body: { title: 'My Chat' } }
      const res = {}
      const next = jest.fn()

      validateCreateConversation(req, res, next)

      expect(req.body.title).toBe('My Chat')
      done()
    })

    test('should trim and limit title length', (done) => {
      const longTitle = 'a'.repeat(250)
      const req = { body: { title: longTitle } }
      const res = {}
      const next = jest.fn()

      validateCreateConversation(req, res, next)

      expect(req.body.title.length).toBeLessThanOrEqual(200)
      done()
    })
  })
})
