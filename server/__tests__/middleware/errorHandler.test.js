/**
 * Tests for error handler middleware.
 * Covers error response formatting.
 */
const errorHandler = require('../../middleware/errorHandler')

describe('errorHandler middleware', () => {
  test('should return 500 for generic errors', () => {
    const err = new Error('Test error')
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Test error' })
  })

  test('should use custom status if provided', () => {
    const err = new Error('Not found')
    err.status = 404
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Not found' })
  })

  test('should use default error message if not provided', () => {
    const err = { status: 500 }
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Server error' })
  })
})
