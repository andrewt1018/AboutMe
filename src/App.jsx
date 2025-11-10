const PROFILE = {
  name: "Andrew Tan",
  headline: "CS & Math @ Purdue · ML Researcher · SWE",
  summary: (
    <>
      Andrew Tan is a senior studying Computer Science and Math at Purdue University. He was born in New Brunswick, NJ, but raised in Shanghai, China.<br /><br />
      He is avid about ML research, specifically in the fields of machine unlearning. Currently, he is working closely with Prof.{" "}
      <a href="https://www.cs.purdue.edu/people/faculty/rajivak.html"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-800 transition-colors">
        Rajiv Khanna
      </a> 
      {" "}and Ph. D candidate{" "} 
      <a href="https://haorantang.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-800 transition-colors">
        Haoran Tang
      </a> 
      {" "}on developing a new unlearning algorithm through model unmerging. Feel free to reach out if you're interested!
    </>
  ),
  schoolEmail: "tan434@purdue.edu",
  personalEmail: "andrewt8101@gmail.com",
  phone: "+1 (312) 868-1341",
  location: "West Lafayette, IN",
  resumeUrl: "resume.pdf",
  imageUrl: "profile.jpg",
  socials: [
    { label: "GitHub", href: "https://github.com/andrewt1018/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/andrewt8101/" },
    { label: "Instagram", href: "https://www.instagram.com/andrew.t.th/" },
  ],
};

const PROJECTS = [
  {
    title: "TranslationMerge",
    description:
      "User-friendly book reading app that supports in-app translations and free-lance publishing.",
    tags: ["NLP", "Python", "Model Merging"],
    link: "https://github.com/andrewt1018/TranslationMerge",
  },
  {
    title: "OuiTravel",
    description:
      "Travel planning + documentation web app with community, journaling, and gamification features.",
    tags: ["React", "CSS", "MongoDB"],
    link: "https://github.com/andrewt1018/OuiTravel",
  },
  {
    title: "Word Search Solver (Java)",
    description:
      "Hobby project. Generator + solver pipeline, heuristics + pruning for speed.",
    tags: ["Java", "Algorithms"],
    link: "https://github.com/andrewt1018/WordSearchSolver",
  },
  {
    title: "ReaderNation",
    description:
      "User-friendly book reading app that supports in-app translations and free-lance publishing.",
    tags: ["React", "CSS", "MongoDB"],
    link: "https://github.com/andrewt1018/ReaderNation",
  }
];

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "John Deere",
    time: "Summer 2025",
    bullets: [
      "Explored and integrated CREOSON for browser-based Creo automation",
      "Enhanced internal MCAD tools through custom Java CREOSON extensions",
      "Built React app interfacing with CREOSON API for design workflow notes",
    ],
    tags: ["Java", "React", "MCAD"]
  },
  {
    role: "Data Engineering Intern",
    org: "John Deere",
    time: "Summer 2024",
    bullets: [
      "Designed Spark/Scala table schema + CI for data quality tracking",
      "Benchmarked RAPIDS GPU vs Photon CPU clusters",
    ],
    tags: ["Apache Spark", "Scala", "SQL"]
  },
  {
    role: "Research Lead",
    org: "I-GUIDE Datamine",
    time: "2024–2025",
    bullets: [
      "Led geospatial workflow research on flood inundation mapping",
      "Developed Sedona pipelines for raster polygonization and census joins",
      "Computed bivariate Moran’s I + LISA statistics with PySAL",
      "Mentored undergraduates and ensured reproducible workflow design"
    ],
    tags: ["Apache Sedona", "Python", "Google Cloud Platform"]
  },
  {
    role: "Software Developer",
    org: "Office of the Indiana State Chemist",
    time: "2023–2024",
    bullets: [
      "Developed OCR pipeline for automated Guaranteed Analysis extraction",
      "Adapted an image dewarping package for improved performance of OCR and NER on preprocessed images"
    ],
    tags: ["OCR", "NER", "Python"]
  },
  {
    role: "Data Analytics Intern",
    org: "Tokio Marine Highland",
    time: "Summer 2023",
    bullets: [
      "Improved flood eligibility and geocoding APIs with ML-based validation",
      "Developed Python elevation API querying PostgreSQL + AWS S3 datasets",
      "Optimized data retrieval speed and spatial accuracy for risk models",
    ],
    tags: ["Python", "PostgreSQL", "AWS S3", "Boosted Random Forests"]
  }
];

// Math + Code glyphs for animated background
const GLYPHS = ["∑", "π", "∫", "√", "∞", "λ", "Δ", "{}", "</>", "()", "::=", "|>"];

