import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Github, Linkedin, Mail, Instagram, ExternalLink, Download, ChevronDown,
  Menu, X, ArrowRight, Star, Award, Briefcase, Code2, Brain,
  ChevronRight, MapPin, Phone, Send, ArrowUp,
  Settings, LogOut, Plus, Trash2, Save, Eye, EyeOff, Lock, LayoutDashboard,
  User, FolderOpen, GraduationCap, Trophy, MessageSquare, FileText, BarChart2,
  CheckCircle, AlertCircle, ChevronUp, RefreshCw, Sparkles
} from "lucide-react";

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
  personal: {
    name: "MEET DAVE",
    tagline: "AI Engineer · Full Stack Developer",
    bio1: "I'm Meet Dave — an AI Engineer and Full Stack Developer based out of Bangalore. I specialize in designing and deploying large-scale ML systems, with a particular focus on LLMs, retrieval-augmented generation, and efficient inference pipelines.",
    bio2: "When I'm not training models or architecting distributed systems, I'm pushing pixels on highly polished interfaces. I believe the best engineering is invisible — seamless, fast, and purposeful.",
    location: "Bangalore, India",
    experience: "3+ Years",
    specialization: "AI & Full Stack",
    status: "Open to Work",
    email: "meet@example.com",
    phone: "+91 98765 43210",
    address: "Bangalore, Karnataka, IN",
    github: "#",
    linkedin: "#",
    instagram: "#",
    resume: "#",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&auto=format",
    available: true,
    roles: ["AI Engineer", "Software Developer", "Full Stack Developer", "ML Enthusiast", "Problem Solver"],
  },
  stats: [
    { label: "Projects Built", value: 42, suffix: "+" },
    { label: "Certificates", value: 18, suffix: "" },
    { label: "Hackathons", value: 9, suffix: "" },
    { label: "Research Papers", value: 4, suffix: "" },
  ],
  skills: [
    { name: "Python", level: 92, category: "Programming" },
    { name: "TypeScript", level: 88, category: "Programming" },
    { name: "Go", level: 72, category: "Programming" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "Next.js", level: 88, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "FastAPI", level: 82, category: "Backend" },
    { name: "PostgreSQL", level: 83, category: "Database" },
    { name: "MongoDB", level: 78, category: "Database" },
    { name: "PyTorch", level: 85, category: "AI/ML" },
    { name: "LangChain", level: 76, category: "AI/ML" },
    { name: "AWS", level: 75, category: "Cloud" },
    { name: "Docker", level: 82, category: "DevOps" },
    { name: "Kubernetes", level: 65, category: "DevOps" },
  ],
  projects: [
    {
      id: 1, title: "NeuralChat — AI Conversation Platform",
      description: "A production-grade conversational AI platform with multi-modal inputs, RAG pipeline, and real-time streaming responses.",
      tags: ["Next.js", "FastAPI", "LangChain", "PostgreSQL"], category: "AI/ML",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop&auto=format",
      github: "#", demo: "#", featured: true,
    },
    {
      id: 2, title: "Cosmos — 3D Data Visualization Engine",
      description: "WebGL-powered data visualization tool for exploring high-dimensional datasets with real-time transformations.",
      tags: ["React", "Three.js", "D3.js", "Node.js"], category: "Frontend",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&auto=format",
      github: "#", demo: "#", featured: true,
    },
    {
      id: 3, title: "Sentinel — ML Anomaly Detection",
      description: "Real-time anomaly detection system for microservices using transformer-based time-series models.",
      tags: ["PyTorch", "Kafka", "InfluxDB", "FastAPI"], category: "AI/ML",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
      github: "#", demo: "#", featured: false,
    },
  ],
  experiences: [
    {
      id: 1, role: "Senior AI Engineer", company: "DeepMind × Collaborator",
      duration: "Jan 2024 – Present", location: "Remote",
      achievements: [
        "Architected a multi-agent LLM orchestration system processing 2M+ daily inferences",
        "Reduced model latency by 40% through quantization and speculative decoding",
        "Led a team of 6 engineers delivering production RAG pipelines",
      ],
      tech: ["Python", "PyTorch", "LangChain", "Kubernetes"],
    },
    {
      id: 2, role: "Full Stack Engineer", company: "Stealth AI Startup",
      duration: "Jun 2023 – Dec 2023", location: "San Francisco, CA",
      achievements: [
        "Built the entire frontend from scratch in 3 months for Series A demo",
        "Designed real-time collaboration features using CRDTs and WebSockets",
      ],
      tech: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
    },
  ],
  education: [
    {
      id: 1, degree: "B.Tech in Computer Science & Engineering",
      university: "Indian Institute of Technology, Bangalore",
      duration: "2020 – 2024", cgpa: "9.2 / 10",
      achievements: ["Valedictorian", "Best Thesis Award", "ACM Chapter President"],
      subjects: ["Machine Learning", "Distributed Systems", "Algorithms"],
    },
  ],
  certificates: [
    { id: 1, title: "Deep Learning Specialization", org: "DeepLearning.AI", date: "Mar 2024", credId: "DL-8823-XQ", color: "#7c5cf0", link: "#", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=640&fit=crop&auto=format" },
    { id: 2, title: "AWS Solutions Architect", org: "Amazon Web Services", date: "Nov 2023", credId: "AWS-SAA-C03-9921", color: "#06b6d4", link: "#", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=640&fit=crop&auto=format" },
    { id: 3, title: "Google Cloud Professional", org: "Google Cloud", date: "Aug 2023", credId: "GCP-DA-7712", color: "#a78bfa", link: "#", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=640&fit=crop&auto=format" },
    { id: 4, title: "Kubernetes Administrator", org: "CNCF", date: "Jun 2023", credId: "CKA-2023-0045", color: "#34d399", link: "#", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=900&h=640&fit=crop&auto=format" },
  ],
  achievements: [
    { id: 1, title: "1st Place — HackAI 2024", subtitle: "National AI Hackathon, 1,200 participants", icon: "Award" },
    { id: 2, title: "Best Paper Award", subtitle: "EMNLP 2023, Attention Mechanism Research", icon: "Star" },
    { id: 3, title: "Google Summer of Code", subtitle: "Open Source Contributor, 2023", icon: "Award" },
    { id: 4, title: "Top 0.1% — LeetCode", subtitle: "Global ranking, 3,400+ problems solved", icon: "Star" },
  ],
  testimonials: [
    {
      id: 1, name: "Dr. Priya Sharma", role: "Research Lead, IIT Bangalore",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format",
      rating: 5, text: "Meet is one of the most exceptional engineers I've mentored. His ability to bridge theoretical ML research with production-grade systems is genuinely rare.",
    },
    {
      id: 2, name: "James Whitfield", role: "CTO, NovaSpark Technologies",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
      rating: 5, text: "We brought Meet in to architect our AI pipeline and he delivered beyond every expectation. Sharp, methodical, and a fantastic communicator.",
    },
  ],
};

type PortfolioData = typeof DEFAULT_DATA;

// ─── Context ──────────────────────────────────────────────────────────────────

const DataContext = createContext<{
  data: PortfolioData;
  setData: (d: PortfolioData) => void;
}>({ data: DEFAULT_DATA, setData: () => {} });

function useData() { return useContext(DataContext); }

function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem("portfolio_data");
      return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA;
    } catch { return DEFAULT_DATA; }
  });

  const setData = useCallback((d: PortfolioData) => {
    setDataState(d);
    localStorage.setItem("portfolio_data", JSON.stringify(d));
  }, []);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTyping(words: string[], speed = 80, deleteSpeed = 40, pause = 2200) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIndex] || "";
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setWordIndex((i) => (i + 1) % words.length); }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);
  return text;
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

