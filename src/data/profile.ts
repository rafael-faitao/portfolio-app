export const profile = {
  name: process.env.SITE_OWNER_NAME || "Rafael Oliveira",
  title: "Full‑Stack Software Engineer",
  location: "Rio de Janero, Brazil",
  languages: ["Portuguese", "English", "French (basic)"],
  summary: `Senior full‑stack dev (React/Angular/Node/.NET). Focused on performance, DX, and shipping.
  Built edtech apps, real‑time audio transcription, and AI assistants. Interested in ML/RAG.`,
  highlights: [
    "9+ years web (React, Angular, Node)",
    "AI/RAG prototypes and tooling",
    "Microservices, queues, Redis, perf tuning",
  ],
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-oliveiraf" },
    { label: "GitHub", url: "https://github.com/rafael-faitao" },
  ],
} as const;