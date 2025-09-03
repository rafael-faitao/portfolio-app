"use client";

import { useState, useRef, useEffect } from "react";
// import HeroBg from "./hero-bg";
import CircularSkillBar from "./components/skill-circle";

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
      percentage: 95,
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
    {
      title: "Angular",
      code: "angular",
      percentage: 95,
    },
    {
      title: "React",
      code: "react",
      percentage: 85,
    },
  ];

  const suggestions = [
    "How many years do you have of experience with Angular?",
    "Do you have any experience with Python?",
    "What's the most interesting project you've done?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const scrollToAboutMe = () => {
    const aboutSection = document.querySelector('.about-me');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "vProMedia",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["angular", "nodejs"],
      link: "https://github.com/user/project-a",
    },
    {
      title: "Design+",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["csharp", "react"],
      link: "https://github.com/user/project-a",
    },
        {
      title: "vProMedia",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["angular", "nodejs"],
      link: "https://github.com/user/project-a",
    },
    {
      title: "Design+",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["csharp", "react"],
      link: "https://github.com/user/project-a",
    },
        {
      title: "vProMedia",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["angular", "nodejs"],
      link: "https://github.com/user/project-a",
    },
    {
      title: "Design+",
      when: "2022",
      where: "Project Mark",
      description: "Canva-like collaborative tool to craft proposals, including images and exportation to PDF",
      techs: ["csharp", "react"],
      link: "https://github.com/user/project-a",
    },

  ];

  useEffect(() => {
    if (!messages.length) return;
    // auto-scroll answers container to bottom when new message arrives
    const el = document.querySelector(".answers");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.main-navigation') as HTMLElement;
      const heroSection = document.querySelector('.hero-section') as HTMLElement;
      
      if (navbar && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroHeight - 100) {
          navbar.classList.add('visible');
        } else {
          navbar.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* <HeroBg /> */}
      <nav className="main-navigation">
        <div className="nav-left">
          <img src="images/main-pic.png" alt="Rafael Faitão" className="nav-avatar" />
          <div className="nav-info">
            <h3>Rafael Faitão</h3>
            <span>Full-Stack Engineer</span>
          </div>
        </div>
        <div className="nav-right">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link active">About Me</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#contact" className="nav-link">Contact Me</a>
        </div>
      </nav>
      
      <section className="hero-section flex-col">
        <div className="top flex-col">
          <img src="images/main-pic.png" alt="Main" />
          <h1>Rafael Faitão</h1>
          <span>Full-stack Engineer</span>
        </div>
        <span className="main-line">&gt;_ Let's build something together</span>
        <div className="chat-container">
          <div className="chat-header">
            <img src="images/icons/ai-icon.svg" alt="AI" className="ai-icon" />
            <span>IA Assistance</span>
          </div>
          <div className="chat-suggestions">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion" 
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
          <div className="inputarea">
            <input
              className="prompt-input"
              placeholder="Ask something about Ralph"
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
        <div className="see-more-container">
          <button className="see-more-btn" onClick={scrollToAboutMe}>
            <span>See More</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      <section className="about-me">
        <div className="about-content">
          <div className="left">
            <img className="main-profile-pic" src="images/main-pic-big.png" alt="Rafael Faitão" />
            <div className="card stack-card default">
              <div className="title-row">
                <img src="images/icons/prime_graduation-cap.svg" />
                <h2>Stack</h2>
              </div>
              <div className="stacks-grid">
                {stacks.map((stack: any) => {
                  return (
                    <div className="stack-item" key={stack.code}>
                      <div className="stack-circle">
                        <CircularSkillBar value={stack.percentage}>
                          <img src={`images/icons/${stack.code}.svg`} />
                        </CircularSkillBar>
                      </div>
                      <span className="stack-name">{stack.title}</span>
                      <span className="stack-percentage">{stack.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="right">
            <div className="card about-card default">
              <div className="title-row">
                <img src="images/icons/prime_user.svg" />
                <h2>About Rafael</h2>
              </div>
              <div className="about-text">
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
            
            <div className="cards-row">
              <div className="card education-card default">
                <div className="title-row">
                  <img src="images/icons/prime_graduation-cap.svg" />
                  <h2>Education</h2>
                </div>
                <div className="education-content">
                  <div className="degree">Bachelor's Degree in Computer Science</div>
                  <div className="institution">UNIFESO - 2014 - 2018</div>
                </div>
              </div>

              <div className="card experience-card default">
                <div className="title-row">
                  <img src="images/icons/prime_history.svg" />
                  <h2>Experience</h2>
                </div>
                <div className="experience-content">
                  <div className="experience-years">+10 Years</div>
                  <button className="see-more-btn">See More</button>
                </div>
              </div>
            </div>

            <div className="card projects-preview-card default">
              <div className="title-row">
                <img src="images/icons/prime_briefcase.svg" />
                <h2>Projects</h2>
              </div>
              <div className="projects-preview">
                {projects.slice(0, 2).map((project: any, index: number) => (
                  <div className="project-item" key={index}>
                    <div className="project-name">{project.title}</div>
                    <div className="project-company">{project.where} - {project.when}</div>
                    <div className="project-techs">
                      {project.techs.map((tech: string) => (
                        <img key={tech} src={`images/icons/${tech}.svg`} alt={tech} />
                      ))}
                    </div>
                    <div className="project-description">{project.description}</div>
                  </div>
                ))}
                <button className="see-more-btn">See More</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section-navigation">
          <button className="section-nav-btn" onClick={() => document.querySelector('.projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Projects</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
      <section className="projects">
        <div className="projects-list">
          {projects.map((exp, idx) => (
            <div key={idx} className="experience-card default">
              <div className="upper">
                              <div className="experience-title">{exp.title}</div>
              <div className="experience-where-when">
                {exp.where} - {exp.when}
              </div>
              <div className="experience-description">{exp.description}</div>
              </div>
              <div className="lower">
                <div className="experience-techs">
                {exp.techs.map((tech: string) => (
                  <img
                    key={tech}
                    src={`images/icons/${tech}.svg`}
                    alt={tech}
                  />
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="experience">
        <div className="experience-list">
          <div className="line"></div>
          {projects.map((exp, idx) => (
            <div className="experience-row" key={idx}>
              <div className="experience-card default">
              <div className="experience-title">{exp.title}</div>
              <div className="experience-where-when">
                {exp.where} - {exp.when}
              </div>
              <div className="experience-techs">
                {exp.techs.map((tech: string) => (
                  <img
                    key={tech}
                    src={`images/icons/${tech}.svg`}
                    alt={tech}
                    style={{ width: "24px", height: "24px" }}
                  />
                ))}
              </div>
              <div className="experience-description">{exp.description}</div>
            </div>
            <div className="tick"></div>
              </div> 
          ))}
        </div>
        <button className="experience-add-btn">+</button>
      </section>

      <section className="contact-me">
        <span className="big-title">Let's work together!</span>
        <form action="">
          <input className="default" type="text" placeholder="Name" />
          <input className="default" type="email" placeholder="Email" />
          <input className="default" type="text" placeholder="Subject" />
          <textarea className="default" placeholder="Message"></textarea>
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
            <button className="btn btn-default submit-btn" type="submit">
              Send <img src="images/send.svg" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
