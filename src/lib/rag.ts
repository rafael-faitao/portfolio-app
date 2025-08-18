import { readFileSync, readdirSync } from "fs";
import path from "path";
import { openai, EMBED_MODEL } from "./openai";
import type { CreateEmbeddingResponse } from "openai/resources/embeddings";

export type Chunk = { id: string; text: string; vector: number[] };

const DOCS_DIR = path.join(process.cwd(), "src", "data", "docs");
let CHUNKS: Chunk[] | null = null;

async function embed(texts: string[]): Promise<number[][]> {
  const { data } = await openai.embeddings.create({ model: EMBED_MODEL, input: texts });
  return (data as CreateEmbeddingResponse["data"]).map(d => d.embedding);
}

function cosine(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const na = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const nb = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (na * nb);
}

function chunk(text: string, size = 900, overlap = 150) {
  const out: string[] = [];
  let i = 0;
  while (i < text.length) {
    out.push(text.slice(i, i + size));
    i += size - overlap;
  }
  return out;
}

async function loadChunks() {
  const files = readdirSync(DOCS_DIR).filter(f => f.endsWith(".md"));
  const rawChunks: { id: string; text: string }[] = [];
  for (const f of files) {
    const full = readFileSync(path.join(DOCS_DIR, f), "utf8");
    const parts = chunk(full);
    parts.forEach((t, idx) => rawChunks.push({ id: `${f}#${idx}`, text: t }));
  }
  const vectors = await embed(rawChunks.map(c => c.text));
  CHUNKS = rawChunks.map((c, i) => ({ ...c, vector: vectors[i] }));
}

export async function search(query: string, k = 6) {
  if (!CHUNKS) await loadChunks();
  const [qVec] = await embed([query]);
  const scored = (CHUNKS as Chunk[]).map(c => ({ c, score: cosine(qVec, c.vector) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map(s => s.c);
}

export function buildSystemPrompt(lang = "pt-BR") {
  const isPT = lang.toLowerCase().startsWith("pt");
  return (
    isPT
      ? `Você é o assistente do site do portfólio de ${process.env.SITE_OWNER_NAME ?? "Rafael"}.
Responda de forma objetiva e útil. Se algo não estiver nos dados, diga que não tem certeza.
Se a pergunta for sobre carreira do visitante, ajude brevemente e convide para falar com ${process.env.SITE_OWNER_NAME ?? "Rafael"}.`
      : `You are the portfolio site's assistant for ${process.env.SITE_OWNER_NAME ?? "Rafael"}.
Answer concisely and helpfully. If unsure due to missing data, say so.
If the visitor asks career questions, help briefly and invite them to contact ${process.env.SITE_OWNER_NAME ?? "Rafael"}.`
  );
}