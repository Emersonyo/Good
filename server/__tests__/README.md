# Backend Tests

## Running Tests

Install dependencies first:
```bash
npm install
```

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Test Coverage

Tests are located in `__tests__/` directory:

- **`__tests__/services/llmService.test.js`**: Tests for LLM service token budget mapping and stub behavior
  - responseLength mapping (short/medium/long)
  - Explicit maxTokens override
  - API key validation

- **`__tests__/controllers/chatController.test.js`**: Tests for chat controller
  - sendMessage with new and existing conversations
  - responseLength parameter passing to LLM
  - Error handling
  - Conversation creation, renaming, and deletion

- **`__tests__/middleware/validators.test.js`**: Tests for input validators
  - Message validation (empty, length limits)
  - Title validation and defaults
  - Input sanitization

- **`__tests__/middleware/errorHandler.test.js`**: Tests for error handler
  - Generic error handling
  - Custom status codes
  - Error message formatting

## Mocking Strategy

- **Mongoose models** are mocked to avoid database dependencies in tests
- **fetch/llmService** are mocked to prevent real API calls
- Jest is configured with Node test environment and forced exit
