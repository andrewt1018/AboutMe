import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (MEASUREMENT_ID) {
  ReactGA.initialize(MEASUREMENT_ID);
}

const track = (name, params = {}) => {
  if (!MEASUREMENT_ID) return;
  // GA4-friendly: send a named event with parameters
  ReactGA.gtag("event", name, params);
};

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
      {" "}and PhD candidate{" "} 
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
  public: {
    resumeUrl: "resume.pdf",
    imageUrl: "profile.jpg",
    mlCertUrl: "ml_cert.pdf",
    awsCertUrl: "aws_cert.pdf"
  },
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
      "Research project seeking to merge lightweight translation models using SoTA merging techniques.",
    tags: ["NLP", "PyTorch", "Model Merging"],
    link: "https://github.com/andrewt1018/TranslationMerge",
    visibility: "Public"
  },
  {
    title: "OuiTravel",
    description:
      "Travel planning + documentation web app with community, journaling, and gamification features.",
    tags: ["React", "CSS", "MongoDB"],
    link: "https://github.com/andrewt1018/OuiTravel",
    visibility: "Public"
  },
  {
    title: "Word Search Solver (Java)",
    description:
      "Hobby project. Generator + solver pipeline, heuristics + pruning for speed.",
    tags: ["Java", "Algorithms"],
    link: "https://github.com/andrewt1018/WordSearchSolver",
    visibility: "Public"
  },
  {
    title: "ReaderNation",
    description:
      "User-friendly book reading app that supports in-app translations and free-lance publishing.",
    tags: ["React", "CSS", "MongoDB"],
    link: "https://github.com/andrewt1018/ReaderNation",
    visibility: "Private"
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
    tags: ["Apache Sedona", "Distributed Systems", "Google Cloud Platform"]
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

const SKILLS = [
  {
    title: "Certifications",
    items: [(
      <>
        <a
          href={PROFILE.public.awsCertUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-800 transition-colors"
          onClick={() =>
            track("aws_cert_view", {
              file_name: PROFILE.public.awsCertUrl,
              method: "header_button",
            })
          }
        >
          AWS - Solutions Architect Associate
        </a>
      </>
    ), (
      <>
        <a href={PROFILE.public.mlCertUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-800 transition-colors"
          onClick={() =>
            track("ml_cert_view", {
              file_name: PROFILE.public.mlCertUrl,
              method: "header_button",
            })
          }>
          Coursera - Machine Learning
        </a>
      </>
    )]
  },
  {
    title: "Languages",
    items: ["Python", "Scala", "Java", "C/C++", "MySQL/PostgreSQL", "JavaScript/TypeScript", "x86-64 ASM", "Bash"],
  },
  {
    title: "Data & ML",
    items: ["PyTorch", "Scikit-learn", "Apache Spark", "Apache Sedona", "WandB", "Pandas"],
  },
  {
    title: "Web",
    items: ["React", "Vite", "Tailwind", "Node.js", "REST/HTTP", "JSON", "CREOSON"],
  },
  {
    title: "Cloud & Tools",
    items: ["AWS", "Databricks", "GCP", "Docker", "GitHub Actions", "SBT"],
  }
];

const PERSONAL = {
  blurb: (
    <>
      Thanks for checking out my page! I'm a CS + Math student at Purdue who loves doing ML research and building clean web apps. In my spare time, I'm likely playing volleyball, pingpong, or doing the daily NY Times puzzles.
    </>
  ),
  hobbies: [
    {
      title: "Volleyball",
      emoji: "🏐",
      blurb: (
        <>
          Played for 9+ years now. Varsity captain in highschool, and part of the Purdue men's Volleyball Club. <br /><br />
          <b>Position</b>: Outside Hitter<br />
          <b>Favorite player</b >: Yuji Nishida <br />
          <b>Favorite team</b>: Team Japan<br />
        </>
      ),
    },
    {
      title: "Ping Pong",
      emoji: "🏓",
      blurb: (
        <>
          Played for around 2 years now. Definitely still have a lot of room to improve especially with reading and counteracting heavy spin.
          <br /><br />
          <b>Grip</b>: Penhold<br />
          <b>Favorite player</b >: Xu Xin 
        </>
      ),
    },
    {
      title: "Reading",
      emoji: "📚",
      blurb: (
        <>
          Fantasy {">"} Sci-Fi {">"}{">"} other genres. Maybe reading <i>Harry Potter</i> growing up made me biased toward fantasy. 
          <br /><br />
          <b>Favorite Genre</b>: Fantasy<br />
          <b>Favorite Author</b>: Rebecca F. Kuang<br />
          <b>Favorite Series</b>: The Poppy Wars Trilogy<br />
          <b>Favorite Book</b>: <i>Project Hail Mary</i>
        </>
      ),
    },
    {
      title: "Puzzles",
      emoji: "🧩",
      blurb: (
        <>
          Puzzles are fun! And they keep my mind active. I do the NY times wordle, pips, and sudoku every day. I also like competing with my friends in the LinkedIn mini puzzles. 
          <br /><br />
          <b>Wordle Streak</b>: {Math.floor((new Date() - new Date("2025-06-09")) / (1000 * 60 * 60 * 24))} <br />
          <b>Favorite puzzle game</b>: Sudoku (NYT hard mode)<br />

        </>
      ),
    },
  ],
};

// Math + Code glyphs for animated background
const GLYPHS = ["∑", "π", "∫", "√", "∞", "λ", "Δ", "{}", "</>", "()", ":=", "∀", "∃", "θ", "ψ"];

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
  const COUNT = 40;

  // Compute once; stable across re-renders (tab changes)
  const cfgs = useMemo(() => {
    // simple seeded RNG (LCG): stable “random”
    let s = 0x9e3779b9; // any constant seed
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };

    return Array.from({ length: COUNT }).map((_, i) => {
      const left = rand() * 95;             // %
      const top = rand() * 90;              // %
      const size = 18 + Math.floor(rand() * 6) * 4; // 18–38 px
      const tx = (i % 2 === 0 ? 1 : -1) * (180 + (i % 5) * 40); // px
      const ty = -(240 + (i % 7) * 30);     // px upward
      const dur = 18 + (i % 10);            // s
      const phase = (i * 0.7) % dur;        // s (negative delay start)
      const glyph = GLYPHS[i % GLYPHS.length];
      return { left, top, size, tx, ty, dur, phase, glyph };
    });
  }, []);

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
          opacity: .7;
          animation-name: float-rot;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-duration: var(--dur);
          animation-delay: var(--negDelay);
        }
        @keyframes float-rot {
          0%   { transform: translate3d(0,0,0) rotate(0deg); }
          100% { transform: translate3d(var(--tx), var(--ty), 0) rotate(360deg); }
        }
      `}</style>

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {cfgs.map((c, i) => (
          <span
            key={i}
            className="glyph"
            style={{
              left: `${c.left}vw`,
              top: `${c.top}vh`,
              fontSize: `${c.size}px`,
              fontFamily:
                'Cambria, "Cambria Math", "STIX Two Math", ui-monospace, Menlo, monospace',
              ["--tx"]: `${c.tx}px`,
              ["--ty"]: `${c.ty}px`,
              ["--dur"]: `${c.dur}s`,
              ["--negDelay"]: `-${c.phase}s`,
            }}
          >
            {c.glyph}
          </span>
        ))}
      </div>
    </>
  );
}

// ---------------------------- Projects Section ----------------------------
function ProjectsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PROJECTS.map((p) => {
        const isPrivate = p.visibility?.toLowerCase?.() === "private";
        const CardBase = ({ children }) => (
          <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
            {children}
          </div>
        );


        if (isPrivate) {
          return (
            <CardBase key={p.title}>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-gray-700">
                  <span aria-hidden>🔒</span> Private
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <span className="">Repository is private.</span>
                {PROFILE.personalEmail ? (
                  <a
                    href={`mailto:${PROFILE.personalEmail}?subject=${encodeURIComponent("Access request: " + p.title)}&body=${encodeURIComponent("Hi Andrew, I'd like to request access to this repository: " + p.title + ". Thanks!")}`}
                    className="rounded-lg border px-3 py-1 font-medium text-gray-700 hover:shadow"
                  >
                    Request access
                  </a>
                ) : null}
              </div>
            </CardBase>
          );
        }


        // Public project → normal link card
        return (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md"
            onClick={() =>
              track("project_open", {
                title: p.title,
                visibility: p.visibility ?? "public",
              })
            }
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
        );
      })}
    </div>
  )
}

// ---------------------------- Projects Section ----------------------------
function ExperiencesSection() {
 return (
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
         {e.tags?.length ? (
           <div className="mt-3 flex flex-wrap gap-2">
             {e.tags.map((t) => (
               <Chip key={t}>{t}</Chip>
             ))}
           </div>
         ) : null}
       </div>
     ))}
   </div>
 )
}

// ---------------------------- Skills Section ----------------------------
function SkillsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SKILLS.map((cat) => (
        <div
          key={cat.title}
          className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm"
        >
          <h3 className="text-base font-semibold">{cat.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {cat.title === "Certifications" ? (
              <div className="flex flex-col space-y-2">
                {cat.items.map((t, i) => (
                  <div key={i}>{t}</div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {cat.items.map((t, i) => (
                  <Chip key={i}>{t}</Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------- Personal Section ----------------------------
function PersonalSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-base font-semibold">About Me</h3>
        <p className="mt-2 text-gray-700 leading-relaxed">{PERSONAL.blurb}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PERSONAL.hobbies.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>{h.emoji}</span>
              <h4 className="text-lg font-semibold">{h.title}</h4>
            </div>
            <p className="mt-2 text-sm text-gray-700">{h.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------- Misc. Section ----------------------------
function MiscSection() {
 return (
   <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 text-gray-600 backdrop-blur-sm">
     More coming soon!
   </div>
 )
}
   
export default function Paper() {
  useEffect(() => {
    if (MEASUREMENT_ID) {
      // Send initial pageview when site loads
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  const [tab, setTab] = useState("Experiences");
  const tabs = ["Experiences", "Projects", "Skills", "Personal", "Misc."];

  const barRef = useRef(null);
  const scrollRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });

  const LEFT_OFFSET = -5; // adjust -1 to -6 depending on your eye preference

  function measureIndicator() {
    const i = tabs.indexOf(tab);
    const el = tabRefs.current[i];
    const bar = barRef.current;
    if (!el || !bar) return;

    const elRect = el.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();

    const x = elRect.left - barRect.left + LEFT_OFFSET;
    const w = elRect.width;

    setIndicator({ x, w });
  }

  // run AFTER layout when `tab` changes (and on mount)
  useLayoutEffect(() => {
    // measure on the next frame in case fonts/style transitions apply
    const id = requestAnimationFrame(measureIndicator);
    const onResize = () => requestAnimationFrame(measureIndicator);
    const onScroll = () => requestAnimationFrame(measureIndicator);

    window.addEventListener("resize", onResize);
    scrollRef.current?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [tab]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-gray-900">
      {/* Animated symbols background */}
      <SymbolsBG />
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <header className="mb-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-1 text-gray-600">{PROFILE.headline}</p>
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-gray-700">{PROFILE.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>{PROFILE.location}</Chip>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <a
                  href={PROFILE.public.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 px-4 py-2 font-medium hover:shadow"
                  onClick={() =>
                    track("resume_download", {
                      file_name: PROFILE.public.resumeUrl,
                      method: "header_button",
                    })
                  }
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
                src={PROFILE.public.imageUrl}
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
        {/* Tabs */}
        <h2 className="sr-only">Sections</h2>
        <div className="mt-12">
          <style>{`
            .no-scrollbar::-webkit-scrollbar{display:none}
            .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
            @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
            .animate-fade-in{animation:fadeIn .25s ease-out}
          `}</style>


          {/* Sticky tab bar (mobile-friendly, scrollable) */}
          <div className="sticky top-0 z-20 -mx-6 bg-[#f8fafc]/80 pt-2 backdrop-blur supports-backdrop-filter:bg-[#f8fafc]/60 sm:mx-0">
            <div className="relative">
              <div ref={scrollRef} className="no-scrollbar overflow-x-auto">
                <div className="px-6 sm:px-0">
                  <div ref={barRef} className="relative inline-flex min-w-max gap-1 rounded-xl border border-gray-200 bg-white/90 p-1 shadow-sm backdrop-blur-sm">
                    {/* Animated indicator */}
                    <span
                      className="pointer-events-none absolute bottom-0 h-0.5 rounded bg-amber-500 transition-transform duration-300"
                      style={{
                        width: `${indicator.w}px`,
                        transform: `translateX(${indicator.x}px)`,
                      }}
                    />
                    {tabs.map((name, i) => (
                      <button
                        key={name}
                        ref={(el) => (tabRefs.current[i] = el)}
                        className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-[15px] transition ${tab === name ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-900"
                          }`}
                        aria-pressed={tab === name}
                        onClick={() => {
                          setTab(name);
                          // if GA is present, log tab change
                          try { ReactGA?.gtag?.("event", "tab_change", { tab: name }); } catch { }
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* gradient edges to hint scrollability */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-[#f8fafc] to-transparent sm:hidden" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-[#f8fafc] to-transparent sm:hidden" />
            </div>
          </div>


          <div className="mt-6 animate-fade-in">
            {tab === "Experiences" && <ExperiencesSection />}
            
            {tab === "Projects" && <ProjectsSection />}

            {tab === "Skills" && <SkillsSection />}

            {tab === "Personal" && <PersonalSection />}

            {tab === "Misc." && <MiscSection />}
          </div>
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