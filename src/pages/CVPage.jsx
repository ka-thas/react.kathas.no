import React, { useState } from "react";
import Footer from "../components/footer";
import "../styles/global.css";

function EmailCopyButton({ children, className, style }) {
  const [state, setState] = useState("idle");

  const handleClick = () => {
    navigator.clipboard.writeText("kavinthas@gmail.com").catch(() => {});
    setState("copied");
  };

  return (
    <span className="relative inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={() => setState(s => s === "copied" ? "copied" : "hover")}
        onMouseLeave={() => setState("idle")}
        className={className}
        style={{ background: "none", border: "none", padding: 0, ...style }}
      >
        {children}
      </button>
      {state !== "idle" && (
        <span
          className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 rounded-[6px] px-[10px] py-[3px] text-[0.75rem] font-semibold whitespace-nowrap pointer-events-none shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-[background,color] duration-150"
          style={{
            background: state === "copied" ? "rgba(0,255,128,0.18)" : "rgba(30,61,43,0.97)",
            color: state === "copied" ? "#00ff80" : "rgba(255,255,255,0.85)",
            border: state === "copied" ? "1px solid rgba(0,255,128,0.35)" : "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {state === "copied" ? "Copied!" : "Copy email"}
        </span>
      )}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-[0.6rem] mb-[0.85rem]">
      <span className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#00ff80] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[rgba(0,255,128,0.2)]" />
    </div>
  );
}

function SidebarCard({ heading, children }) {
  return (
    <div className="bg-[rgba(150,200,150,0.15)] border border-white/8 rounded-xl p-[1rem_1.1rem]">
      <div className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#00ff80] mb-3">
        {heading}
      </div>
      {children}
    </div>
  );
}

function SidebarItem({ icon, children }) {
  return (
    <div className="flex items-start gap-[0.55rem] mb-2 last:mb-0 text-[0.9rem] text-white/80 leading-[1.4]">
      <svg className="shrink-0 mt-[2px] fill-[rgba(0,255,128,0.7)] w-[14px] h-[14px]" viewBox="0 0 24 24">
        {icon}
      </svg>
      {children}
    </div>
  );
}

function Entry({ title, org, sub, meta, desc }) {
  return (
    <div className="bg-[rgba(150,200,150,0.12)] border border-white/7 rounded-xl py-[1.1rem] px-5 mb-3 last:mb-0 hover:border-[rgba(0,255,128,0.2)] transition-colors duration-200">
      <div className="flex justify-between items-start gap-4 flex-wrap mb-[0.3rem]">
        <div>
          <div className="text-base font-semibold leading-[1.3] text-white">{title}</div>
          {org && <div className="text-[0.88rem] text-[#00ff80] font-medium mt-[1px]">{org}</div>}
          {sub && <div className="text-[0.82rem] text-white/40 mt-[0.2rem]">{sub}</div>}
        </div>
        {meta && <div className="text-[0.78rem] text-white/40 whitespace-nowrap shrink-0 mt-[2px]">{meta}</div>}
      </div>
      {desc && <div className="text-[0.9rem] leading-[1.6] text-white/75 mt-2">{desc}</div>}
    </div>
  );
}

const techs = [
  "HTML / CSS / JS", "React", "Tailwind", "TypeScript",
  "Python", "Java", "C", "C++", "Rust",
  "TensorFlow", "PyTorch",
  "ARMv7 Assembly", "VHDL", "Vivado / Vitis",
  "Git & GitHub",
];

const languages = [
  { name: "Norwegian", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "Tamil", level: "Fluent" },
  { name: "Spanish", level: "Conversational" },
  { name: "Japanese", level: "Beginner" },
  { name: "Korean", level: "Beginner" },
];

function CVPage() {
  return (
    <main className="max-w-[1000px] mx-auto px-4 pb-16 flex flex-col">

      {/* Hero */}
      <div className="py-10 pb-6 flex items-end justify-between gap-6 flex-wrap border-b border-white/8 mb-8">
        <div>
          <h1 className="gradient-text font-bold leading-none" style={{ fontSize: "clamp(60px, 8vw, 80px)" }}>
            Ka Thas
          </h1>
          <p className="text-[1.1rem] font-normal text-white/65 mt-[0.4rem]">Studying AI and robotics at UiO</p>
        </div>
        <a
          className="inline-flex items-center gap-2 py-2 px-5 rounded-lg font-semibold text-[0.95rem] no-underline bg-[rgba(0,255,128,0.15)] text-[#00ff80] border border-[rgba(0,255,128,0.35)] hover:opacity-80 transition-opacity"
          href="/cv_Ka_Thas_english.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </a>
      </div>

      {/* About blurb */}
      <p className="text-[0.95rem] leading-[1.7] text-white/78 bg-[rgba(150,200,150,0.1)] border border-white/6 rounded-xl py-4 px-5 mb-8">
        I am a curious and structured student with a strong interest in research at the intersection of technology, creativity, and human-robot interaction. I thrive in collaborative academic environments and have developed strong skills in teamwork, leadership, and project coordination through volunteer and organizational experience.
      </p>

      {/* Two-column body */}
      <div className="cv-body-grid grid gap-8">

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">

          <SidebarCard heading="Contact">
            <SidebarItem icon={<path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>}>
              <EmailCopyButton
                className="bg-transparent border-none p-0 cursor-pointer text-[#00ff80] text-[0.9rem] font-[inherit] hover:text-[#efff78] transition-colors"
              >
                kavinthas@gmail.com
              </EmailCopyButton>
            </SidebarItem>
            <SidebarItem icon={<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>}>
              <span>Oslo, Norway</span>
            </SidebarItem>
            <SidebarItem icon={<path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.033-1.848-3.033-1.849 0-2.131 1.44-2.131 2.926v5.676h-3.554V9h3.413v1.561h.049c.477-.9 1.64-1.85 3.37-1.85 3.6 0 4.262 2.37 4.262 5.45v6.291zM5.337 7a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zm1.777 13.452H3.56V9h3.554v11.452z"/>}>
              <a className="text-[#00ff80] text-[0.9rem] hover:text-[#efff78]" href="https://linkedin.com/in/ka-thas-6823a9293" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </SidebarItem>
          </SidebarCard>

          <SidebarCard heading="Portfolio">
            <SidebarItem icon={<path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3"/>}>
              <a className="text-[#00ff80] text-[0.9rem] hover:text-[#efff78]" href="https://github.com/ka-thas" target="_blank" rel="noopener noreferrer">github.com/ka-thas</a>
            </SidebarItem>
            <SidebarItem icon={<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>}>
              <a className="text-[#00ff80] text-[0.9rem] hover:text-[#efff78]" href="https://kathas.no/projects" target="_blank" rel="noopener noreferrer">kathas.no/projects</a>
            </SidebarItem>
          </SidebarCard>

          <SidebarCard heading="Technologies">
            <div className="flex flex-wrap gap-[0.4rem]">
              {techs.map(t => (
                <span key={t} className="text-[0.78rem] font-medium bg-[rgba(0,255,128,0.08)] border border-[rgba(0,255,128,0.2)] text-white/85 rounded-[5px] py-[2px] px-2">
                  {t}
                </span>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard heading="Languages">
            {languages.map(l => (
              <div key={l.name} className="mb-[0.6rem] last:mb-0">
                <div className="text-[0.9rem] text-white/90 font-medium">{l.name}</div>
                <div className="text-[0.78rem] text-white/45 mt-[1px]">{l.level}</div>
              </div>
            ))}
          </SidebarCard>

          <SidebarCard heading="References">
            <div className="mb-[0.85rem]">
              <div className="text-[0.9rem] text-white/90 font-medium">Lars Tveito</div>
              <div className="text-[0.78rem] text-white/45 mt-[1px]">University Lector, UiO</div>
              <div className="text-[0.78rem] text-[rgba(0,255,128,0.6)] mt-[2px]">For Teaching Assistant role</div>
            </div>
            <div className="mb-3">
              <div className="text-[0.9rem] text-white/90 font-medium">Adrian Bergflødt</div>
              <div className="text-[0.78rem] text-white/45 mt-[1px]">Head Engineer, Sonen</div>
              <div className="text-[0.78rem] text-[rgba(0,255,128,0.6)] mt-[2px]">For Lab Assistant role</div>
            </div>
            <div className="text-[0.75rem] text-white/30 mt-1">Contact details on request.</div>
          </SidebarCard>

        </aside>

        {/* Main column */}
        <div className="flex flex-col gap-8">

          <section>
            <SectionTitle>Education</SectionTitle>
            <Entry title="Master's — Informatics: Robotics and Intelligent Systems" org="Institute of Informatics, UiO" meta="Aug 2025 – Present" />
            <Entry title="Bachelor's — Informatics: Robotics and Intelligent Systems" org="Institute of Informatics, UiO" meta="Aug 2022 – Jun 2025" />
            <Entry title="Exchange Semester" org="Korea University, Seoul" meta="Sep – Dec 2024" />
            <Entry title="Upper Secondary School" org="Rosenvilde VGS" sub="Art, Design & Architecture · Advanced IT and Mathematics" meta="Aug 2019 – Jun 2022" />
          </section>

          <section>
            <SectionTitle>Work Experience</SectionTitle>
            <Entry
              title="Teaching Assistant" org="UiO" meta="Aug 2023 – Present"
              desc="Taught courses in Introduction to OOP, Mechatronics, Introduction to Operating Systems and Networks, and Algorithms and Data Structures."
            />
            <Entry
              title="Lab Assistant" org="Sonen" meta="Jan 2025 – Present"
              desc="Maintain and provide training in the use of 3D printers, laser cutters, and other equipment."
            />
            <Entry
              title="Sales Assistant" org="Plantasjen" meta="Apr 2021 – Aug 2022"
              desc="Customer service and plant care."
            />
            <Entry
              title="E-commerce" org="Norli" meta="Nov 2021 – Jan 2022"
              desc="Order management, customer support, and product handling in an online store."
            />
          </section>

          <section>
            <SectionTitle>Leadership &amp; Volunteering</SectionTitle>
            <Entry
              title="Leader" org="Mikro (Student Association)" meta="Sep 2022 – Sep 2024"
              desc="Improved the social and academic environment by organizing events and collaborating with faculty members."
            />
            <Entry
              title="Board Member" org="Fagutvalget, Institutt for Informatikk" meta="Feb 2023 – Present"
              desc="Shaped course content by representing and communicating student feedback to the department."
            />
            <Entry
              title="Head of PR" org="Cybernetisk Selskab" meta="Jan – Dec 2023"
              desc="Coordinated the PR team of the student pub, responsible for weekly event promotion and communication."
            />
            <Entry title="Representative" org="Student Parliament" meta="Aug 2023 – May 2024" />
            <Entry title="Economy, Student Council" org="Upper Secondary School" meta="Aug 2021 – Jun 2022" />
          </section>

        </div>
      </div>
            <Footer />
    </main>
  );
}

export default CVPage;