const Link = (props) => (
  <a {...props} className={(props.className ?? "") + " underline-offset-4 hover:underline"} />
);
const Chip = ({ children }) => (
  <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

// ---------------------------- Animated Symbols BG (Math + Code) ----------------------------
function SymbolsBG() {
  const COUNT = 40; // number of glyphs
  return (
    <>
      <style>{`
        .glyph {
          position: absolute;
          color: rgba(207,181,59,0.8); /* Purdue gold */
          text-shadow: 0 0 28px rgba(207,181,59,0.5);
          font-weight: 600;
          user-select: none;
          pointer-events: none;
          will-change: transform;
          opacity: .7; /* keep opacity constant to avoid fade-in look */
          animation-name: float-rot;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate; /* bounce back to avoid snapping */
          animation-duration: var(--dur);
          animation-delay: var(--negDelay); /* negative delay = start mid-cycle */
        }
        @keyframes float-rot {
          0%   { transform: translate3d(0,0,0) rotate(0deg); }
          100% { transform: translate3d(var(--tx), var(--ty), 0) rotate(360deg); }
        }
      `}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: COUNT }).map((_, i) => {
          const g = GLYPHS[i % GLYPHS.length];
          // Deterministic layout
          const left = (i * 97) % 95; // 0–95%
          const top = (i * 53) % 90;  // 0–90%
          // Motion + timing
          const dur = 18 + (i % 10); // seconds
          const tx = (i % 2 === 0 ? 1 : -1) * (180 + (i % 5) * 40); // px
          const ty = - (240 + (i % 7) * 30); // px (upward)
          const phase = (i * 0.7) % dur; // seconds within the cycle
          const size = 18 + (i % 6) * 4; // 18–38px
          return (
            <span
              key={i}
              className="glyph"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${size}px`,
                fontFamily: 'Cambria, "Cambria Math", "STIX Two Math", ui-monospace, Menlo, monospace',
                ['--tx']: `${tx}px`,
                ['--ty']: `${ty}px`,
                ['--dur']: `${dur}s`,
                ['--negDelay']: `-${phase}s`, // start mid-animation immediately
              }}
            >
              {g}
            </span>
          );
        })}
      </div>
    </>
  );
}
        

export default function Paper() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-gray-900">
      {/* Animated symbols background */}
      <SymbolsBG />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <header className="mb-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <div className="flex-[1.6] min-w-0 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-1 text-gray-600">{PROFILE.headline}</p>
            <section className="w-full mt-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-gray-700">{PROFILE.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>{PROFILE.location}</Chip>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
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

          <div className="flex w-full flex-col items-center justify-center sm:w-auto">
            {/* Profile picture */}
            <div className="mx-auto h-72 w-72 overflow-hidden rounded-full border border-gray-300 bg-white/90 shadow-md backdrop-blur-sm">
              <img
                src={PROFILE.imageUrl}
                alt="Profile of Andrew Tan"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Contact info */}
            <div className="mt-5 text-center text-sm text-gray-700 space-y-1">
              <div>
                <a
                  href={`mailto:${PROFILE.schoolEmail}`}
                  className="underline-offset-4 hover:underline"
                >
                  {PROFILE.schoolEmail}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${PROFILE.personalEmail}`}
                  className="underline-offset-4 hover:underline"
                >
                  {PROFILE.personalEmail}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="underline-offset-4 hover:underline"
                >
                  {PROFILE.phone}
                </a>
              </div>
            </div>
          </div>
        </header>

        <h2 className="mt-14 mb-4 text-2xl font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold hover:underline">{p.title}</h3>
                <span className="text-xl">↗</span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </a>
          ))}
        </div>

        <h2 className="mt-14 mb-4 text-2xl font-semibold">Experience</h2>
        <div className="space-y-4">
          {EXPERIENCE.map((e) => (
            <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm" key={e.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role} · {e.org}</h3>
                <span className="text-sm text-gray-600">{e.time}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-gray-200 bg-white/90 p-6 text-sm text-gray-700 backdrop-blur-sm">
          <h2 className="mb-3 text-lg font-semibold">Contact</h2>
          <ul className="space-y-2">
            <li className="flex flex-wrap items-center gap-2">
              <span className="min-w-24 text-gray-500">School</span>
              <Link href={`mailto:${PROFILE.schoolEmail}`}>{PROFILE.schoolEmail}</Link>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="min-w-24 text-gray-500">Personal</span>
              <Link href={`mailto:${PROFILE.personalEmail}`}>{PROFILE.personalEmail}</Link>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="min-w-24 text-gray-500">Phone</span>
              <a className="underline-offset-4 hover:underline" href={`tel:${PROFILE.phone}`}>{PROFILE.phone}</a>
            </li>
          </ul>
          <footer className="mt-6 text-center text-gray-500">© {new Date().getFullYear()} {PROFILE.name}</footer>
        </div>
      </main>
    </div>
  );
}
