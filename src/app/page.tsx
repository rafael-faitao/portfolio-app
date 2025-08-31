"use client";

import { useState, useRef, useEffect } from "react";
import HeroBg from "./hero-bg";

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

  const stacks = [
    {
      title: "Angular",
      code: "angular",
      percentage: 90,
    },
    {
      title: "React",
      code: "react",
      percentage: 85,
    },
    {
      title: "Node.js",
      code: "nodejs",
      percentage: 80,
    },
    {
      title: "C#",
      code: "csharp",
      percentage: 75,
    },
  ];

  const projects = [
    {
      title: "Project A",
      when: "2020",
      where: "Company A",
      description: "A web application for managing tasks.",
      techs: ["csharp", "react"],
      link: "https://github.com/user/project-a",
    },
    {
      title: "Project B",
      when: "2021",
      where: "Company B",
      description: "A mobile app for tracking fitness goals.",
      techs: ["csharp", "angular"],
      link: "https://github.com/user/project-b",
    },
  ];

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

      console.dir("res", res);

      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply || "" },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data?.error
              ? `Error: ${data.error}`
              : "Something went wrong.",
          },
        ]);
      }
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Network error: ${err?.message || err}` },
      ]);
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
      <HeroBg />
      <section className="hero-section flex-col">
        <div className="top flex-col">
          <img src="images/main-pic.png" alt="Main" />
          <h1>Rafael Faitão</h1>
          <span>Full-stack Engineer</span>
        </div>
        <span className="main-line">&gt;_ Let's build something together</span>
        <div className="prompt flex-col">
          <div className="inputarea">
            <input
              className="prompt-input"
              placeholder="Ask anything about Rafael"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              ref={inputRef}
              disabled={loading}
            />
            <button className="prompt-button" onClick={send} disabled={loading}>
              Send
            </button>
          </div>
          <pre className="answers">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                <span>{msg.content}</span>
              </div>
            ))}
          </pre>
        </div>
      </section>

      <section className="about-me">
        <div className="left">
          <div className="photo-stacks-column">
            <img src="images/main-pic.png"></img>
            <div className="card my-stacks">
              <div className="title-row">
                <img src="images/code.svg" />
                <h2>Stack</h2>
              </div>
              <div className="stacks-list">
                {stacks.map((stack: any) => {
                  return (
                    <div key={stack.code}>
                      <span>{stack.title}</span>
                      <img src={`images/${stack.code}.svg`} />
                      <span>{stack.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="upper">
            <div className="about-column">
              <div className="card about-me">
                <div className="title-row">
                  <img src="images/user.svg" />
                  <h2>About Rafael</h2>
                </div>
                <div className="about-me content">
                  Fullstack Engineer with 10+ years of experience building
                  scalable applications across healthcare, media, and AEC
                  industries. Specialized in Angular (8+ years) and Node.js (8+
                  years) with a strong focus on UX design, performance
                  optimization, and leading cross-functional teams. Proven
                  success delivering enterprise-grade systems and collaborating
                  remotely with international stakeholders. Fluent in English,
                  open to US/EU remote roles.
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            <div className="lower-left">
              <div className="card education-card">
                <div className="title-row">
                  <img src="images/education.svg" />
                  <h2>Education</h2>
                </div>
                <div className="education content">
                  Bachelor's Degree in Computer Science
                  <br />
                  UNIFESO - 2014 - 2018
                </div>
              </div>
              <div className="card experience-card">
                <div className="title-row">
                  <img src="images/experience.svg" />
                  <h2>Experience</h2>
                </div>
                <div className="experience content">
                  <big>10+ Years</big>
                  <button className="btn card-btn">See More</button>
                </div>
              </div>
            </div>
            <div className="lower-right">
              <div className="card projects-card">
                <div className="title-row">
                  <img src="images/projects.svg" />
                  <h2>Projects</h2>
                </div>
                <div className="projects content">
                  {projects.length > 1 &&
                    projects.slice(0, 2).map((project: any) => {
                      return (
                        <div className="project-card" key={project.title}>
                          <div className="title">{project.title}</div>
                          <div className="where-and-when">
                            <span>
                              {project.where} - {project.when}
                            </span>
                          </div>
                          <div className="techs-row">
                            {project.techs.map((tech: string) => (
                              <img
                                key={tech}
                                src={`images/${tech.toLowerCase()}.svg`}
                                alt={tech}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <button className="btn card-btn">See More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="projects">
        <div className="projects-list">
          {projects.map((exp, idx) => (
            <div key={idx} className="experience-card">
              <div className="experience-title">{exp.title}</div>
              <div className="experience-where-when">{exp.where} - {exp.when}</div>
              <div className="experience-description">{exp.description}</div>
              <div className="experience-techs">
                {exp.techs.map((tech: string) => (
                  <img key={tech} src={`images/${tech}.svg`} alt={tech} style={{ width: '24px', height: '24px' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="experience">
        <div className="experience-list">
          {projects.map((exp, idx) => (
            <div key={idx} className="experience-card">
              <div className="experience-title">{exp.title}</div>
              <div className="experience-where-when">{exp.where} - {exp.when}</div>
              <div className="experience-techs">
                {exp.techs.map((tech: string) => (
                  <img key={tech} src={`images/${tech}.svg`} alt={tech} style={{ width: '24px', height: '24px' }} />
                ))}
              </div>
              <div className="experience-description">{exp.description}</div>
            </div>
          ))}
        </div>
        <button className="experience-add-btn">+</button>
      </section>

      <section className="contact-me">
        <span className="big-title">Let's work together!</span>
        <form action="">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message"></textarea>
          <div className="form-footer">
            <div className="social-networks">
              <a href="#" className="social-network">
                <img src="images/whatsapp.svg" alt="WhatsApp" />
              </a>
              <a href="#" className="social-network">
                <img src="images/linkedin.svg" alt="LinkedIn" />
              </a>
              <a href="#" className="social-network">
                <img src="images/github.svg" alt="GitHub" />
              </a>
              <a href="#" className="social-network">
                <img src="images/phone.svg" alt="Phone" />
              </a>
              <a href="#" className="social-network">
                <img src="images/email.svg" alt="Email" />
              </a>
            </div>
            <button className="btn submit-btn" type="submit">Send <img src="images/send.svg" /></button>
          </div>
        </form>
      </section>
    </main>
  );
}
