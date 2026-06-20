# Emerson Server

Express server scaffold for Emerson.

Run locally:

1. Copy `.env.example` to `.env` and fill values. Set `OPENAI_API_KEY` to enable AI responses.
2. Install dependencies: `npm install`.
3. Run in dev: `npm run dev` (requires `nodemon`).

## Running Tests

```bash
npm test
npm run test:watch
```

See `__tests__/README.md` for test documentation.

Environment variables (examples):

```text
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=800
MONGO_URI=mongodb://localhost:27017/emerson
```
