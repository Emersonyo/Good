# Emerson

A modern AI assistant chatbot inspired by ChatGPT with a sleek, futuristic interface. Built with React + Vite (frontend), Node.js + Express (backend), and MongoDB (database).

## ✨ Features

- **Intelligent Conversations**: Powered by OpenAI GPT API
- **Persistent Chat History**: Store and retrieve conversations
- **Customizable Settings**: Theme, font size, response length
- **Keyboard Shortcuts**: Ctrl+N (new chat), Ctrl+K (focus input), Ctrl+T (toggle theme)
- **Responsive Design**: Works on desktop and mobile
- **Markdown Support**: Render formatted responses with syntax highlighting
- **Production-Ready**: Tests, error handling, security best practices

## 🏗️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Markdown + Syntax Highlighter

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- OpenAI API
- Helmet, CORS, Rate Limiting

## 📁 Project Structure

```
Emerson/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context (Chat, Theme)
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # API helpers
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── server/               # Express backend
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic (LLM, etc.)
│   ├── middleware/       # Express middleware
│   ├── __tests__/        # Jest tests
│   ├── package.json
│   └── server.js
├── DEPLOYMENT.md         # Deployment guide
├── docker-compose.yml    # Local Docker setup
└── README.md
```

## 🚀 Quick Start

### Local Development

**Prerequisites:**
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key

**Setup:**

```bash
# Install frontend
cd client
npm install
npm run dev

# In another terminal, install backend
cd server
npm install
cp .env.example .env
# Edit .env and set OPENAI_API_KEY
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:4000

### Docker Setup

```bash
docker-compose up --build
```

Starts MongoDB + backend automatically.

## 🧪 Testing

```bash
cd server
npm test              # Run tests once
npm run test:watch   # Watch mode
```

Tests cover:
- LLM service token mapping
- Chat controller logic
- Input validation
- Error handling

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

**Quick overview:**
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render or Railway
- **Database**: MongoDB Atlas (free tier available)

## 🔑 Environment Variables

### Backend (.env)
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/emerson
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=800
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:4000
```

## 📚 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/chat` | Send message & get AI response |
| GET | `/api/conversations` | List conversations |
| POST | `/api/conversations` | Create new conversation |
| GET | `/api/conversations/:id` | Get conversation details |
| PATCH | `/api/conversations/:id` | Rename conversation |
| DELETE | `/api/conversations/:id` | Delete conversation |
| DELETE | `/api/conversations` | Clear all conversations |

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + N**: Create new chat
- **Ctrl/Cmd + K**: Focus chat input
- **Ctrl/Cmd + T**: Toggle theme

## 🎨 UI Features

- **Dark Mode (default)**: Elegant dark theme with blue accents
- **Glassmorphism**: Frosted glass effect on cards
- **Smooth Animations**: Framer Motion transitions
- **Responsive Layout**: Mobile-friendly design
- **Accessibility**: ARIA labels, keyboard navigation, high contrast

## 🔒 Security

- **API Keys**: Stored in environment variables only
- **CORS**: Restricted to frontend domain
- **Rate Limiting**: Express rate-limit middleware
- **Helmet**: HTTP headers security
- **Input Validation**: Request sanitization
- **MongoDB**: Connection pooling, secure authentication

## 📖 Documentation

- [Server README](server/README.md) — Backend setup and tests
- [Client Setup](client/) — Frontend installation
- [Deployment Guide](DEPLOYMENT.md) — Production deployment
- [Test Documentation](server/__tests__/README.md) — Test coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License — feel free to use this for personal or commercial projects.

## 🆘 Troubleshooting

**Issue: "Cannot POST /api/chat"**
- Backend not running or API_KEY not set

**Issue: "CORS error"**
- Frontend and backend URLs don't match; check VITE_API_BASE_URL

**Issue: MongoDB connection error**
- Ensure MONGO_URI is correct and DB is running

**Issue: OpenAI "invalid_api_key"**
- Verify OPENAI_API_KEY is set correctly

## 🎯 Roadmap

- [ ] User authentication (JWT)
- [ ] Conversation sharing
- [ ] Voice input/output
- [ ] Image generation support
- [ ] Custom system prompts
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 💬 Support

For issues, questions, or feedback, open a GitHub issue or reach out on the project's discussion board.

---

**Made with ❤️ by a full-stack engineer**
