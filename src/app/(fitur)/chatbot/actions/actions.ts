/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import OpenAI from 'openai';

export type NazzaBotMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `You are NazzaBot, an AI assistant for the Nazzava app.

Mission:
- Help users learn and take action about Green Day topics, planet Earth, environmental care, forestation/reforestation, climate, and waste/trash management.

Style:
- Friendly, concise, practical.
- Prefer actionable steps, checklists, and simple explanations.
- If a user asks for something unsafe or illegal, refuse and suggest safe alternatives.

Content guidance:
- Encourage eco-friendly habits: reducing waste, recycling, composting, saving energy/water, sustainable transport.
- When giving advice, adapt to the user's location if provided; otherwise keep it general.
- If user needs calculations (e.g., emissions), ask for missing details.

Language:
- Reply in Indonesian by default unless the user uses another language.`;

// Formatting rules:
// - Use Markdown (GitHub-flavored) for formatting.
// - Avoid HTML tags.
// - Exception: inside Markdown table cells, you may use <br> for line breaks.
// - If you present a table, format it as a valid GFM table.

function normalizeHistory(input: unknown): NazzaBotMessage[] {
  if (!Array.isArray(input)) return [];

  const out: NazzaBotMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as any).role;
    const content = (item as any).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({ role, content: trimmed.slice(0, 4000) });
  }

  return out.slice(-5);
}

export async function nazzaBotChat(messages: NazzaBotMessage[]): Promise<string> {
  const apiKey = process.env.MEGALLM_API_KEY;
  if (!apiKey) {
    throw new Error('Missing MEGALLM_API_KEY on server.');
  }

  const history = normalizeHistory(messages);

  const client = new OpenAI({
    apiKey,
    baseURL: 'https://ai.megallm.io/v1',
  });

  const completion = await client.chat.completions.create({
    model: 'openai-gpt-oss-120b',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    temperature: 0.7,
  });

  return completion.choices?.[0]?.message?.content?.trim() ?? '';
}
