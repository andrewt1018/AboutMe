import { useState } from "react";

// ---------------------------- Shared Data ----------------------------
const PROFILE = {
  name: "Andrew Tan",
  headline: "CS & Math @ Purdue · SWE · Data/ML",
  summary:
    "I build reliable data systems, thoughtful ML experiments, and clean web apps. Previously John Deere (Data Eng), I-GUIDE (geospatial), and IDEAS Lab (ML).",
  email: "tan434@purdue.edu",
  location: "West Lafayette, IN",
  resumeUrl: "/resume.pdf", // ← add your image to /public/profile.jpg or update this path
  imageUrl: "/profile.jpg",
  socials: [
    { label: "GitHub", href: "https://github.com/andrewt1018" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/andrewt8101" },
    { label: "Instagram", href: "https://www.instagram.com/andrew.t.th" },
  ],
};

const PROJECTS = [
  {
    title: "Word Search Solver (Java)",
    description:
      "Generator + solver pipeline; heuristics + pruning for speed; clean CLI + tests.",
    tags: ["Java", "Algorithms"],
    link: "https://github.com/andrewtan434/wordsearch-solver",
  },
  {
    title: "Data Quality Tracker (John Deere)",
    description:
      "Spark/Scala schema + automation for data quality, saving significant annual costs.",
    tags: ["Spark", "Scala", "Data Eng"],
    link: "#",
  },
  {
    title: "Machine Unlearning (TPML)",
    description:
      "Reframing MU as multitask learning using task-vector projection; early prototype.",
    tags: ["ML", "Optimization"],
    link: "#",
  },
  {
    title: "Geospatial Flood Tools (I-GUIDE)",
    description:
      "Sedona pipelines for FIM processing, joins with census tracts, and spatial stats.",
    tags: ["Apache Sedona", "Geospatial"],
    link: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Data Engineering Intern",
    org: "John Deere",
    time: "Summer 2024",
    bullets: [
      "Designed Spark/Scala table schema + CI for DQ tracking",
      "Benchmarked RAPIDS GPU vs Photon CPU clusters",
    ],
  },
  {
    role: "Research Lead",
    org: "I-GUIDE Datamine",
    time: "2024–2025",
    bullets: [
      "Led geospatial processing workflows (FIM, Sedona)",
      "Mentored teammates; reproducible pipelines",
    ],
  },
];

const Link = (props) => (
  <a {...props} className={(props.className ?? "") + " underline-offset-4 hover:underline"} />
);
const Chip = ({ children }) => (
  <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

export default function Paper() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      <main className="mx-auto max-w-5xl px-6 py-14">
        <header className="mb-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-1 text-gray-600">{PROFILE.headline}</p>
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700">{PROFILE.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>{PROFILE.location}</Chip>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 px-4 py-2 font-medium hover:shadow"
                >
                  Download Resume
                </a>
                <div className="flex items-center gap-4">
                  {PROFILE.socials.map((s) => (
                    <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col items-center justify-center w-full sm:w-auto">
            <div className="h-72 w-72 overflow-hidden rounded-full border border-gray-300 shadow-md flex items-center justify-center mx-auto">
              <img
                src={PROFILE.imageUrl}
                alt="Profile of Andrew Tan"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <h2 className="mt-14 mb-4 text-2xl font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold hover:underline">{p.title}</h3>
                <span className="text-xl">↗</span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            </a>
          ))}
        </div>

        <h2 className="mt-14 mb-4 text-2xl font-semibold">Experience</h2>
        <div className="space-y-4">
          {EXPERIENCE.map((e) => (
            <div key={e.role} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role} · {e.org}</h3>
                <span className="text-sm text-gray-600">{e.time}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
          Contact: <Link href={`mailto:${PROFILE.email}`}>{PROFILE.email}</Link>
          <footer className="mt-6 text-center text-gray-500">© {new Date().getFullYear()} {PROFILE.name}</footer>
        </div>
      </main>
    </div>
  );
}