// Scroll-reveal using IntersectionObserver (performance-safe)
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Global UI Layer: Cursor + Scroll Progress ─────────────────────────────────

function GlobalEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    let running = true;

    const moveDot = (x: number, y: number) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      if (!running) return;
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.28);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.28);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      moveDot(e.clientX, e.clientY);
    };

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };

    const onHoverIn = () => document.body.classList.add("cursor-hover");
    const onHoverOut = () => document.body.classList.remove("cursor-hover");
    const onDown = () => document.body.classList.add("cursor-click");
    const onUp = () => document.body.classList.remove("cursor-click");

    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    loop();
    onScroll();

    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" ref={progressRef} />
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

// ─── Aurora Background ────────────────────────────────────────────────────────

function Aurora() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const blobs = wrapRef.current.querySelectorAll<HTMLDivElement>(".aurora-blob");
      const xPct = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 0.3;
        blob.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="aurora-wrap" ref={wrapRef}>
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 20,
    color: i % 3 === 0 ? "rgba(124,92,240,0.5)" : i % 3 === 1 ? "rgba(6,182,212,0.4)" : "rgba(167,139,250,0.4)",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            bottom: 0,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── UI Primitives ────────────────────────────────────────────────────────────

function GlassCard({ children, className = "", hover = true, tilt = false }: {
  children: React.ReactNode; className?: string; hover?: boolean; tilt?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
  }, [tilt]);

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    cardRef.current.style.transition = "transform 0.5s ease";
    setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = ""; }, 500);
  }, [tilt]);

  return (
    <div
      ref={cardRef}
      className={`glass-card ${hover ? "" : ""} ${tilt ? "tilt-card" : ""} ${className}`}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
    >
      {children}
    </div>
  );
}

