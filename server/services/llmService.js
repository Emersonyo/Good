/**
 * Lightweight LLM service adapter.
 * - If `OPENAI_API_KEY` (or `AI_API_KEY`) is set, it will call OpenAI Chat Completions.
 * - Otherwise returns a safe stub response for local development.
 */
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

// Use global fetch when available (Node 18+). Fallback to node-fetch if installed.
let fetchFn = (typeof fetch !== 'undefined') ? fetch : null
try { if (!fetchFn) fetchFn = require('node-fetch') } catch (e) {}

async function callLLM(messages, opts = {}){
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  if (!apiKey) {
    return { role: 'assistant', content: 'Emerson stub: set OPENAI_API_KEY to enable real AI responses.' }
  }

  // Map responseLength keyword to token budget, allow explicit maxTokens override
  const lengthMap = { short: 150, medium: 400, long: 800 }
  let maxTokens = Number(process.env.LLM_MAX_TOKENS || 800)
  if (opts.maxTokens) maxTokens = Number(opts.maxTokens)
  else if (opts.responseLength && lengthMap[opts.responseLength]) maxTokens = lengthMap[opts.responseLength]

  const payload = {
    model,
    messages,
    temperature: Number(process.env.LLM_TEMPERATURE || 0.2),
    max_tokens: maxTokens,
  }

  if (!fetchFn) throw new Error('No fetch implementation available. Install node-fetch or use Node 18+')

  const resp = await fetchFn(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`LLM request failed: ${resp.status} ${text}`)
  }

  const data = await resp.json()
  const content = data?.choices?.[0]?.message?.content || ''
  return { role: 'assistant', content }
}

module.exports = { callLLM }
