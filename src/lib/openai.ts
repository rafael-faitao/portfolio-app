import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const CHAT_MODEL = process.env.AI_MODEL || "gpt-4o-mini";
export const EMBED_MODEL = process.env.EMBED_MODEL || "text-embedding-3-small";