function GradientText({ children, className = "", from = "#7c5cf0", to = "#06b6d4" }: {
  children: React.ReactNode; className?: string; from?: string; to?: string;
}) {
  return (
    <span className={className} style={{ background: `linear-gradient(135deg, ${from}, ${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {children}
    </span>
  );
}

function Tag({ children, color = "purple" }: { children: React.ReactNode; color?: "purple" | "cyan" | "green" | "amber" }) {
  const colors = {
    purple: "bg-[rgba(124,92,240,0.12)] text-[#a78bfa] border-[rgba(124,92,240,0.2)]",
    cyan: "bg-[rgba(6,182,212,0.12)] text-[#06b6d4] border-[rgba(6,182,212,0.2)]",
    green: "bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.2)]",
    amber: "bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]",
  };
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{children}</span>;
}

function SectionHeader({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="section-badge">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cf0] animate-pulse" />
        {label}
      </div>
      <div className="section-divider" />
      <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text" style={{ fontFamily: "Oxanium, sans-serif" }}>{title}</h2>
      {subtitle && <p className="text-[#6060a0] max-w-xl mx-auto text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function StatCard({ label, value, suffix, start }: { label: string; value: number; suffix: string; start: boolean }) {
  const count = useCountUp(value, 1800, start);
  return (
    <GlassCard className="p-6 text-center flex-1 min-w-[130px]" tilt>
      <div className="text-4xl font-bold mb-1" style={{ fontFamily: "Oxanium, sans-serif" }}>
        <GradientText>{count}{suffix}</GradientText>
      </div>
      <div className="text-[#6060a0] text-sm font-medium">{label}</div>
    </GlassCard>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Certificates", "Achievements", "Testimonials", "Contact"];

function Nav({ active, onAdmin }: { active: string; onAdmin: () => void }) {
  const { data } = useData();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,92,240,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="text-xl font-bold tracking-wider group" style={{ fontFamily: "Oxanium, sans-serif" }}>
          <GradientText className="group-hover:opacity-80 transition-opacity">
            {data.personal.name.split(" ")[0][0]}{data.personal.name.split(" ")[1]?.[0]}.
          </GradientText>
        </button>

        <div className="hidden lg:flex items-center gap-1 relative">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === link.toLowerCase()
                  ? "text-white bg-[rgba(124,92,240,0.12)] active"
                  : "text-[#6060a0] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href={data.personal.github} className="social-btn p-2 text-[#6060a0] hover:text-white transition-colors"><Github size={18} /></a>
          <a href={data.personal.linkedin} className="social-btn p-2 text-[#6060a0] hover:text-white transition-colors"><Linkedin size={18} /></a>
          <button onClick={onAdmin} className="p-2 text-[#3a3a60] hover:text-[#6060a0] transition-colors" title="Admin"><Settings size={16} /></button>
          <button
            onClick={() => scrollTo("Contact")}
            className="btn-shimmer px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}
          >
            Hire Me
          </button>
        </div>

        <button className="lg:hidden p-2 text-[#a0a0c0]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgba(124,92,240,0.1)]" style={{ background: "rgba(5,5,15,0.98)", backdropFilter: "blur(24px)" }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="w-full text-left px-6 py-3.5 text-[#a0a0c0] hover:text-white border-b border-[rgba(255,255,255,0.04)] text-sm transition-colors">
              {link}
            </button>
          ))}
          <button onClick={onAdmin} className="w-full text-left px-6 py-3.5 text-[#6060a0] text-sm flex items-center gap-2"><Settings size={14} /> Admin Panel</button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { data } = useData();
  const role = useTyping(data.personal.roles);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Orbital Decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div style={{ position: "relative", width: 520, height: 520 }}>
          {/* Ring 1 */}
          <div className="orbit-ring" style={{ width: 480, height: 480, borderColor: "rgba(124,92,240,0.12)", borderWidth: 1, animation: "orbit 40s linear infinite" }}>
            {[0, 90, 180, 270].map((a) => {
              const r = a * Math.PI / 180;
              return (
                <div key={a} style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#7c5cf0", top: "50%", left: "50%", transform: `rotate(${a}deg) translateX(240px) translate(-50%, -50%)` }} />
              );
            })}
          </div>
          {/* Ring 2 */}
          <div className="orbit-ring" style={{ width: 340, height: 340, borderColor: "rgba(6,182,212,0.1)", borderWidth: 1, borderStyle: "dashed", animation: "orbitReverse 28s linear infinite" }} />
          {/* Ring 3 */}
          <div className="orbit-ring" style={{ width: 200, height: 200, borderColor: "rgba(167,139,250,0.12)", borderWidth: 1, animation: "orbit 18s linear infinite" }} />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {data.personal.available && (
          <div className="hero-line hero-line-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(6,182,212,0.35)] bg-[rgba(6,182,212,0.08)] text-[#06b6d4] text-xs tracking-widest uppercase mb-8 badge-pulse" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            Available for Opportunities
          </div>
        )}

        <h1 className="mb-4 leading-none tracking-tight" style={{ fontFamily: "Oxanium, sans-serif" }}>
          <span className="hero-line hero-line-2 block text-5xl md:text-7xl lg:text-8xl font-light text-[#e8e8f0] opacity-80">I'M</span>
          <span className="hero-line hero-line-3 block text-5xl md:text-7xl lg:text-8xl font-bold glow-text">
            <GradientText>{data.personal.name}</GradientText>
          </span>
        </h1>

        <div className="hero-line hero-line-4 h-14 flex items-center justify-center mb-8">
          <span className="text-xl md:text-3xl font-light text-[#a0a0c0]" style={{ fontFamily: "Oxanium, sans-serif" }}>
            {role}<span className="typewriter-cursor" />
          </span>
        </div>

        <div className="hero-line hero-line-5 flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => scrollTo("projects")}
            className="btn-shimmer group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white hover:opacity-90 hover:gap-3 transition-all"
            style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}
          >
            View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a href={data.personal.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-[rgba(124,92,240,0.3)] text-[#a0a0c0] hover:text-white hover:border-[rgba(124,92,240,0.6)] transition-all">
            <Download size={16} /> Resume
          </a>
          <button onClick={() => scrollTo("contact")} className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-[rgba(255,255,255,0.08)] text-[#6060a0] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all">
            Contact Me
          </button>
        </div>

        <div className="hero-line hero-line-5 flex items-center justify-center gap-4">
          {[{ icon: Github, href: data.personal.github }, { icon: Linkedin, href: data.personal.linkedin }, { icon: Mail, href: `mailto:${data.personal.email}` }, { icon: Instagram, href: data.personal.instagram }].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} className="social-btn p-3 rounded-xl border border-[rgba(255,255,255,0.06)] text-[#6060a0] hover:text-white hover:border-[rgba(124,92,240,0.3)] hover:bg-[rgba(124,92,240,0.08)]">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ animation: "float 3s ease-in-out infinite" }}>
        <ChevronDown size={24} className="text-[#3a3a60]" />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { data } = useData();
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="About Me"
          title={<><GradientText>Crafting Intelligence</GradientText><br />From Code to Cosmos</>}
        />
        <div ref={ref} className="grid md:grid-cols-2 gap-14 items-center">
          {/* Photo */}
          <div className={`reveal-left ${visible ? "visible" : ""}`}>
            <div className="relative">
              <div className="photo-wrap w-full aspect-[4/5] rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,92,240,0.2), rgba(6,182,212,0.1))" }}>
                <img src={data.personal.photo} alt={data.personal.name} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,15,0.6) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}>
                <Brain size={36} className="text-white" />
              </div>
              {/* Glow ring behind photo */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(124,92,240,0.12)" }} />
            </div>
          </div>

          {/* Content */}
          <div className={`reveal-right ${visible ? "visible" : ""} delay-200`}>
            <p className="text-[#8080b0] leading-relaxed mb-4 text-base">{data.personal.bio1}</p>
            <p className="text-[#8080b0] leading-relaxed mb-8 text-base">{data.personal.bio2}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "Location", value: data.personal.location },
                { label: "Experience", value: data.personal.experience },
                { label: "Specialization", value: data.personal.specialization },
                { label: "Status", value: data.personal.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 p-3 rounded-xl border border-[rgba(124,92,240,0.08)] bg-[rgba(124,92,240,0.04)] hover:border-[rgba(124,92,240,0.2)] transition-colors">
                  <span className="text-[#7c5cf0] text-sm mt-0.5">▸</span>
                  <div>
                    <div className="text-[#6060a0] text-xs mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                    <div className="text-[#e8e8f0] text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-6 border-t border-[rgba(124,92,240,0.1)]">
              {data.stats.map((s) => <StatCard key={s.label} {...s} start={visible} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  const { data } = useData();
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, visible } = useReveal();
  const cats = ["All", ...Array.from(new Set(data.skills.map((s) => s.category)))];
  const filtered = activeCategory === "All" ? data.skills : data.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Skills"
          title={<><GradientText>Technical</GradientText> Arsenal</>}
          subtitle="A curated set of tools I wield to build systems that scale, perform, and endure."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 btn-shimmer ${
                activeCategory === cat
                  ? "text-white border border-[rgba(124,92,240,0.5)] bg-[rgba(124,92,240,0.2)] shadow-[0_0_20px_rgba(124,92,240,0.2)]"
                  : "text-[#6060a0] border border-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(124,92,240,0.25)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <GlassCard
              key={skill.name}
              tilt
              className={`p-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${Math.min(i * 50, 400)}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#e8e8f0] font-semibold text-sm">{skill.name}</span>
                <span className="font-mono text-xs" style={{ color: "#7c5cf0", fontFamily: "'JetBrains Mono', monospace" }}>{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden" style={{ transformOrigin: "left" }}>
                <div
                  className="skill-bar-fill h-full rounded-full"
                  style={{ width: `${skill.level}%`, transform: visible ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${Math.min(i * 60, 500)}ms` }}
                />
              </div>
              <div className="mt-3"><Tag color="purple">{skill.category}</Tag></div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { ref, visible } = useReveal();
  const cats = ["All", ...Array.from(new Set(data.projects.map((p) => p.category)))];
  const filtered = data.projects.filter((p) => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Projects" title={<>Selected <GradientText>Work</GradientText></>} subtitle="Systems designed and shipped — from research prototypes to production at scale." />

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 btn-shimmer ${
                  activeFilter === cat
                    ? "text-white border border-[rgba(124,92,240,0.5)] bg-[rgba(124,92,240,0.2)]"
                    : "text-[#6060a0] border border-[rgba(255,255,255,0.06)] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by title or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="premium-input sm:ml-auto sm:w-72"
          />
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`project-card glass-card group overflow-hidden transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${Math.min(i * 80, 400)}ms` }}
            >
              {/* Image area */}
              <div className="relative h-52 overflow-hidden bg-[rgba(124,92,240,0.05)]">
                <img src={project.image} alt={project.title} className="project-img w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,26,0.95) 0%, transparent 55%)" }} />
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Tag color="amber">⭐ Featured</Tag>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={project.github} className="p-1.5 rounded-lg bg-[rgba(5,5,15,0.85)] text-[#a0a0c0] hover:text-white border border-[rgba(255,255,255,0.1)] transition-colors"><Github size={14} /></a>
                  <a href={project.demo} className="p-1.5 rounded-lg bg-[rgba(5,5,15,0.85)] text-[#a0a0c0] hover:text-white border border-[rgba(255,255,255,0.1)] transition-colors"><ExternalLink size={14} /></a>
                </div>

                {/* HOVER DRAWER */}
                <div className="project-drawer rounded-b-none">
                  <h3 className="text-[#e8e8f0] font-bold text-sm mb-1 leading-snug" style={{ fontFamily: "Oxanium, sans-serif" }}>{project.title}</h3>
                  <p className="text-[#8080b0] text-xs leading-relaxed mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">{project.tags.slice(0, 4).map((tag) => <Tag key={tag} color="purple">{tag}</Tag>)}</div>
                </div>
              </div>

              {/* Card body (visible below image without hover, fades out when drawer is active) */}
              <div className="p-5 transition-all duration-400 group-hover:opacity-0 group-hover:pointer-events-none">
                <h3 className="text-[#e8e8f0] font-bold text-sm leading-snug mb-1" style={{ fontFamily: "Oxanium, sans-serif" }}>{project.title}</h3>
                <p className="text-[#6060a0] text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">{project.tags.slice(0, 3).map((tag) => <Tag key={tag} color="purple">{tag}</Tag>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const { data } = useData();
  const { ref, visible } = useReveal();

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Experience" title={<>Professional <GradientText>Journey</GradientText></>} />
        <div ref={ref} className="relative pl-12">
          {/* Animated timeline line */}
          <div className={`timeline-line ${visible ? "visible" : ""}`} />

          <div className="space-y-10">
            {data.experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${i * 180}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[46px] top-1.5 w-6 h-6 rounded-full border-2 border-[#7c5cf0] bg-[#05050f] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }} />
                </div>

                <GlassCard className="p-6" tilt>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-[#e8e8f0] font-bold text-lg" style={{ fontFamily: "Oxanium, sans-serif" }}>{exp.role}</h3>
                      <div className="font-medium text-sm" style={{ color: "#7c5cf0" }}>{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#6060a0] text-xs mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{exp.duration}</div>
                      <div className="text-[#6060a0] text-xs flex items-center gap-1 justify-end"><MapPin size={10} /> {exp.location}</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="flex gap-2 text-[#8080b0] text-sm">
                        <ChevronRight size={14} className="text-[#7c5cf0] mt-0.5 shrink-0" />{a}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(124,92,240,0.1)]">
                    {exp.tech.map((t) => <Tag key={t} color="cyan">{t}</Tag>)}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Certificate Lightbox ─────────────────────────────────────────────────────

function CertLightbox({ cert, onClose }: { cert: any; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full glass-card overflow-hidden"
        style={{ borderColor: cert.color + "44", borderWidth: 1, animation: "heroReveal 0.4s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(124,92,240,0.12)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cert.color + "22" }}>
              <Award size={18} style={{ color: cert.color }} />
            </div>
            <div>
              <div className="text-[#e8e8f0] font-bold text-sm" style={{ fontFamily: "Oxanium, sans-serif" }}>{cert.title}</div>
              <div className="text-[#6060a0] text-xs">{cert.org} · {cert.date}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[#6060a0] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Certificate Image */}
        {cert.image ? (
          <div className="relative bg-[rgba(0,0,0,0.4)]" style={{ maxHeight: "55vh", overflow: "hidden" }}>
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full object-contain"
              style={{ maxHeight: "55vh" }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 60px rgba(${cert.color === "#7c5cf0" ? "124,92,240" : "6,182,212"},0.1)` }} />
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-[#3a3a60] text-sm" style={{ background: "rgba(0,0,0,0.3)" }}>
            No image available
          </div>
        )}

        {/* Footer */}
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[#6060a0] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Credential ID</div>
            <div className="text-[#e8e8f0] text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{cert.credId}</div>
          </div>
          <div className="flex gap-3">
            {cert.image && (
              <a
                href={cert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs border border-[rgba(124,92,240,0.3)] text-[#a78bfa] hover:bg-[rgba(124,92,240,0.1)] transition-all"
              >
                <ExternalLink size={12} /> Open Full Image
              </a>
            )}
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white transition-all"
              style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}
            >
              <ExternalLink size={12} /> Verify Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Certificates (Flip Cards) ────────────────────────────────────────────────

function Certificates() {
  const { data } = useData();
  const { ref, visible } = useReveal();
  const [lightbox, setLightbox] = useState<any>(null);

  return (
    <section id="certificates" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Certificates" title={<><GradientText>Credentials</GradientText> & Learning</>} subtitle="Hover a card to see details. Click to view the certificate image." />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.certificates.map((cert, i) => (
            <div
              key={cert.id}
              className={`flip-card-wrap transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${Math.min(i * 80, 350)}ms` }}
            >
              <div className="flip-card">
                {/* Front */}
                <div className="flip-front" style={{ borderTopColor: cert.color, borderTopWidth: 3 }}>
                  <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: cert.color + "22" }}>
                    <Award size={22} style={{ color: cert.color }} />
                  </div>
                  <h3 className="text-[#e8e8f0] font-bold text-sm mb-1 leading-snug" style={{ fontFamily: "Oxanium, sans-serif" }}>{cert.title}</h3>
                  <div className="text-[#6060a0] text-xs">{cert.org}</div>
                  <div className="text-[#3a3a60] text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{cert.date}</div>
                  <div className="mt-3 text-xs text-[#4a4a80]">Hover to flip →</div>
                </div>
                {/* Back */}
                <div className="flip-back items-start">
                  {/* Thumbnail if image exists */}
                  {cert.image && (
                    <div className="w-full h-20 rounded-lg overflow-hidden mb-3 relative">
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,26,0.7) 0%, transparent 60%)" }} />
                    </div>
                  )}
                  <div className="text-[#a78bfa] font-bold text-xs mb-2" style={{ fontFamily: "Oxanium, sans-serif" }}>Credential Details</div>
                  <div className="text-[#6060a0] text-xs mb-0.5">Issuer</div>
                  <div className="text-[#e8e8f0] text-xs font-medium mb-2">{cert.org}</div>
                  <div className="text-[#6060a0] text-xs mb-0.5">ID</div>
                  <div className="text-[#e8e8f0] text-xs font-mono mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>{cert.credId}</div>
                  <div className="flex gap-2 flex-wrap">
                    {cert.image && (
                      <button
                        onClick={() => setLightbox(cert)}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-white transition-all btn-shimmer"
                        style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)", fontSize: "0.7rem" }}
                      >
                        <Eye size={10} /> View Image
                      </button>
                    )}
                    <a href={cert.link} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-[rgba(124,92,240,0.3)] text-[#a78bfa] hover:bg-[rgba(124,92,240,0.1)] transition-all" style={{ fontSize: "0.7rem" }}>
                      <ExternalLink size={10} /> Verify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && <CertLightbox cert={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  const { data } = useData();
  const { ref, visible } = useReveal();

  return (
    <section id="achievements" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Achievements" title={<>Awards & <GradientText>Recognition</GradientText></>} />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.achievements.map((item, i) => (
            <GlassCard
              key={item.id}
              tilt
              className={`p-6 transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: `${Math.min(i * 80, 350)}ms` } as React.CSSProperties}
            >
              <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))" }}>
                <Trophy size={18} className="text-[#f59e0b]" />
              </div>
              <h3 className="font-bold text-sm mb-1 leading-snug" style={{ fontFamily: "Oxanium, sans-serif" }}>
                <span className="shimmer-gold">{item.title}</span>
              </h3>
              <p className="text-[#6060a0] text-xs leading-relaxed">{item.subtitle}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const { data } = useData();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const { ref, visible } = useReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(active);
      setActive((a) => (a + 1) % data.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [active, data.testimonials.length]);

  const switchTo = (i: number) => {
    setPrev(active);
    setActive(i);
  };

  const t = data.testimonials[active] || data.testimonials[0];

  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Testimonials" title={<>What People <GradientText>Say</GradientText></>} />
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <GlassCard className="p-8 md:p-12 text-center mb-8 relative overflow-hidden">
            {/* Decorative quote mark */}
            <div className="quote-mark">"</div>

            <div className="flex justify-center mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-[#f59e0b] fill-[#f59e0b]" />
              ))}
            </div>

            <div className="relative min-h-[80px] flex items-center justify-center">
              {data.testimonials.map((testimonial, i) => (
                <p
                  key={testimonial.id}
                  className={`text-[#a0a0c0] text-base md:text-lg leading-relaxed italic absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    i === active ? "opacity-100 translate-x-0 scale-100" :
                    i === prev ? "opacity-0 -translate-x-6 scale-97 pointer-events-none" :
                    "opacity-0 translate-x-6 scale-97 pointer-events-none"
                  }`}
                  style={{ transform: undefined }}
                >
                  "{testimonial.text}"
                </p>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="relative">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-[rgba(124,92,240,0.4)]" />
                <div className="absolute inset-0 rounded-full border border-[rgba(124,92,240,0.4)] animate-ping" style={{ animationDuration: "2.5s" }} />
              </div>
              <div className="text-left">
                <div className="text-[#e8e8f0] font-semibold">{t.name}</div>
                <div className="text-[#6060a0] text-sm">{t.role}</div>
              </div>
            </div>
          </GlassCard>

          <div className="flex justify-center gap-2">
            {data.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTo(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${i === active ? "w-8 bg-[#7c5cf0] shadow-[0_0_8px_rgba(124,92,240,0.6)]" : "w-2 bg-[rgba(124,92,240,0.2)] hover:bg-[rgba(124,92,240,0.4)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const { data } = useData();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { ref, visible } = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Contact" title={<>{"Let's"} <GradientText>Build Together</GradientText></>} subtitle="Have a project in mind or want to collaborate? I'd love to hear from you." />
        <div ref={ref} className="grid md:grid-cols-5 gap-12">
          <div className={`md:col-span-2 space-y-5 reveal-left ${visible ? "visible" : ""}`}>
            {[
              { icon: Mail, label: "Email", value: data.personal.email, color: "#7c5cf0" },
              { icon: Phone, label: "Phone", value: data.personal.phone, color: "#06b6d4" },
              { icon: MapPin, label: "Location", value: data.personal.address, color: "#a78bfa" },
            ].map(({ icon: Icon, label, value, color }) => (
              <GlassCard key={label} className="p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `${color}22` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-[#6060a0] text-xs mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                  <div className="text-[#e8e8f0] text-sm font-medium">{value}</div>
                </div>
              </GlassCard>
            ))}

            {/* Social */}
            <div className="flex gap-3 pt-2">
              {[{ icon: Github, href: data.personal.github }, { icon: Linkedin, href: data.personal.linkedin }, { icon: Instagram, href: data.personal.instagram }].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="social-btn p-3 rounded-xl border border-[rgba(255,255,255,0.06)] text-[#6060a0] hover:text-white hover:border-[rgba(124,92,240,0.3)] hover:bg-[rgba(124,92,240,0.08)]">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className={`md:col-span-3 reveal-right ${visible ? "visible" : ""} delay-200`}>
            <GlassCard className="p-8">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <polyline points="8,20 16,28 32,12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
                    </svg>
                  </div>
                  <h3 className="text-[#e8e8f0] font-bold text-2xl mb-2" style={{ fontFamily: "Oxanium, sans-serif" }}>Message Sent!</h3>
                  <p className="text-[#6060a0]">{"I'll"} get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-[#7c5cf0] text-sm hover:text-[#a78bfa] transition-colors">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[{ key: "name", label: "Name", placeholder: "Your full name" }, { key: "email", label: "Email", placeholder: "your@email.com" }].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-[#6060a0] text-xs mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
                        <input
                          type={key === "email" ? "email" : "text"}
                          required
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="premium-input"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[#6060a0] text-xs mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Subject</label>
                    <input type="text" required placeholder="Project inquiry..." value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="premium-input" />
                  </div>
                  <div>
                    <label className="block text-[#6060a0] text-xs mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                    <textarea required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="premium-input" />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-shimmer w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}
                  >
                    {status === "sending" ? (
                      <><div className="spinner" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onAdmin }: { onAdmin: () => void }) {
  const { data } = useData();
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative py-12 px-6 border-t border-[rgba(124,92,240,0.1)]">
      {/* Footer aurora */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,92,240,0.06) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xl font-bold mb-1" style={{ fontFamily: "Oxanium, sans-serif" }}><GradientText>{data.personal.name}</GradientText></div>
          <div className="text-[#3a3a60] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{data.personal.tagline}</div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-[#6060a0]">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="hover:text-[#a0a0c0] transition-colors nav-link">{link}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#3a3a60] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>© 2025 {data.personal.name}</div>
          <button onClick={onAdmin} className="p-2 rounded-lg border border-[rgba(124,92,240,0.12)] text-[#3a3a60] hover:text-[#7c5cf0] hover:border-[rgba(124,92,240,0.3)] transition-all text-xs flex items-center gap-1.5 px-3">
            <Settings size={12} /> Admin
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-2 rounded-lg border border-[rgba(124,92,240,0.2)] text-[#7c5cf0] hover:bg-[rgba(124,92,240,0.1)] transition-all">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── Admin Panel ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "admin123";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); setError(false); }
    else { setError(true); setPw(""); }
  };
  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Lock size={28} className="text-white" /></div>
          <h2 className="text-2xl font-bold text-[#e8e8f0] mb-1" style={{ fontFamily: "Oxanium, sans-serif" }}>Admin Access</h2>
          <p className="text-[#6060a0] text-sm">Enter your password to continue</p>
          <p className="text-[#3a3a60] text-xs mt-1 font-mono">Default: admin123</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"} value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Password"
              className={`premium-input pr-12 ${error ? "border-red-500/50 focus:border-red-500/80" : ""}`}
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6060a0] hover:text-[#a0a0c0]">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-xs"><AlertCircle size={12} /> Incorrect password. Try again.</div>}
          <button type="submit" className="btn-shimmer w-full py-3.5 rounded-xl font-semibold text-white hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

function AdminField({ label, value, onChange, type = "text", rows }: { label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number }) {
  return (
    <div>
      <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="premium-input font-mono" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="premium-input" />
      )}
    </div>
  );
}

function AdminSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[#e8e8f0] font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "Oxanium, sans-serif" }}>
        <span className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(#7c5cf0, #06b6d4)" }} />
        {title}
      </h3>
      {children}
    </div>
  );
}

function SaveBanner({ show }: { show: boolean }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-medium transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)", boxShadow: "0 8px 32px rgba(124,92,240,0.4)" }}>
      <CheckCircle size={16} /> Changes saved successfully
    </div>
  );
}

const ADMIN_TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "stats", label: "Stats", icon: BarChart2 },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
];

function AdminPersonal() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.personal);
  const update = (key: keyof typeof local, v: string | boolean) => setLocal((p) => ({ ...p, [key]: v }));
  const save = () => { setData({ ...data, personal: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-8">
      <SaveBanner show={saved} />
      <AdminSection title="Identity">
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Full Name" value={local.name} onChange={(v) => update("name", v)} />
          <AdminField label="Tagline" value={local.tagline} onChange={(v) => update("tagline", v)} />
        </div>
      </AdminSection>
      <AdminSection title="Bio">
        <div className="space-y-4">
          <AdminField label="Bio Paragraph 1" value={local.bio1} onChange={(v) => update("bio1", v)} rows={3} />
          <AdminField label="Bio Paragraph 2" value={local.bio2} onChange={(v) => update("bio2", v)} rows={3} />
        </div>
      </AdminSection>
      <AdminSection title="Quick Facts">
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Location" value={local.location} onChange={(v) => update("location", v)} />
          <AdminField label="Experience" value={local.experience} onChange={(v) => update("experience", v)} />
          <AdminField label="Specialization" value={local.specialization} onChange={(v) => update("specialization", v)} />
          <AdminField label="Status" value={local.status} onChange={(v) => update("status", v)} />
        </div>
      </AdminSection>
      <AdminSection title="Contact Info">
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Email" value={local.email} onChange={(v) => update("email", v)} type="email" />
          <AdminField label="Phone" value={local.phone} onChange={(v) => update("phone", v)} />
          <AdminField label="Address" value={local.address} onChange={(v) => update("address", v)} />
          <AdminField label="Photo URL" value={local.photo} onChange={(v) => update("photo", v)} />
        </div>
      </AdminSection>
      <AdminSection title="Social & Resume Links">
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="GitHub URL" value={local.github} onChange={(v) => update("github", v)} />
          <AdminField label="LinkedIn URL" value={local.linkedin} onChange={(v) => update("linkedin", v)} />
          <AdminField label="Instagram URL" value={local.instagram} onChange={(v) => update("instagram", v)} />
          <AdminField label="Resume Link (Google Drive, Dropbox, etc.)" value={(local as any).resume || ""} onChange={(v) => update("resume", v)} />
        </div>
      </AdminSection>
      <AdminSection title="Hero Typing Roles">
        <div className="space-y-2 mb-3">
          {local.roles.map((role, i) => (
            <div key={i} className="flex gap-2">
              <input value={role} onChange={(e) => { const r = [...local.roles]; r[i] = e.target.value; update("roles", r as any); }} className="premium-input flex-1" />
              <button onClick={() => { const r = local.roles.filter((_, j) => j !== i); update("roles", r as any); }} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button onClick={() => update("roles", [...local.roles, "New Role"] as any)} className="flex items-center gap-2 text-[#7c5cf0] text-sm hover:text-[#a78bfa] transition-colors"><Plus size={14} /> Add Role</button>
      </AdminSection>
      <AdminSection title="Availability">
        <label className="flex items-center gap-3 cursor-pointer">
          <div onClick={() => update("available", !local.available)} className={`w-12 h-6 rounded-full transition-all duration-300 relative ${local.available ? "bg-[#7c5cf0]" : "bg-[#2a2a50]"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${local.available ? "left-7" : "left-1"}`} />
          </div>
          <span className="text-[#a0a0c0] text-sm">{local.available ? "Available for work" : "Not available"}</span>
        </label>
      </AdminSection>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminStats() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.stats);
  const update = (i: number, key: keyof typeof local[0], v: string | number) => setLocal((s) => s.map((x, j) => j === i ? { ...x, [key]: key === "value" ? Number(v) : v } : x));
  const save = () => { setData({ ...data, stats: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <AdminSection title="Animated Stats">
        <div className="space-y-4">
          {local.map((stat, i) => (
            <GlassCard key={i} className="p-5" hover={false}>
              <div className="grid sm:grid-cols-3 gap-3">
                <AdminField label="Label" value={stat.label} onChange={(v) => update(i, "label", v)} />
                <AdminField label="Value" value={String(stat.value)} onChange={(v) => update(i, "value", v)} type="number" />
                <AdminField label="Suffix (e.g. +)" value={stat.suffix} onChange={(v) => update(i, "suffix", v)} />
              </div>
            </GlassCard>
          ))}
        </div>
      </AdminSection>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminSkills() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.skills);
  const update = (i: number, key: keyof typeof local[0], v: string | number) => setLocal((s) => s.map((x, j) => j === i ? { ...x, [key]: key === "level" ? Number(v) : v } : x));
  const remove = (i: number) => setLocal((s) => s.filter((_, j) => j !== i));
  const add = () => setLocal((s) => [...s, { name: "New Skill", level: 75, category: "Programming" }]);
  const save = () => { setData({ ...data, skills: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <AdminSection title="Skills">
        <div className="space-y-3 mb-4">
          {local.map((skill, i) => (
            <GlassCard key={i} className="p-4" hover={false}>
              <div className="grid sm:grid-cols-3 gap-3 items-end">
                <AdminField label="Skill Name" value={skill.name} onChange={(v) => update(i, "name", v)} />
                <AdminField label="Level (0–100)" value={String(skill.level)} onChange={(v) => update(i, "level", v)} type="number" />
                <div>
                  <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Category</label>
                  <div className="flex gap-2">
                    <select value={skill.category} onChange={(e) => update(i, "category", e.target.value)} className="premium-input flex-1">
                      {["Programming", "Frontend", "Backend", "Database", "AI/ML", "Cloud", "DevOps", "Tools"].map((c) => <option key={c} value={c} style={{ background: "#0d0d1a" }}>{c}</option>)}
                    </select>
                    <button onClick={() => remove(i)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
              <div className="mt-3 h-1 rounded-full bg-[rgba(255,255,255,0.05)]">
                <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #7c5cf0, #06b6d4)" }} />
              </div>
            </GlassCard>
          ))}
        </div>
        <button onClick={add} className="flex items-center gap-2 text-[#7c5cf0] text-sm hover:text-[#a78bfa] transition-colors"><Plus size={14} /> Add Skill</button>
      </AdminSection>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminProjects() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.projects);
  const [editing, setEditing] = useState<number | null>(null);
  const update = (id: number, key: string, v: any) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => { const id = Date.now(); setLocal((s) => [...s, { id, title: "New Project", description: "Project description", tags: ["React"], category: "Frontend", image: "", github: "#", demo: "#", featured: false }]); setEditing(id); };
  const save = () => { setData({ ...data, projects: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Projects ({local.length})</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add Project</button>
      </div>
      <div className="space-y-4">
        {local.map((project) => (
          <GlassCard key={project.id} className="overflow-hidden" hover={false}>
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setEditing(editing === project.id ? null : project.id)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(124,92,240,0.15)] flex items-center justify-center"><FolderOpen size={14} className="text-[#7c5cf0]" /></div>
                <div>
                  <div className="text-[#e8e8f0] text-sm font-medium">{project.title}</div>
                  <div className="text-[#6060a0] text-xs">{project.category} · {project.featured ? "Featured" : "Regular"}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(project.id); }} className="p-1.5 text-red-400/50 hover:text-red-400 rounded-lg transition-all"><Trash2 size={13} /></button>
                {editing === project.id ? <ChevronUp size={16} className="text-[#6060a0]" /> : <ChevronDown size={16} className="text-[#6060a0]" />}
              </div>
            </div>
            {editing === project.id && (
              <div className="border-t border-[rgba(124,92,240,0.1)] p-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="Title" value={project.title} onChange={(v) => update(project.id, "title", v)} />
                  <AdminField label="Category" value={project.category} onChange={(v) => update(project.id, "category", v)} />
                </div>
                <AdminField label="Description" value={project.description} onChange={(v) => update(project.id, "description", v)} rows={2} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="GitHub URL" value={project.github} onChange={(v) => update(project.id, "github", v)} />
                  <AdminField label="Demo URL" value={project.demo} onChange={(v) => update(project.id, "demo", v)} />
                </div>
                <AdminField label="Cover Image URL" value={project.image} onChange={(v) => update(project.id, "image", v)} />
                <div>
                  <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tags (comma separated)</label>
                  <input value={project.tags.join(", ")} onChange={(e) => update(project.id, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="premium-input" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => update(project.id, "featured", !project.featured)} className={`w-10 h-5 rounded-full transition-all duration-300 relative ${project.featured ? "bg-[#7c5cf0]" : "bg-[#2a2a50]"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${project.featured ? "left-5" : "left-0.5"}`} />
                  </div>
                  <span className="text-[#a0a0c0] text-sm">Featured project</span>
                </label>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminExperience() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.experiences);
  const [editing, setEditing] = useState<number | null>(null);
  const update = (id: number, key: string, v: any) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => { const id = Date.now(); setLocal((s) => [...s, { id, role: "New Role", company: "Company Name", duration: "2024 – Present", location: "Remote", achievements: ["Achievement 1"], tech: ["Tech"] }]); setEditing(id); };
  const save = () => { setData({ ...data, experiences: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Experience ({local.length})</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-4">
        {local.map((exp) => (
          <GlassCard key={exp.id} className="overflow-hidden" hover={false}>
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setEditing(editing === exp.id ? null : exp.id)}>
              <div>
                <div className="text-[#e8e8f0] text-sm font-medium">{exp.role}</div>
                <div className="text-[#6060a0] text-xs">{exp.company} · {exp.duration}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(exp.id); }} className="p-1.5 text-red-400/50 hover:text-red-400 rounded-lg transition-all"><Trash2 size={13} /></button>
                {editing === exp.id ? <ChevronUp size={16} className="text-[#6060a0]" /> : <ChevronDown size={16} className="text-[#6060a0]" />}
              </div>
            </div>
            {editing === exp.id && (
              <div className="border-t border-[rgba(124,92,240,0.1)] p-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="Role" value={exp.role} onChange={(v) => update(exp.id, "role", v)} />
                  <AdminField label="Company" value={exp.company} onChange={(v) => update(exp.id, "company", v)} />
                  <AdminField label="Duration" value={exp.duration} onChange={(v) => update(exp.id, "duration", v)} />
                  <AdminField label="Location" value={exp.location} onChange={(v) => update(exp.id, "location", v)} />
                </div>
                <div>
                  <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Achievements (one per line)</label>
                  <textarea rows={3} value={exp.achievements.join("\n")} onChange={(e) => update(exp.id, "achievements", e.target.value.split("\n").filter(Boolean))} className="premium-input" />
                </div>
                <div>
                  <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Technologies (comma separated)</label>
                  <input value={exp.tech.join(", ")} onChange={(e) => update(exp.id, "tech", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="premium-input" />
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminCertificates() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.certificates);
  const update = (id: number, key: string, v: string) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => setLocal((s) => [...s, { id: Date.now(), title: "New Certificate", org: "Organization", date: "2025", credId: "CRED-001", color: "#7c5cf0", link: "#", image: "" }]);
  const save = () => { setData({ ...data, certificates: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Certificates ({local.length})</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-3">
        {local.map((cert) => (
          <GlassCard key={cert.id} className="p-4" hover={false}>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <AdminField label="Title" value={cert.title} onChange={(v) => update(cert.id, "title", v)} />
              <AdminField label="Organization" value={cert.org} onChange={(v) => update(cert.id, "org", v)} />
              <AdminField label="Date" value={cert.date} onChange={(v) => update(cert.id, "date", v)} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 items-end">
              <AdminField label="Credential ID" value={cert.credId} onChange={(v) => update(cert.id, "credId", v)} />
              <div>
                <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Accent Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={cert.color} onChange={(e) => update(cert.id, "color", e.target.value)} className="w-10 h-10 rounded-lg border border-[rgba(124,92,240,0.2)] bg-transparent cursor-pointer" />
                  <input value={cert.color} onChange={(e) => update(cert.id, "color", e.target.value)} className="premium-input flex-1 font-mono" />
                </div>
              </div>
              <button onClick={() => remove(cert.id)} className="flex items-center gap-2 px-3 py-2.5 text-red-400/70 hover:text-red-400 text-sm rounded-xl hover:bg-[rgba(255,0,0,0.05)] transition-all border border-transparent hover:border-[rgba(255,0,0,0.1)]"><Trash2 size={14} /> Remove</button>
            </div>
            {/* Image URL row */}
            <div className="mt-3 grid sm:grid-cols-5 gap-3 items-start">
              <div className="sm:col-span-4">
                <AdminField label="Certificate Image URL (paste direct image link to show it in lightbox)" value={(cert as any).image || ""} onChange={(v) => update(cert.id, "image", v)} />
              </div>
              {(cert as any).image && (
                <div className="flex items-end pb-0.5">
                  <a href={(cert as any).image} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs border border-[rgba(124,92,240,0.3)] text-[#a78bfa] hover:bg-[rgba(124,92,240,0.1)] transition-all whitespace-nowrap">
                    <Eye size={12} /> Preview
                  </a>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminAchievements() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.achievements);
  const update = (id: number, key: string, v: string) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => setLocal((s) => [...s, { id: Date.now(), title: "New Achievement", subtitle: "Description", icon: "Award" }]);
  const save = () => { setData({ ...data, achievements: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Achievements ({local.length})</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-3">
        {local.map((item) => (
          <GlassCard key={item.id} className="p-4" hover={false}>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <AdminField label="Title" value={item.title} onChange={(v) => update(item.id, "title", v)} />
              <AdminField label="Subtitle" value={item.subtitle} onChange={(v) => update(item.id, "subtitle", v)} />
            </div>
            <button onClick={() => remove(item.id)} className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-xs transition-all"><Trash2 size={12} /> Remove</button>
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminTestimonials() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.testimonials);
  const update = (id: number, key: string, v: string | number) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => setLocal((s) => [...s, { id: Date.now(), name: "New Person", role: "Role, Company", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", rating: 5, text: "Testimonial text here." }]);
  const save = () => { setData({ ...data, testimonials: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Testimonials ({local.length})</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-4">
        {local.map((t) => (
          <GlassCard key={t.id} className="p-4" hover={false}>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <AdminField label="Name" value={t.name} onChange={(v) => update(t.id, "name", v)} />
              <AdminField label="Role & Company" value={t.role} onChange={(v) => update(t.id, "role", v)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <AdminField label="Avatar URL" value={t.avatar} onChange={(v) => update(t.id, "avatar", v)} />
              <div>
                <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rating (1–5)</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((n) => (
                    <button key={n} onClick={() => update(t.id, "rating", n)} className={`p-1.5 rounded-lg transition-all ${n <= t.rating ? "text-[#f59e0b]" : "text-[#3a3a60]"}`}><Star size={16} className={n <= t.rating ? "fill-[#f59e0b]" : ""} /></button>
                  ))}
                </div>
              </div>
            </div>
            <AdminField label="Testimonial Text" value={t.text} onChange={(v) => update(t.id, "text", v)} rows={3} />
            <button onClick={() => remove(t.id)} className="mt-3 flex items-center gap-2 text-red-400/60 hover:text-red-400 text-xs transition-all"><Trash2 size={12} /> Remove</button>
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminEducation() {
  const { data, setData } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(data.education);
  const update = (id: number, key: string, v: any) => setLocal((s) => s.map((x) => x.id === id ? { ...x, [key]: v } : x));
  const remove = (id: number) => setLocal((s) => s.filter((x) => x.id !== id));
  const add = () => setLocal((s) => [...s, { id: Date.now(), degree: "New Degree", university: "University Name", duration: "2020 – 2024", cgpa: "9.0 / 10", achievements: ["Achievement"], subjects: ["Subject"] }]);
  const save = () => { setData({ ...data, education: local }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-6">
      <SaveBanner show={saved} />
      <div className="flex items-center justify-between">
        <h3 className="text-[#e8e8f0] font-bold text-base" style={{ fontFamily: "Oxanium, sans-serif" }}>Education</h3>
        <button onClick={add} className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-4">
        {local.map((edu) => (
          <GlassCard key={edu.id} className="p-4 space-y-3" hover={false}>
            <div className="grid sm:grid-cols-2 gap-3">
              <AdminField label="Degree" value={edu.degree} onChange={(v) => update(edu.id, "degree", v)} />
              <AdminField label="University" value={edu.university} onChange={(v) => update(edu.id, "university", v)} />
              <AdminField label="Duration" value={edu.duration} onChange={(v) => update(edu.id, "duration", v)} />
              <AdminField label="CGPA / Score" value={edu.cgpa} onChange={(v) => update(edu.id, "cgpa", v)} />
            </div>
            <div>
              <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Achievements (comma separated)</label>
              <input value={edu.achievements.join(", ")} onChange={(e) => update(edu.id, "achievements", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="premium-input" />
            </div>
            <div>
              <label className="block text-[#6060a0] text-xs mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Subjects (comma separated)</label>
              <input value={edu.subjects.join(", ")} onChange={(e) => update(edu.id, "subjects", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="premium-input" />
            </div>
            <button onClick={() => remove(edu.id)} className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-xs transition-all"><Trash2 size={12} /> Remove</button>
          </GlassCard>
        ))}
      </div>
      <button onClick={save} className="btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cf0, #06b6d4)" }}><Save size={16} /> Save Changes</button>
    </div>
  );
}

function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [tab, setTab] = useState("personal");
  const { data, setData } = useData();

  const handleLogin = () => { sessionStorage.setItem("admin_auth", "1"); setLoggedIn(true); };
  const handleLogout = () => { sessionStorage.removeItem("admin_auth"); setLoggedIn(false); };
  const handleReset = () => { if (confirm("Reset all data to defaults?")) { setData(DEFAULT_DATA); localStorage.removeItem("portfolio_data"); } };

  const tabContent: Record<string, React.ReactNode> = {
    personal: <AdminPersonal />, stats: <AdminStats />, skills: <AdminSkills />,
    projects: <AdminProjects />, experience: <AdminExperience />, education: <AdminEducation />,
    certificates: <AdminCertificates />, achievements: <AdminAchievements />, testimonials: <AdminTestimonials />,
  };

  return (
    <div className="fixed inset-0 z-[100] flex" style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}>
      <div className="w-64 shrink-0 flex flex-col border-r border-[rgba(124,92,240,0.15)]" style={{ background: "#08081a" }}>
        <div className="p-5 border-b border-[rgba(124,92,240,0.1)]">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-bold" style={{ fontFamily: "Oxanium, sans-serif" }}><GradientText>Admin Panel</GradientText></div>
            <button onClick={onClose} className="p-1.5 text-[#3a3a60] hover:text-[#a0a0c0] rounded-lg transition-all"><X size={16} /></button>
          </div>
          <div className="text-[#3a3a60] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Portfolio CMS</div>
        </div>

        {loggedIn && (
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {ADMIN_TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left ${tab === id ? "text-white bg-[rgba(124,92,240,0.2)] border border-[rgba(124,92,240,0.3)]" : "text-[#6060a0] hover:text-[#a0a0c0] hover:bg-[rgba(255,255,255,0.03)]"}`}>
                <Icon size={15} className={tab === id ? "text-[#7c5cf0]" : ""} />
                {label}
              </button>
            ))}
          </nav>
        )}

        {loggedIn && (
          <div className="p-3 border-t border-[rgba(124,92,240,0.1)] space-y-2">
            <button onClick={handleReset} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#6060a0] hover:text-[#f59e0b] hover:bg-[rgba(245,158,11,0.05)] transition-all"><RefreshCw size={12} /> Reset to Defaults</button>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#6060a0] hover:text-red-400 hover:bg-[rgba(255,0,0,0.05)] transition-all"><LogOut size={12} /> Sign Out</button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-w-0" style={{ background: "#05050f" }}>
        {loggedIn && (
          <div className="px-8 py-5 border-b border-[rgba(124,92,240,0.1)] flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-[#e8e8f0] font-bold text-lg" style={{ fontFamily: "Oxanium, sans-serif" }}>{ADMIN_TABS.find((t) => t.id === tab)?.label}</h2>
              <p className="text-[#6060a0] text-xs mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Changes auto-reflect on the portfolio</p>
            </div>
            <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-[rgba(124,92,240,0.2)] text-[#6060a0] hover:text-white hover:border-[rgba(124,92,240,0.4)] transition-all">
              <Eye size={14} /> View Portfolio
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-8">
          {!loggedIn ? <AdminLogin onLogin={handleLogin} /> : (tabContent[tab] ?? null)}
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.25, rootMargin: "-60px 0px 0px 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <DataProvider>
      <div className="relative min-h-screen bg-[#05050f] text-[#e8e8f0] overflow-x-hidden">
        <GlobalEffects />
        <Aurora />
        <Particles />
        <Nav active={activeSection} onAdmin={() => setShowAdmin(true)} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Achievements />
          <Testimonials />
          <Contact />
        </main>
        <Footer onAdmin={() => setShowAdmin(true)} />
        {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
      </div>
    </DataProvider>
  );
}
