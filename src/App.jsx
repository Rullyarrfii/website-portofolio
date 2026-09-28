import { supabase } from "./supabaseClient";
import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Code,
  Database,
  Server,
  Download,
  Award,
  Mail,
  Send,
  CheckCircle2,
  ChevronRight,
  Cpu,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";

// Komponen SVG Ikon Sosial Media Mandiri
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("projects");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // State untuk data dinamis dari Supabase
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase saat halaman pertama kali dibuka
  useEffect(() => {
    async function loadPortfolioData() {
      try {
        setLoading(true);

        // 1. Fetch data projects
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: true });

        if (projectError) throw projectError;
        if (projectData) setProjects(projectData);

        // 2. Fetch data skills
        const { data: skillData, error: skillError } = await supabase
          .from("skills")
          .select("*")
          .order("id", { ascending: true });

        if (skillError) throw skillError;
        if (skillData) {
          // Format data array tabel skills menjadi object key-value
          const formattedSkills = {};
          skillData.forEach((item) => {
            formattedSkills[item.category] = item.items;
          });
          setSkills(formattedSkills);
        }
      } catch (err) {
        console.error("Gagal mengambil data dari Supabase:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  // Data Sertifikat
  const [certificates] = useState([
    {
      name: "Backend Engineering & Go Development",
      issuer: "Technical Certification",
      year: "2024",
    },
    {
      name: "Database Design & SQL Optimization",
      issuer: "Data Academy",
      year: "2023",
    },
    {
      name: "Python Web Scraping & Automation Pipeline",
      issuer: "Software Engineering Cert",
      year: "2023",
    },
  ]);

  // Data Dokumen Download
  const [documents] = useState([
    {
      title: "Curriculum Vitae (CV)",
      desc: "Dokumen riwayat pengalaman backend, keahlian teknis, dan kontak terbaru.",
      file: "Resume_Backend_Developer.pdf",
    },
    {
      title: "Technical Portfolio Summary",
      desc: "Ringkasan dokumentasi arsitektur proyek HRIS dan Web Scraper.",
      file: "Technical_Portfolio.pdf",
    },
    {
      title: "Surat Pengalaman Kerja / Paklaring",
      desc: "Dokumen pendukung pengalaman kerja profesional dan verifikasi.",
      file: "Experience_Letter.pdf",
    },
  ]);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    {
      text: "System initialized. Type 'help' to see command list.",
      type: "sys",
    },
    { text: "Backend Dev Environment [Session Active]", type: "info" },
  ]);
  const terminalEndRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInput.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response =
            "Commands: 'whoami', 'skills', 'projects', 'contact', 'clear'";
          break;
        case "whoami":
          response =
            "Software Developer / Backend Engineer focused on Go, Python, PostgreSQL, and Web Automation.";
          break;
        case "skills":
          response =
            "Go, Python, PostgreSQL, Redis, REST APIs, Web Crawling, Docker.";
          break;
        case "projects":
          response =
            "1. Enterprise HRIS System  2. Fault-Tolerant Web Crawler  3. High Performance API Gateway.";
          break;
        case "contact":
          response =
            "Email: rullyarrfii.dev@gmail.com | Available for Full-Time & Freelance opportunities.";
          break;
        case "clear":
          setTerminalHistory([]);
          setTerminalInput("");
          return;
        default:
          response = `Command '${cmd}' not found. Type 'help' for available commands.`;
      }

      setTerminalHistory((prev) => [
        ...prev,
        { text: `$ ${terminalInput}`, type: "input" },
        { text: response, type: "output" },
      ]);
      setTerminalInput("");
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const copyEmail = () => {
    navigator.clipboard.writeText("rullyarrfii.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownload = (fileName) => {
    alert(
      `File "${fileName}" disiapkan untuk diunduh. Nanti URL file ini akan terhubung ke Storage Supabase.`,
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-emerald-400 font-semibold text-base sm:text-lg">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>dev@backend:~$</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-mono">
            {[
              "projects",
              "skills",
              "certifications",
              "documents",
              "contact",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize transition-colors pb-1 ${
                  activeTab === tab
                    ? "text-emerald-400 border-b-2 border-emerald-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-2 font-mono text-sm">
            {[
              "projects",
              "skills",
              "certifications",
              "documents",
              "contact",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 capitalize ${
                  activeTab === tab
                    ? "text-emerald-400 font-bold"
                    : "text-slate-400"
                }`}
              >
                &gt; {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Backend Roles & Freelance Projects</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Software Developer &{" "}
              <span className="text-emerald-400 font-mono">
                Backend Specialist
              </span>
            </h1>

            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Berpengalaman membangun sistem backend modular, perancangan
              database relasional, pengembangan sistem HRIS terintegrasi, serta
              automasi web scraping berkinerja tinggi.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={() => setActiveTab("contact")}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg font-mono text-xs sm:text-sm transition flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Mulai Diskusi / Kolaborasi</span>
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-lg font-mono text-xs sm:text-sm transition flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CV & Portofolio</span>
              </button>
            </div>
          </div>

          {/* Interactive Terminal Window */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-slate-500 text-[11px]">bash terminal</span>
            </div>
            <div className="p-4 h-60 overflow-y-auto space-y-2 text-slate-300">
              {terminalHistory.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "input"
                      ? "text-emerald-400"
                      : line.type === "sys"
                        ? "text-cyan-400"
                        : "text-slate-300"
                  }
                >
                  {line.text}
                </div>
              ))}
              <div ref={terminalEndRef}></div>
            </div>
            <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center space-x-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="type 'help' and enter..."
                className="w-full bg-transparent outline-none text-emerald-300 placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Section: Projects */}
        {activeTab === "projects" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center space-x-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <span>Featured Projects & Systems</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition"
                >
                  <div className="text-xs font-mono text-emerald-400 mb-2 uppercase">
                    {proj.category}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {proj.summary}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-mono text-slate-500 mb-1">
                      Architecture Highlights:
                    </div>
                    <ul className="space-y-1.5">
                      {proj.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-300 flex items-start space-x-2"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                    {proj.stack.map((st, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded font-mono"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Skills */}
        {activeTab === "skills" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Technical Skills Matrix</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <h3 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-lg font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Certifications */}
        {activeTab === "certifications" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Certifications & Credentials</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
                    <h3 className="font-semibold text-white text-base mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                    <span>Issued {cert.year}</span>
                    <span className="text-emerald-400">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Documents */}
        {activeTab === "documents" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>Documents & Downloads</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <Download className="w-7 h-7 text-emerald-400 mb-3" />
                    <h3 className="font-bold text-white text-lg mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">
                      {doc.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.file)}
                    className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-400 rounded font-mono text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Contact */}
        {activeTab === "contact" && (
          <section className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-mono text-white">
                Hubungi & Mulai Kolaborasi
              </h2>
              <p className="text-slate-400 text-sm">
                Terbuka untuk tawaran posisi Full-time, proyek Freelance,
                ataupun koneksi teknis.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="font-mono text-xs text-slate-300">
                  rullyarrfii.dev@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedEmail ? "Tersalin!" : "Salin Email"}</span>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Pesan Anda terkirim!");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Nama / Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Teknologi Bangsa"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Email Anda
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@perusahaan.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Pesan / Penawaran Kerjasama
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan kebutuhan proyek atau tawaran kerja..."
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded font-mono text-sm transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs font-mono text-slate-500">
        <div className="flex justify-center space-x-4 mb-2">
          <a
            href="https://github.com/Rullyarrfii"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-emerald-400 transition"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/rullyarrfii/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-emerald-400 transition"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
        <p>
          © 2026 Website Portfolio || Rullyarrfii.
        </p>
      </footer>
    </div>
  );
}
