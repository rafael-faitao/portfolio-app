
"use client";

import { marked } from "marked";

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
import HeroBg from "./hero-bg";
import CircularSkillBar from "./components/skill-circle";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

type Project = {
  title: string;
  when: string;
  where: string;
  description: string;
  techs: string[];
  hasContent?: boolean;
  link?: string;
  image?: string;
  images?: string[];
  video?: string;
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
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeroBg, setShowHeroBg] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [landingFading, setLandingFading] = useState(false);
  const [landingDone, setLandingDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dismissLanding = () => {
    if (landingFading || landingDone) return;
    setLandingFading(true);
    setTimeout(() => setLandingDone(true), 800);
  };
  const lang = "en-US"; 

  const stacks = [
    {
      title: "Angular",
      code: "angular",
      percentage: 95,
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
  const projects: Project[] = [
    {
      title: "Medisigh CRM & BI",
      when: "2026",
      where: "Medisigh LTDA",
      description:
        "End-to-end CRM and Business Intelligence platform built from scratch to streamline clinic operations, recover lost leads, and surface actionable revenue metrics — driving profit growth of up to 50%.",
      techs: ["angular", "nodejs", "openai"],
      hasContent: true,
    },
    {
      title: "vProMedia",
      when: "2023",
      where: "vCreative",
      description:
        "Multimedia Radio and TV Managing system, focused on spot creation, scripiting, and organization for several US-based Radio Companies.",
      techs: ["angular", "nodejs", "nestjs"],
      hasContent: true,
    },
    {
      title: "Design+",
      when: "2022",
      where: "Project Mark",
      description:
        "Canva-like collaborative tool to craft proposals, including images and exportation to PDF. An innovative design platform that empowers creative teams with advanced collaboration features. ",
      techs: ["nodejs", "react", "vue"],
      hasContent: true,
    },
    {
      title: "Patient Evolution",
      when: "2025",
      where: "Medisigh LTDA",
      description:
        "AI-powered feature integrated into Medisigh, enabling real-time audio transcription of patient-doctor conversations and automatic extraction of clinical data such as allergies, complaints, and objectives.",
      techs: ["angular", "nodejs", "openai", "websocket"],
      hasContent: true,
    },
    {
      title: "Medisigh",
      when: "2020",
      where: "Medisigh LTDA",
      description:
        "Multifunction healthcare managing system, targeting plastic surgeons and other asthetic professionals. Includes patient, document, appointment handling, as well as advanced attendance systems that integrate with modern AI technologies.",
      techs: ["angular", "nodejs", "openai", "scrum"],
      hasContent: true,
    },
    {
      title: "SojaVR Experience",
      when: "2019",
      where: "Imago 360",
      description:
        "Immersive VR experience built in Unity and C# for agricultural education, letting users explore soybean farming through interactive simulations and real-time data visualization.",
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

  const services = [
    {
      title: "Landing Page",
      description: ["Need a professional landing page for your product, startup, or campaign?", "I design and build fast, conversion-focused landing pages that make great first impressions — delivered quickly."],
      bullets: ["Custom design & development", "Mobile-responsive & fast-loading", "SEO-ready structure"],
      price: "Starting at $100",
      waMessage: "Hi Rafael! I'm interested in the \"Landing Page\" service. I'd like to discuss building a landing page.",
    },
    {
      title: "Fix My Slow App",
      description: ["Is your app slow, laggy, or struggling under real usage?", "I identify performance bottlenecks and optimize your application for speed, responsiveness, and scalability — often within days."],
      bullets: ["Angular change detection optimization", "API & data flow improvements", "Rendering & UI performance fixes"],
      price: "Starting at $200",
      waMessage: "Hi Rafael! I'm interested in the \"Fix My Slow App\" service. My app has performance issues and I'd like to discuss how you can help.",
    },
    {
      title: "Add AI to Your Product",
      description: ["Turn your product into an AI-powered experience.", "I integrate practical AI features that improve usability, automation, and user engagement — without overengineering."],
      bullets: ["AI chat & assistants", "Transcription + smart data extraction", "Workflow automation with AI"],
      price: "Starting at $300",
      waMessage: "Hi Rafael! I'm interested in the \"Add AI to Your Product\" service. I'd like to discuss integrating AI features into my product.",
    },
    {
      title: "Real-Time Dashboards",
      description: ["Build powerful dashboards that turn data into decisions.", "I create fast, scalable, real-time interfaces for monitoring, analytics, and internal tools."],
      bullets: ["Live data updates (WebSockets)", "Admin panels & analytics tools", "Data-heavy UI systems"],
      price: "Starting at $800",
      waMessage: "Hi Rafael! I'm interested in the \"Real-Time Dashboards\" service. I'd like to build a real-time data dashboard.",
    },
    {
      title: "Build Your MVP Fast",
      description: ["Have an idea? Let's turn it into a working product — quickly.", "I build production-ready MVPs focused on speed, usability, and real-world validation."],
      bullets: ["Fullstack development (Angular + Node.js)", "Scalable architecture from day one", "Clean UX focused on user adoption"],
      price: "Starting at $1,000",
      waMessage: "Hi Rafael! I'm interested in the \"Build Your MVP Fast\" service. I have an idea I'd like to turn into a product.",
    },
    {
      title: "Modernize Your System",
      description: ["Stuck with messy or outdated code?", "I refactor and modernize existing systems to improve performance, maintainability, and scalability."],
      bullets: ["Codebase cleanup & restructuring", "Tech debt reduction", "Framework upgrades (Angular, Node)"],
      price: "Starting at $400",
      waMessage: "Hi Rafael! I'm interested in the \"Modernize Your System\" service. I'd like to discuss refactoring and modernizing my codebase.",
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
},
{
  title: "Developed CRM & BI Platform for Medisigh",
  company: "Medisigh",
  period: "2026",
  year: 2026,
  month: 1,
  description:
    "Architected and delivered a full CRM and Business Intelligence suite from the ground up, purpose-built to address critical pain points in clinic day-to-day operations and management workflows. The CRM streamlined patient pipelines, enabling teams to identify and re-engage patients who dropped off mid-way through surgical hiring processes. The BI layer surfaced real-time metrics across revenue, conversion, and retention — providing leadership with data-driven insights that contributed to profit growth of up to 50%.",
  techs: ["angular", "nodejs", "openai"],
}

];

  const visibleExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 2);

  
  const generateTimelineItems = () => {
    
    const allYears = Array.from(new Set(experiences.map((exp) => exp.year)));
    allYears.sort((a, b) => b - a); 
    const items = [];
    let cardIndex = 0;

    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i];

      items.push({
        type: "year",
        year: year,
        key: `year-${year}`,
      });

      const experiencesInYear = visibleExperiences.filter((exp) => exp.year === year);
            experiencesInYear.sort((a, b) => b.month - a.month);

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

  // Map timeline entry titles → projects[] index for the modal button
  const timelineProjectMap: Record<string, number> = {
    "Developed CRM & BI Platform for Medisigh": projects.findIndex(p => p.title === "Medisigh CRM & BI"),
    "Worked on DesignPlus at Project Mark": projects.findIndex(p => p.title === "Design+"),
    "Developed Patient Evolution at Medisigh": projects.findIndex(p => p.title === "Patient Evolution"),
  };

  const handleExperienceToggle = () => {
    if (showAllExperiences) {
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
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  /*
  const handleProjectExpand = (index: number) => {
    setExpandedProject(index);
    
    // Bloqueia o scroll quando projeto está expandido - abordagem robusta
    const scrollY = window.scrollY;
    document.body.style.setProperty('position', 'fixed', 'important');
    document.body.style.setProperty('top', `-${scrollY}px`, 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');
  };

  const handleProjectCollapse = () => {
    setExpandedProject(null);
    // Restaura o scroll quando projeto é fechado
    const scrollY = parseInt(document.body.style.top || '0') * -1;
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    document.body.style.removeProperty('overflow');
    
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top;
        const elementHeight = projectsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTo = offsetTop - (windowHeight / 2) + (elementHeight / 2);
        
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }
    }, 300);
  };
  */

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fullText = ">_ Let's build something together";
    let timeout: ReturnType<typeof setTimeout>;
    let index = 0;
    let isDeleting = false;

    const tick = () => {
      if (!isDeleting) {
        index++;
        setTypedText(fullText.slice(0, index));
        if (index === fullText.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 2200);
        } else {
          timeout = setTimeout(tick, 65);
        }
      } else {
        index--;
        setTypedText(fullText.slice(0, index));
        if (index === 0) {
          isDeleting = false;
          timeout = setTimeout(tick, 600);
        } else {
          timeout = setTimeout(tick, 30);
        }
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (openProject !== null) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [openProject]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if (event.key === "Escape" && expandedProject !== null) {
      //   handleProjectCollapse();
      // }
      if (event.key === "Escape" && lightboxImg !== null) {
        setLightboxImg(null);
        return;
      }
      if (event.key === "Escape" && openProject !== null) {
        setOpenProject(null);
      }
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, openProject, lightboxImg]);

  
  useEffect(() => {
    
    return () => {
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('overflow');
    };
  }, []);

  
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

      
      const sections = ["home", "about", "projects", "experience", "services", "contact"];
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

          
          const visibleTop = Math.max(sectionTop, scrollTop);
          const visibleBottom = Math.min(
            sectionBottom,
            scrollTop + windowHeight
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / windowHeight;

          
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
      
      
      setShowHeroBg(currentSection === "home");
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {    
    let isChatHover = false;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    

    const handleHeroScroll = (event: WheelEvent) => {
      if (isChatHover) {
        return;
      }
      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");
      if (!homeSection || !aboutSection || isScrolling) return;

      const currentScrollY = window.scrollY;
      const homeSectionHeight = homeSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      const isNearEndOfHero = currentScrollY >= (homeSectionHeight - viewportHeight - 100) &&
                             currentScrollY < homeSectionHeight;

      if (isNearEndOfHero && event.deltaY > 0) {
        event.preventDefault();
        isScrolling = true;
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleHeroScroll, { passive: false });

    // Scroll lock on chat-container hover
    const chatContainer = document.querySelector('.chat-container');

    const lockScroll = () => {
      if (!isChatHover) {
        isChatHover = true;
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
      }
    };
    const unlockScroll = () => {
      if (isChatHover) {
        isChatHover = false;
        console.dir('unhover');
        document.body.style.height = 'auto';
        document.body.style.overflow = '';
      }
    };
    if (chatContainer) {
      chatContainer.addEventListener('mouseenter', lockScroll);
      chatContainer.addEventListener('mouseleave', unlockScroll);
    }
    
    return () => {
      window.removeEventListener('wheel', handleHeroScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (chatContainer) {
        chatContainer.removeEventListener('mouseenter', lockScroll);
        chatContainer.removeEventListener('mouseleave', unlockScroll);
      }
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus("");
      }, 5000); 

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

      const data = await res.json();
      if (res.ok) {
        // Parse markdown at input level
        setMessages((m) => [
          ...m,
          { role: "assistant", content: String(marked.parse(data.reply || "")) },
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
        { role: "assistant", content: `A network error ocurred. Please try again` },
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
      {!landingDone && (
        <div
          className={`landing-overlay${landingFading ? " landing-fading" : ""}`}
          onClick={dismissLanding}
        >
          <div className="landing-content" onClick={(e) => e.stopPropagation()}>
            <span className="landing-label">Portfolio</span>
            <h1 className="landing-name">
              {"Rafael Oliveira".split("").map((char, i) => (
                <span
                  key={i}
                  className="landing-char"
                  style={{ animationDelay: `${0.3 + i * 0.05}s` }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </h1>
            <div className="landing-line" />
            <p className="landing-tagline">Full-Stack Product Engineer</p>
            <button className="landing-enter-btn" onClick={dismissLanding}>
              Enter Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      <HeroBg isVisible={showHeroBg} opacity={showHeroBg ? 1 : 0} />
      <nav className="main-navigation">
        <div className="nav-left">
          <img
            src="images/main-pic.png"
            alt="Rafael Oliveira"
            className="nav-avatar"
          />
          <div className="nav-info">
            <h3>Rafael Oliveira</h3>
            <span>Full-Stack Product Engineer</span>
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
            href="#services"
            className={`nav-link ${
              activeSection === "services" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("services");
            }}
          >
            <span>Services</span>
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
              href="#services"
              className={`nav-link ${
                activeSection === "services" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("services");
              }}
            >
              Services
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
          <img src="images/main-pic.png" alt="Main" className="small-av" />
          <h1>Rafael Oliveira</h1>
          <span>I build high-performance dashboards and AI-powered features for SaaS products</span>
        </div>
        <span className="main-line">{typedText}<span className="typewriter-cursor">|</span></span>
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
                {msg.role === "assistant" ? (
                  <span dangerouslySetInnerHTML={{ __html: msg.content }} />
                ) : (
                  <span>{msg.content}</span>
                )}
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
          <button 
            className="see-more-btn" 
            onClick={() => handleNavigation("about")}
          >
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
                Fullstack Product Engineer with 10+ years building high-performance dashboards, real-time systems, and AI-powered features for SaaS platforms.
Specialized in Angular and Node.js, with a strong focus on performance optimization, UX, and turning complex data into actionable products.
Proven track record delivering enterprise systems across healthcare, media, and engineering sectors, working remotely with international teams.
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
                    <button 
                      className="see-more-btn"
                      onClick={() => handleNavigation("experience")}
                    >
                      See More
                    </button>
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
                  <button 
                    className="projects-btn"
                    onClick={() => handleNavigation("projects")}
                  >
                    See More
                  </button>
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
        <div className="projects-list">
          {projects.map((exp, idx) => (
            <div
              key={idx}
              className="experience-card default"
            >
              {exp.hasContent && (
                <button
                  className="project-view-btn"
                  onClick={() => setOpenProject(idx)}
                  title="Take a look"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              )}
              <div className="upper">
                <div className="experience-title">{exp.title}</div>
                <div className="experience-where-when">
                  {exp.where} - {exp.when}
                </div>
                <div className="experience-description">
                  {/* className={`experience-description ${
                    expandedProject !== idx ? "truncated" : ""
                  }`} */}
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

        <div className="section-navigation">
          {/* {expandedProject === null && ( */}
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
        {/* )} */}
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
                        {timelineProjectMap[exp.title] !== undefined && timelineProjectMap[exp.title] !== -1 && (
                          <button
                            className="project-view-btn"
                            style={{ position: 'static', marginTop: '0.5rem', alignSelf: 'flex-start' }}
                            onClick={() => setOpenProject(timelineProjectMap[exp.title])}
                            title="Take a look"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                        )}
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
              onClick={() => handleNavigation("services")}
            >
              <span>Services</span>
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

      <section id="services" className="services">
        <div className="services-inner">
          <div className="services-header">
            <h2>How I Can Help You</h2>
            <p className="services-subtitle">
              Clear, high-impact services designed to solve real product and engineering problems — fast.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <a
                key={idx}
                href={`https://wa.me/5521976908021?text=${encodeURIComponent(service.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-card"
              >
                <div className="service-card-header">
                  <span className="service-title">{service.title}</span>
                </div>
                <div className="service-description">
                  {service.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <ul className="service-bullets">
                  {service.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <span className="service-wa-hint">
                    <img src="images/icons/whatsapp-icon.svg" alt="WhatsApp" />
                    Get started
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="services-cta-block">
            <p className="services-cta-headline">Have a project or problem in mind?</p>
            <p className="services-cta-sub">Let&apos;s talk and get it solved.</p>
            <a
              href={`https://wa.me/5521976908021?text=${encodeURIComponent("Hi Rafael! I saw your services and I'd like to start a conversation about working together.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta-btn"
            >
              <img src="images/icons/whatsapp-icon.svg" alt="WhatsApp" />
              Start a Conversation
            </a>
          </div>
        </div>

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
      
      {/* Project Showcase Modal */}
      {openProject !== null && (() => {
        const proj = projects[openProject];
        return (
          <div
            className="project-modal-overlay"
            onClick={() => setOpenProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={proj.title}
          >
            <div
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="project-modal-header">
                <div className="project-modal-title-group">
                  <h2>{proj.title}</h2>
                  <span>{proj.where} · {proj.when}</span>
                </div>
                <button
                  className="project-modal-close"
                  onClick={() => setOpenProject(null)}
                  aria-label="Close modal"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="project-modal-body">
                {proj.title === "Medisigh CRM & BI" && (
                  <div className="modal-section modal-images-section">
                    <img src="images/medisigh-crm.png" alt="Medisigh CRM" onClick={() => setLightboxImg("images/medisigh-crm.png")} />
                    <img src="images/medisigh-crm-2.png" alt="Medisigh CRM 2" onClick={() => setLightboxImg("images/medisigh-crm-2.png")} />
                    <img src="images/medisigh-crm-3.png" alt="Medisigh CRM 3" onClick={() => setLightboxImg("images/medisigh-crm-3.png")} />
                    <img src="images/medisigh-bi.png" alt="Medisigh BI" onClick={() => setLightboxImg("images/medisigh-bi.png")} />
                  </div>
                )}

                {proj.title === "Design+" && (
                  <>
                    <div className="modal-section modal-video-section">
                      <iframe
                        src="https://www.youtube.com/embed/ce_hgWbqRi0?start=24"
                        title="Design+ Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="modal-section modal-link-section">
                      <a
                        href="https://www.projectmark.com/demos/projectmark---design-plus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-external-link"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Visit Project Page
                      </a>
                    </div>
                  </>
                )}

                {proj.title === "vProMedia" && (
                  <>
                    <div className="modal-section modal-images-section">
                      <img src="images/vpro-media.png" alt="vProMedia" onClick={() => setLightboxImg("images/vpro-media.png")} />
                    </div>
                    <div className="modal-section modal-link-section">
                      <a
                        href="https://vcreativeinc.com/products/vpromedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-external-link"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Visit Product Page
                      </a>
                    </div>
                  </>
                )}

                {proj.title === "Patient Evolution" && (
                  <div className="modal-section modal-images-section">
                    <img src="images/evolucao-do-paciente.png" alt="Patient Evolution" onClick={() => setLightboxImg("images/evolucao-do-paciente.png")} />
                  </div>
                )}

                {proj.title === "Medisigh" && (
                  <div className="modal-section modal-link-section">
                    <a
                      href="http://medisigh.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-external-link"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Visit Medisigh
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="Fullscreen preview" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Rafael Oliveira",
            "jobTitle": "Full-Stack Product Engineer",
            "description": "Experienced Full-Stack Product Engineer specializing in React, Next.js, Node.js, and modern web technologies with 10+ years of experience.",
            "url": "https://rafael-oliveira.dev",
            "image": "https://rafael-oliveira.dev/images/main-pic-big.png",
            "sameAs": [
              "https://linkedin.com/in/rafael-oliveira",
              "https://github.com/rafael-faitao"
            ],
            "knowsAbout": [
              "React",
              "Next.js", 
              "Node.js",
              "TypeScript",
              "JavaScript",
              "Angular",
              "Vue.js",
              "Three.js",
              "WebGL",
              "Full-Stack Development",
              "Web Development",
              "Software Engineering"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Freelancer"
            },
            "alumniOf": {
              "@type": "EducationalOrganization", 
              "name": "UNIFESO"
            }
          })
        }}
      />
    </main>
  );
}
