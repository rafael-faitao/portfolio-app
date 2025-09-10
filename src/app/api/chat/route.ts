import { NextRequest, NextResponse } from "next/server";
import { openai, CHAT_MODEL } from "@/lib/openai";
import { search, buildSystemPrompt } from "@/lib/rag";
import { profile } from "@/data/profile";

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = await req.json();
    const lastUser = messages?.filter((m: any) => m.role === "user").pop();
    const q = lastUser?.content ?? "";

    const top = q ? await search(q, 6) : [];
    const context = [
      `PROFILE: ${JSON.stringify(profile)}`,
      `DOCS:\n${top.map(c => `[#${c.id}]\n${c.text}`).join("\n\n")}`,
    ].join("\n\n");

    const sys = buildSystemPrompt(lang ?? process.env.SITE_LANG ?? "pt-BR");

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: sys },
        { role: "system", content: `Use only this context. If the answer isn't in here, say you don't have any information on that.\n\n${context}` },
        ...messages,
      ],
    });

    console.dir('completion', completion);

    const text = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply: text }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Unknown error" }, { status: 500 });
  }
}