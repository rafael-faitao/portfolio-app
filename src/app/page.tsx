"use client"

import { useState, useRef, useEffect } from "react";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = "en-US"; // or "en-US" — change as desired

  useEffect(() => {
    if (!messages.length) return;
    // auto-scroll answers container to bottom when new message arrives
    const el = document.querySelector(".answers");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;

    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });

      console.dir('res', res);

      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply || "" }]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data?.error ? `Error: ${data.error}` : "Something went wrong." },
        ]);
      }
    } catch (err: any) {
      setMessages((m) => [...m, { role: "assistant", content: `Network error: ${err?.message || err}` }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <main>
      <section className="hero-section flex-col">
        <div className="top flex-col">
          <img src="images/main-pic.png" alt="Main" />
          <h1>Rafael Faitão</h1>
          <span>Full-stack Engineer</span>
        </div>
        <span className="main-line">
          &gt;_ Let's build something together
        </span>
        <div className="prompt flex-col">
          <div className="inputarea">
            <input
              className="prompt-input"
              placeholder="Ask anything about Rafael"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              ref={inputRef}
              disabled={loading}
            />
            <button
              className="prompt-button"
              onClick={send}
              disabled={loading}
            >
              Send
            </button>
          </div>
          <div className="answers">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
