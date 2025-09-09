"use client";
// Tech code to full name mapping
const techNames: Record<string, string> = {
  angular: "Angular",
  react: "React",
  nodejs: "Node.js",
  nestjs: "NestJS",
  js: "JavaScript",
  csharp: "C#",
  openai: "OpenAI",
  vue: "Vue.js",
  unity: "Unity",
  metaquest: "Meta Quest",
  arduino: "Arduino",
  "c++": "C++",
  google_maps: "Google Maps API",
  graph_api: "Facebook Graph API",
  scrum: "Agile Scrum",
};

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [showAllExperiences, setShowAllExperiences] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      percentage: 70,
    },
    {
      title: "Node.js",
      code: "nodejs",
      percentage: 70,
    },
    {
      title: "Javascript",
      code: "js",
      percentage: 60,
    },
    {
      title: "C#",
      code: "csharp",
      percentage: 60,
    },
  ];

  const suggestions = [
    "How many years do you have of experience with Angular?",
    "Do you have any experience with Python?",
    "What's the most interesting project you've done?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const scrollToAboutMe = () => {
    const aboutSection = document.querySelector(".about-me");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const projects = [
    {
      title: "vProMedia",
      when: "2023",
      where: "vCreative",
      description:
        "Multimedia Radio and TV Managing system, focused on spot creation, scripiting, and organization for several US-based Radio Companies.",
      techs: ["angular", "nodejs", "nestjs"],
    },
    {
      title: "Design+",
      when: "2022",
      where: "Project Mark",
      description:
        "Canva-like collaborative tool to craft proposals, including images and exportation to PDF. An innovative design platform that empowers creative teams with advanced collaboration features. ",
      techs: ["nodejs", "react", "vue"],
    },
    {
      title: "Medisigh",
      when: "2020",
      where: "Medisigh LTDA",
      description:
        "Multifunction healthcare managing system, targeting plastic surgeons and other asthetic professionals. Includes patient, document, appointment handling, as well as advanced attendance systems that integrate with modern AI technologies.",
      techs: ["angular", "nodejs", "openai", "scrum"],
      link: "http://medisigh.com.br/",
    },
    {
      title: "SojaVR Experience",
      when: "2019",
      where: "Imago 360",
      description:
        "Virtual Reality experience for agriculture, allowing users to explore and learn about soybean farming in an immersive 3D environment. Developed using Unity and C#, this application provides interactive simulations, educational content, and real-time data visualization to enhance understanding of modern agricultural practices.",
      techs: ["csharp", "unity", "metaquest"],
    },
    {
      title: "AirTouch",
      when: "2018",
      where: "UNIFESO (College)",
      description:
        "Software + Hardware haptics kit, developed combining Arduino with Unity Engine to deliver interactive experiences with gaming and computer applications overall",
      techs: ["c++", "arduino", "unity"],
    },
    {
      title: "Social Maps",
      when: "2017",
      where: "(College Project)",
      description:
        "Interactive Web Application using Google Maps API, Facebook Graph API, Data Scrapping and other technologies to display events and interesting to-dos in a map interface.",
      techs: ["nodejs", "angular", "google_maps", "graph_api"],
    },
  ];


    const experiences = [
  {
    title: "Started Computer Science degree at UNIFESO",
    company: "UNIFESO",
    period: "2014",
    year: 2014,
    month: 1,
    description:
      "Began Computer Science studies. Built strong foundations in programming, algorithms, and software engineering principles.",
    techs: ["csharp", "nodejs"],
  },
  {
    title: "Started internship at Mark Software",
    company: "Alterdata Software",
    period: "2016",
    year: 2016,
    month: 4,
    description:
      "Joined as an intern developer, working on software development and internal systems while studying Computer Science.",
    techs: ["csharp", "sql", "angular"],
  },
  {
    title: "Created first game: Pac-Man clone",
    company: "Personal Project",
    period: "2016",
    year: 2016,
    month: 6,
    description:
      "Built a Pac-Man clone in C++ using GLUT (OpenGL). Learned about game loops, graphics rendering, and memory management.",
    techs: ["c++",],
  },
  {
    title: "Developed SocialMaps project",
    company: "UNIFESO",
    period: "2017",
    year: 2017,
    month: 1,
    description:
      "Created SocialMaps, integrating Google Maps API and Facebook Graph API to show nearby events on an interactive map.",
    techs: ["js", "google_maps", "graph_api"],
  },
  {
    title: "Left internship at Alterdata Software",
    company: "Alterdata Software",
    period: "2017",
    year: 2017,
    month: 5,
    description:
      "Concluded internship after 1 year of hands-on experience with professional development practices.",
    techs: ["csharp", "sql"],
  },
  {
    title: "Created Animal Protection Report App (AmarPet)",
    company: "Personal Project",
    period: "2018",
    year: 2018,
    month: 10,
    description:
      "Built AmarPet, an MVP application to raise awareness about animal mistreatment. Focused on mobile UX and backend integration.",
    techs: ["ionic", "nodejs"],
  },
  {
    title: "Graduated in Computer Science",
    company: "UNIFESO",
    period: "2018",
    year: 2018,
    month: 12,
    description:
      "Graduated with a Bachelor's Degree in Computer Science. Presented thesis project demonstrating full-stack development and modern web technologies.",
    techs: ["angular", "nodejs", "csharp"],
  },
  {
    title: "Created AirTouch project",
    company: "UNIFESO",
    period: "2018",
    year: 2018,
    month: 6,
    description:
      "Developed AirTouch, a hardware + software haptic device for hand-movement interactions using Arduino sensors and Unity desktop application.",
    techs: ["arduino", "csharp", "unity", "c++"],
  },
  {
    title: "Created Joe Immortal (platformer game)",
    company: "Personal Project",
    period: "",
    year: 2019,
    month: 7,
    description:
      "Developed Joe Immortal, a 2D platformer built in Unity. Focused on level design, platforming mechanics, combat systems, and character progression.",
    techs: ["unity", "csharp",],
  },
  {
    title: "Started Soja VR project",
    company: "Tecnomyl",
    period: "2019",
    year: 2019,
    month: 1,
    description:
      "Developed Soja VR, a Unity VR simulation for agronomy training where users spray weeds in a soy field. Showcased at an agronomics convention in 2020.",
    techs: ["unity", "csharp", "metaquest"],
  },
  {
    title: "Started freelancing career",
    company: "Freelancer",
    period: "2018 - Current",
    year: 2018,
    month: 1,
    description:
      "Delivered web and mobile applications for various clients. Specialized in Angular, React, and Node.js solutions with focus on performance and UX.",
    techs: ["angular", "react", "nodejs", "ionic"],
  },
  {
    title: "Started in Medisigh project",
    company: "Medisigh",
    period: "2020 - current",
    year: 2020,
    month: 1,
    description:
      "Created the brand and initial system. Led frontend development, implemented Scrum, and contributed to product decisions balancing client expectations and deliverables.",
    techs: ["angular", "nodejs", "csharp"],
  },
  {
    title: "Started Orbtask project",
    company: "(Personal Project)",
    period: "2016",
    year: 2016,
    month: 10,
    description:
      "Designed and developed Orbtask, a task management and productivity tool concept with clean UX, modular architecture, and experiments in real-time features.",
    techs: ["angular", "nodejs", "websocket", "sql"],
  },
  {
  title: "Founded Ninestacks project",
  company: "Ninestacks",
  period: "2023 - current",
  year: 2023,
  month: 9,
  description:
    "Founded Ninestacks, a Duolingo-like app designed to teach programming through gamified exercises. Built the system foundation and managed branding.",
},
{
  title: "Started Digicriativa collaboration",
  company: "Digicriativa",
  period: "",
  year: 2020,
  month: 1,
  description:
    "Worked on digital solutions and consulting projects for local clients. Contributed to web development and UI design initiatives.",
  techs: ["angular", "react", "nodejs"],
},
{
  title: "Started at Radix as Software Engineer",
  company: "Radix",
  period: "2021 - 2022",
  year: 2021,
  month: 1,
  description:
    "Joined Radix to work on enterprise systems and software development. Focused on scalable backend solutions and modern frontend stacks.",
  techs: ["csharp", "angular", "nodejs", "react"],
},
{
  title: "Joined Project Mark as Full-Stack Developer",
  company: "Project Mark",
  period: "2022",
  year: 2022,
  month: 1,
  description:
    "Joined Project Mark, my first US-based company (San Francisco Bay Area), working in the AEC (Architecture, Engineering & Construction) / Civil Construction industry. Contributed as a Full-Stack Developer across multiple projects. Frontend focused on React, Vue.js, Vuex, and Redux. Backend experience with Node.js and TypeORM.",
  techs: ["react", "vue", "nodejs"],
},
{
  title: "Worked on DesignPlus at Project Mark",
  company: "Project Mark",
  period: "May 2022",
  year: 2022,
  month: 5,
  description:
    "Worked on DesignPlus, an interactive Canva-like web app with real-time collaboration on PDFs, allowing multiple users to edit simultaneously. First exposure to Redux-based approaches and component stores. Considered a major milestone in expanding frontend expertise and handling complex collaborative design systems.",
  techs: ["react", "vue", "nodejs",],
},
{
  title: "Started at vCreative as Software Engineer",
  company: "vCreative",
  period: "2022 - 2025",
  year: 2022,
  month: 11,
  description:
    "Contributed to the development of media and advertising workflow solutions. Worked on improving system performance and integrating new features.",
  techs: ["nodejs", "js", "angular"],
},
{
  title: "Developed Patient Evolution at Medisigh",
  company: "Medisigh",
  period: "February 2025",
  year: 2025,
  month: 2,
  description:
    "Built Patient Evolution. Integrated with OpenAI API to introduce advanced AI-powered healthcare features. Enabled real-time audio transcription of patient-doctor conversations and automatic extraction of relevant details (allergies, complaints, objectives). Marked a major milestone in applying AI for transcription and semantic identification in healthcare applications.",
  techs: ["angular", "nodejs", "openai", "websocket"],
}

];

  const visibleExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 2);

  // Generate timeline items with year markers and cards positioned between years
  const generateTimelineItems = () => {
    // Get all unique years from experiences
    const allYears = Array.from(new Set(experiences.map((exp) => exp.year)));
    allYears.sort((a, b) => b - a); // Descending order
    const items = [];
    let cardIndex = 0;

    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i];
      // Add year marker
      items.push({
        type: "year",
        year: year,
        key: `year-${year}`,
      });
      // Add all experiences for this year
      const experiencesInYear = visibleExperiences.filter((exp) => exp.year === year);
            experiencesInYear.sort((a, b) => b.month - a.month); // Sort by month within the year

      experiencesInYear.forEach((exp) => {
        items.push({
          type: "experience",
          experience: exp,
          key: `exp-${exp.year}-${cardIndex}`,
          position: cardIndex % 2 === 0 ? "left" : "right",
        });
        cardIndex++;
      });
    }
    return items;
  };

  const timelineItems = generateTimelineItems();

  const handleExperienceToggle = () => {
    if (showAllExperiences) {
      // Se está expandido e vai recolher, fazer scroll para o topo da seção
      const experienceSection = document.querySelector(".experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setShowAllExperiences(!showAllExperiences);
  };

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Fechar o menu mobile após navegação
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProjectExpand = (index: number) => {
    setExpandedProject(index);
    // Não bloqueia o scroll - permite navegar normalmente
  };

  const handleProjectCollapse = () => {
    setExpandedProject(null);
  };

  // Função para fechar ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedProject !== null) {
        handleProjectCollapse();
      }
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedProject, mobileMenuOpen]);

  // Fechar menu mobile quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const mobileMenu = document.querySelector(".mobile-menu");
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

      if (
        mobileMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(target) &&
        mobileMenuBtn &&
        !mobileMenuBtn.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!messages.length) return;
    // auto-scroll answers container to bottom when new message arrives
    const el = document.querySelector(".answers");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".main-navigation") as HTMLElement;
      const heroSection = document.querySelector(
        ".hero-section"
      ) as HTMLElement;

      if (navbar && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > heroHeight - 100) {
          navbar.classList.add("visible");
        } else {
          navbar.classList.remove("visible");
        }
      }

      // Track active section
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollTop + windowHeight / 2;

      let currentSection = "home";
      let maxVisibility = 0;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          // Calculate how much of the section is visible
          const visibleTop = Math.max(sectionTop, scrollTop);
          const visibleBottom = Math.min(
            sectionBottom,
            scrollTop + windowHeight
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / windowHeight;

          // Also check if viewport center is in this section
          const centerInSection =
            viewportCenter >= sectionTop && viewportCenter <= sectionBottom;

          if (
            (visibility > maxVisibility && visibility > 0.3) ||
            centerInSection
          ) {
            maxVisibility = visibility;
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus("");
      }, 5000); // Remove o toast após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [formStatus]);

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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus(
          "Thank you for your interest! I will get in touch with you soon."
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const error = await response.json();
        setFormStatus(
          `Something went wrong. Please try again or contact me directly.`
        );
      }
    } catch (error) {
      setFormStatus("Unable to send message. Please try again later.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main>
      {/* <HeroBg /> */}
      <nav className="main-navigation">
        <div className="nav-left">
          <img
            src="images/main-pic.png"
            alt="Rafael Oliveira"
            className="nav-avatar"
          />
          <div className="nav-info">
            <h3>Rafael Oliveira</h3>
            <span>Full-Stack Engineer</span>
          </div>
        </div>
        <div className="nav-right">
          <a
            href="#home"
            className={`nav-link ${activeSection === "home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("home");
            }}
          >
            <span>Home</span>
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("about");
            }}
          >
            <span>About Me</span>
          </a>
          <a
            href="#projects"
            className={`nav-link ${
              activeSection === "projects" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("projects");
            }}
          >
            <span>Projects</span>
          </a>
          <a
            href="#experience"
            className={`nav-link ${
              activeSection === "experience" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("experience");
            }}
          >
            <span>Experience</span>
          </a>
          <a
            href="#contact"
            className={`nav-link ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("contact");
            }}
          >
            <span>Contact Me</span>
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            <button className="mobile-menu-close" onClick={toggleMobileMenu}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mobile-nav-links">
            <a
              href="#home"
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("home");
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("about");
              }}
            >
              About Me
            </a>
            <a
              href="#projects"
              className={`nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("projects");
              }}
            >
              Projects
            </a>
            <a
              href="#experience"
              className={`nav-link ${
                activeSection === "experience" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("experience");
              }}
            >
              Experience
            </a>
            <a
              href="#contact"
              className={`nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("contact");
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section flex-col">
        <div className="top flex-col">
          <img src="images/main-pic.png" alt="Main" />
          <h1>Rafael Oliveira</h1>
          <span>Full-stack Engineer</span>
        </div>
        <span className="main-line">&gt;_ Let's build something together</span>
        <div className="chat-container">
          <div className="chat-header">
            <img src="images/icons/ai-icon.svg" alt="AI" className="ai-icon" />
            <span>IA Assistance</span>
          </div>
          { messages.length === 0 && !loading && (
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
          </div>)}
          <pre className="answers">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                <span>{msg.content}</span>
              </div>
            ))}
          </pre>
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
        </div>
        <div className="see-more-container">
          <button className="see-more-btn" onClick={scrollToAboutMe}>
            <span>See More</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      <section id="about" className="about-me">
        <div className="about-content">
          <div className="left">
            <img
              className="main-profile-pic"
              src="images/main-pic-big.png"
              alt="Rafael Oliveira"
            />
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
                      <span className="stack-percentage">
                        {stack.percentage}%
                      </span>
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
                optimization, and leading cross-functional teams. Proven success
                delivering enterprise-grade systems and collaborating remotely
                with international stakeholders. Fluent in English, open to
                US/EU remote roles.
              </div>
            </div>

            <div className="cards-row">
              <div className="cards-column">
                <div className="card education-card default">
                  <div className="title-row">
                    <img src="images/icons/prime_graduation-cap.svg" />
                    <h2>Education</h2>
                  </div>
                  <div className="education-content">
                    <div className="degree">
                      Bachelor's Degree in Computer Science
                    </div>
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
                      <div className="project-company">
                        {project.where} - {project.when}
                      </div>
                      <div className="project-techs">
                        {project.techs.map((tech: string) => (
                          <img
                            key={tech}
                            src={`images/icons/${tech}.svg`}
                            alt={tech}
                            title={techNames[tech] || tech}
                          />
                        ))}
                      </div>
                      <div className="project-description">
                        {project.description}
                      </div>
                    </div>
                  ))}
                  <button className="projects-btn">See More</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-navigation">
          <button
            className="section-nav-btn"
            onClick={() =>
              document
                .querySelector(".projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>Projects</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
      <section id="projects" className="projects">
        <div
          className={`projects-list ${
            expandedProject !== null ? "expanded" : ""
          }`}
        >
          {projects.map((exp, idx) => (
            <div
              key={idx}
              className={`experience-card default ${
                expandedProject === idx ? "expanded-card" : ""
              }`}
              /*onClick={() =>
                expandedProject === null ? handleProjectExpand(idx) : undefined
              }*/
              style={{
                cursor: expandedProject === null ? "pointer" : "default",
              }}
            >
              {expandedProject === idx && (
                <div
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectCollapse();
                  }}
                >
                  ×
                </div>
              )}
              <div className="upper">
                <div className="experience-title">{exp.title}</div>
                <div className="experience-where-when">
                  {exp.where} - {exp.when}
                </div>
                <div
                  className={`experience-description ${
                    expandedProject !== idx ? "truncated" : ""
                  }`}
                >
                  {exp.description}
                </div>
              </div>
              <div className="lower">
                <div className="experience-techs">
                  {exp.techs.map((tech: string) => (
                    <img
                      key={tech}
                      src={`images/icons/${tech}.svg`}
                      alt={tech}
                      title={techNames[tech] || tech}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {expandedProject === null && (
          <div className="section-navigation">
            <button
              className="section-nav-btn"
              onClick={() => handleNavigation("experience")}
            >
              <span>Timeline</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </section>
      <section id="experience" className="experience">
        <div className="experience-container">
          <h2 className="experience-title">Timeline</h2>
          <div
            className={`timeline-wrapper ${
              showAllExperiences ? "expanded" : ""
            }`}
          >
            <div className="timeline-line"></div>
            {timelineItems.map((item) => {
              if (item.type === "year") {
                return (
                  <div className="timeline-item year-marker" key={item.key}>
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-dot"></div>
                  </div>
                );
              } else {
                const exp = item.experience;
                return (
                  <div
                    className={`timeline-item ${item.position}`}
                    key={item.key}
                  >
                    <div className="timeline-card chat-style">
                      <div className="experience-header">
                        <div className="experience-title-text">{exp.title}</div>
                        <div className="experience-company-period">
                          {exp.company} • {exp.period}
                        </div>
                      </div>
                      <div className="experience-description">
                        {exp.description}
                      </div>
                      { exp.techs && (
                      <div className="experience-techs">
                        {exp.techs.map((tech: string) => (
                          <img
                            key={tech}
                            src={`images/icons/${tech}.svg`}
                            alt={tech}
                            className="tech-icon"
                            title={techNames[tech] || tech}
                          />
                        ))}
                      </div>
                      )}
                    </div>
                    <div className="timeline-tick"></div>
                  </div>
                );
              }
            })}
          </div>

          {false && experiences.length > 2 && (
            <div className="experience-expand-container">
              <button
                className="experience-expand-btn"
                onClick={handleExperienceToggle}
              >
                {showAllExperiences ? "Show Less" : "View More"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`expand-icon ${
                    showAllExperiences ? "rotated" : ""
                  }`}
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="section-navigation">
            <button
              className="section-nav-btn"
              onClick={() => handleNavigation("contact")}
            >
              <span>Contact Me</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-me">
        <span className="big-title">Let's work together!</span>
        <form onSubmit={handleFormSubmit}>
          <input
            className="default"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            className="default"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
          <input
            className="default"
            type="text"
            name="subject"
            placeholder="Subject: Job Opportunity – Fullstack Developer"
            value={formData.subject}
            onChange={handleFormChange}
          />
          <textarea
            className="default"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleFormChange}
            required
          ></textarea>
          <div className="form-footer">
            <div className="social-networks">
              <a
                href="https://wa.me/5521976908021"
                target="_blank"
                rel="noopener noreferrer"
                className="social-network"
              >
                <img src="images/icons/whatsapp-icon.svg" alt="WhatsApp" />
              </a>
              <a
                href="https://www.linkedin.com/in/rafael-oliveiraf/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="social-network"
              >
                <img src="images/icons/linkedin-icon.svg" alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/rafael-faitao"
                target="_blank"
                rel="noopener noreferrer"
                className="social-network"
              >
                <img src="images/icons/github-icon.svg" alt="GitHub" />
              </a>
              <a href="tel:+5521976908021" className="social-network">
                <img src="images/icons/phone-icon.svg" alt="Phone" />
              </a>
              <a
                href="mailto:rafaeltsd@hotmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-network"
              >
                <img src="images/icons/mail-icon.svg" alt="Email" />
              </a>
            </div>
            <button className="submit-btn" type="submit" disabled={formLoading}>
              {formLoading ? "Enviando..." : "Send"}{" "}
              <img src="images/icons/arrow-icon.svg" alt="Arrow" />
            </button>
          </div>
        </form>

        <div className="return-to-home">
          <button
            className="return-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Return to Home</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 14L12 9L7 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Toast Notification */}
      {formStatus && (
        <div
          className={`toast ${
            formStatus.includes("Thank you") ? "success" : "error"
          }`}
        >
          <div className="toast-content">
            <div className="toast-icon">
              {formStatus.includes("Thank you") ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="toast-message">{formStatus}</span>
            <button className="toast-close" onClick={() => setFormStatus("")}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
