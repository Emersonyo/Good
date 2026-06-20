# Emerson - Deployment Guide

This guide covers deploying Emerson to production using Vercel (frontend) and Render/Railway (backend).

## Architecture Overview

```
┌─────────────────────┐
│  Vercel (Frontend)  │
│  - React + Vite     │
│  - Tailwind CSS     │
└──────────┬──────────┘
           │
           │ HTTPS
           │
┌──────────▼──────────┐     ┌──────────────────┐
│  Render/Railway     │────▶│  MongoDB Atlas   │
│  (Backend)          │     │  (Database)      │
│  - Express.js       │     └──────────────────┘
│  - Node.js          │
└─────────────────────┘
```

## Prerequisites

- GitHub account (for repos and Actions)
- Vercel account (free tier sufficient)
- Render or Railway account (free tier sufficient)
- MongoDB Atlas account (free tier, M0 cluster)
- OpenAI API key (for AI responses)

## Step 1: Prepare the Repository

### 1.1 Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Emerson chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Emerson.git
git push -u origin main
```

### 1.2 Set Up Environment Variables

Store sensitive values in GitHub Secrets (Settings → Secrets and variables):

**Backend (Render):**
- `MONGO_URI`: MongoDB Atlas connection string
- `OPENAI_API_KEY`: Your OpenAI API key

**Frontend (Vercel):**
- `VITE_API_BASE_URL`: Your backend URL (e.g., https://emerson-api.render.com)

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create a database user (Settings → Database Access)
4. Whitelist IP (Security → Network Access) — use 0.0.0.0/0 for development only
5. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/emerson`

## Step 3: Deploy Backend (Render)

### Option A: Deploy with Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `emerson-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
5. Add environment variables:
   - `MONGO_URI`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL=gpt-4o-mini`
   - `LLM_TEMPERATURE=0.2`
   - `LLM_MAX_TOKENS=800`
   - `NODE_ENV=production`
6. Click "Create Web Service"
7. Wait for deployment — copy the URL (e.g., `https://emerson-api.render.com`)

### Option B: Deploy with Railway

1. Go to [Railway Dashboard](https://railway.app)
2. Create new project → Import GitHub repo
3. Select the repository
4. Add service → Node
5. Configure environment variables in dashboard
6. Deploy

## Step 4: Deploy Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_API_BASE_URL`: Your backend URL from Step 3
6. Click "Deploy"
7. Wait for deployment — copy the frontend URL

## Step 5: Update Backend CORS

Update backend `.env` or environment variable on Render:

```
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

Redeploy backend for changes to take effect.

## Step 6: Set Up CI/CD

GitHub Actions workflows are pre-configured in `.github/workflows/`:

### Backend Tests
- Runs on every push to `main` or `develop`
- Runs Jest tests with Node 18 and 20
- Fails if tests don't pass

### Frontend Build
- Runs on every push to `main` or `develop`
- Builds with Vite
- Optionally deploys to Vercel (requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets)

## Step 7: Local Development with Docker

For consistent local development matching production:

```bash
# Build and start containers
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000 (proxy via backend)
# - Backend API: http://localhost:4000
# - MongoDB: localhost:27017

# Stop containers
docker-compose down
```

## Monitoring & Troubleshooting

### Check Backend Logs (Render)
- Dashboard → Service → Logs

### Check Frontend Logs (Vercel)
- Dashboard → Project → Deployments → Logs

### Health Check
- Backend: `https://emerson-api.render.com/` (returns JSON status)
- Frontend: `https://emerson.vercel.app/` (should render landing page)

### Common Issues

**Issue: 401 Unauthorized (OPENAI_API_KEY)**
- Solution: Verify API key in backend environment variables

**Issue: CORS errors**
- Solution: Check `CORS_ORIGIN` matches frontend URL

**Issue: MongoDB connection timeout**
- Solution: Whitelist IP in MongoDB Atlas Network Access

**Issue: Frontend can't reach backend**
- Solution: Verify `VITE_API_BASE_URL` matches backend URL

## Rollback

If deployment fails:

### Render
- Dashboard → Service → Deployments → Select previous → Click "Rollback"

### Vercel
- Dashboard → Project → Deployments → Select previous → Click "Promote to Production"

## Scaling Recommendations

**For increased traffic:**
- Upgrade MongoDB cluster (e.g., M2, M5)
- Increase Render/Railway plan
- Add caching layer (Redis)
- Implement request rate limiting (already present)

## Security Checklist

- [ ] API keys stored in environment variables (not in code)
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting enabled (Express middleware)
- [ ] Helmet.js headers configured
- [ ] MongoDB firewall configured
- [ ] HTTPS enforced (automatic on Vercel/Render)
- [ ] Regular backups of MongoDB (Atlas automatic)

## Costs Estimation (Monthly)

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | Included | SSD storage 100GB, 100GB bandwidth |
| Render | $7 | 0.5GB RAM starter |
| Railway | $5 | $5/month free credit + usage |
| MongoDB | Free | M0 cluster (512MB) |
| OpenAI | Pay-as-you-go | ~$5-20/month for typical usage |

## Support & Documentation

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
