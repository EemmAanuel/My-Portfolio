import { createFileRoute } from "@tanstack/react-router";
import { lazy, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MessageCircle, Github, Instagram } from "lucide-react";
import { ClientOnly } from "@/components/ClientOnly";
import { Reveal } from "@/components/Reveal";

const HeroScene = lazy(() => import("@/components/HeroScene"));

import clarasTreat from "@/assets/gallery/claras-treat.jpg";
import dashKaraoke1 from "@/assets/gallery/dash-karaoke-1.jpg";
import dashKaraoke2 from "@/assets/gallery/dash-karaoke-2.jpg";
import dashRave from "@/assets/gallery/dash-rave.jpg";
import fittedElegance from "@/assets/gallery/fitted-elegance.jpg";
import jopapride from "@/assets/gallery/jopapride.jpg";
import kaylifaz from "@/assets/gallery/kaylifaz.jpg";
import smartmouth from "@/assets/gallery/smartmouth.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seth Designs — Digital Experience Designer" },
      {
        name: "description",
        content:
          "Seth Designs — Digital Experience Designer. Interfaces, brand systems and interactive web experiences.",
      },
      { property: "og:title", content: "Seth Designs — Digital Experience Designer" },
      {
        property: "og:description",
        content:
          "Interfaces, brand systems and interactive web experiences. Selected work, process and contact.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://my-portfolio-gilt-ten-63.vercel.app/" },
      { property: "og:image", content: "https://raw.githubusercontent.com/EemmAanuel/My-Portfolio/main/src/assets/gallery/claras-treat.jpg?v=20260922" },
      { property: "og:image:alt", content: "Seth Designs portfolio work" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:secure_url", content: "https://raw.githubusercontent.com/EemmAanuel/My-Portfolio/main/src/assets/gallery/claras-treat.jpg?v=20260922" },
      { name: "twitter:title", content: "Seth Designs — Digital Experience Designer" },
      { name: "twitter:description", content: "Interfaces, brand systems and interactive web experiences." },
      { name: "twitter:image", content: "https://raw.githubusercontent.com/EemmAanuel/My-Portfolio/main/src/assets/gallery/claras-treat.jpg?v=20260922" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const capabilities = [
  { title: "Product & UI Design", body: "End-to-end interface systems, from flows to pixel-tight components." },
  { title: "Brand & Identity", body: "Marks, type systems and visual languages that hold up across every surface." },
  { title: "Motion & 3D", body: "Scroll-driven storytelling, real-time 3D and micro-interaction craft." },
  { title: "Design Systems", body: "Token-driven libraries that keep teams fast and consistent." },
];

const projects = [
  {
    name: "Biltop",
    year: "2026",
    role: "Product Design · Brand · Web",
    blurb:
      "A construction-tech platform rebuilt around clarity: a modular design system, a calmer dashboard, and a site that sells the product before a single demo call.",
    tags: ["UI System", "Web", "Brand"],
  },
  {
    name: "Graphic Series",
    year: "2024—2025",
    role: "Art Direction · Typography",
    blurb:
      "Client flyers and campaign visuals — nightlife events, fashion brands, food and corporate identities. Eight selected pieces below.",
    tags: ["Flyers", "Type", "Art Direction"],
  },
];

const gallery = [
  {
    id: 1,
    label: "Dash Kulture",
    src: dashKaraoke1,
    alt: "Dash Kulture Karaoke Night flyer",
    story:
      "Weekly open-mic night at Dash Kulture Restaurant & Lounge — bold typography, neon gradients and high-contrast grid design reflecting the pulse of nightlife and performance energy.",
  },
  {
    id: 2,
    label: "Dash Kulture",
    src: dashRave,
    alt: "ABK Rave Party flyer",
    story:
      "Every great party starts with a feeling. This design captures that moment of anticipation — the lights, the sound, and the promise of an unforgettable night.",
  },
  {
    id: 3,
    label: "Dash Kulture",
    src: dashKaraoke2,
    alt: "Dash Kulture Karaoke Night flyer v2",
    story:
      "Expressive textures, bold branding and a high-impact colour palette in a campaign that instantly communicates celebration, performance and nightlife culture.",
  },
  {
    id: 4,
    label: "Fitted Elegance",
    src: fittedElegance,
    alt: "Fitted Elegance fashion brand flyer",
    story:
      "Every outfit begins with an idea, and every stitch tells a story — elegant garments, modern aesthetics and clear communication for the brand.",
  },
  {
    id: 5,
    label: "Clara's Yummy Treat",
    src: clarasTreat,
    alt: "Clara's Yummy Treat bakery flyer",
    story:
      "Premium food imagery paired with clean typography and a thoughtfully organized layout — communicating quality, variety and professionalism.",
  },
  {
    id: 6,
    label: "Kay'Lifaz Stitches",
    src: kaylifaz,
    alt: "Kay'Lifaz Stitches fashion flyer",
    story:
      "Premium product imagery, bold typography and a warm palette with clear visual hierarchy for an engaging, conversion-focused fashion advertisement.",
  },
  {
    id: 7,
    label: "Smartmouth Hub",
    src: smartmouth,
    alt: "Smartmouth Hub services flyer",
    story:
      "Visibility is the foundation of growth — a design telling the story of a brand helping businesses expand their online presence with measurable success.",
  },
  {
    id: 8,
    label: "Jopapride",
    src: jopapride,
    alt: "Jopapride Nigeria birthday tribute flyer",
    story:
      "A corporate birthday tribute balancing elegance with brand identity — a refined neutral palette, layered photography and clean typography.",
  },
];

const experience = [
  {
    period: "2024 — Now",
    role: "Freelance Digital Experience Designer",
    place: "Seth Designs — independent, still taking clients",
  },
  {
    period: "2026",
    role: "Freelance Product Designer",
    place: "Biltop — freelance engagement",
  },
  {
    period: "2022 — 2023",
    role: "Freelance Visual / Brand Designer",
    place: "Independent client work",
  },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
    />
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <ClientOnly>
          <HeroScene />
        </ClientOnly>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 sm:px-6 md:px-12 md:pb-20"
      >
        <p className="mb-4 text-[0.625rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs sm:tracking-[0.35em] md:mb-6">
          Seth Designs — Portfolio 2026
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.5rem,12vw,8rem)] font-semibold leading-[0.95] tracking-tight sm:leading-[0.92]">
          Digital
          <span className="text-primary"> experience</span>
          <br />
          designer.
        </h1>
        <div className="mt-6 flex flex-col items-start gap-5 border-t border-border pt-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6 sm:pt-6">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            I design interfaces, brand systems and interactive web experiences — shaped by
            typography, motion and a stubborn attention to detail.
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Interfaces", "Brand systems", "Motion", "3D on the web", "Design systems"];
  return (
    <div className="overflow-hidden border-y border-border bg-secondary/40 py-4">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            {w} <span className="text-primary">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4 sm:gap-5 sm:pb-5 md:mb-12">
      <span className="shrink-0 text-[0.625rem] tracking-[0.3em] text-primary sm:text-xs">{index}</span>
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 sm:px-6 md:px-12 md:py-28">
      <SectionTitle index="01" title="About" />
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
        <Reveal>
          <p className="font-display text-xl leading-snug tracking-tight sm:text-2xl md:text-4xl">
            I help teams turn complicated products into experiences that feel obvious, quick and
            quietly premium.
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:mt-8 md:text-base">
            My work sits between product design and art direction — systems thinking on one side,
            typography and motion on the other. Lately I've been building interfaces that live in
            three dimensions: scroll-driven narratives, real-time 3D and interactions that reward
            curiosity.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="rounded-sm border border-border bg-card/60 p-5 transition-colors hover:border-primary/50">
                <h3 className="text-sm font-medium tracking-wide">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={i * 0.1}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative grid gap-4 border-b border-border py-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12 md:py-10"
      >
        <span className="text-[0.625rem] tracking-[0.3em] text-muted-foreground sm:text-xs">{p.year}</span>
        <div className="min-w-0">
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
            <span className={hover ? "text-primary transition-colors" : "transition-colors"}>
              {p.name}
            </span>
          </h3>
          <p className="mt-2 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">{p.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
            {p.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight className="hidden h-8 w-8 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary md:block" />
      </article>
    </Reveal>
  );
}

function BiltopPreview() {
  return (
    <Reveal>
      <div className="mt-10 md:mt-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
            Live preview — Biltop
          </p>
          <a
            href="https://biltop-landing.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-primary hover:opacity-70"
          >
            Open live site
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="overflow-hidden rounded-sm border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="ml-3 truncate text-xs text-muted-foreground">
              biltop-landing.vercel.app
            </span>
          </div>
          <iframe
            src="https://biltop-landing.vercel.app/"
            title="Biltop live website preview"
            loading="lazy"
            className="h-[300px] w-full border-0 bg-background sm:h-[420px] md:h-[620px]"
          />
        </div>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 sm:px-6 md:px-12 md:py-28">
      <SectionTitle index="02" title="Selected work" />
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} i={i} />
      ))}
      <BiltopPreview />
    </section>
  );
}

function Gallery() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.4, 0.85], ["2%", "-18%"]);

  const renderArtwork = (g: (typeof gallery)[number], mobile = false) => (
    <div
      key={g.id}
      className={
        mobile
          ? "group relative aspect-[3/4] min-w-0 overflow-hidden rounded-sm border border-border"
          : "group relative aspect-[3/4] w-[38vw] shrink-0 overflow-hidden rounded-sm border border-border lg:w-[22vw]"
      }
    >
      <img
        src={g.src}
        alt={g.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-100 transition-opacity duration-500 md:opacity-80 md:group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
          <span className="min-w-0 truncate font-display text-sm tracking-tight">{g.label}</span>
          <span className="shrink-0 text-xs text-muted-foreground">0{g.id}/08</span>
        </div>
        <p className="mt-2 max-h-32 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100">
          {g.story}
        </p>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="scroll-mt-16 overflow-hidden py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-12">
        <SectionTitle index="03" title="Graphic studies" />
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:px-6 md:hidden">
        {gallery.map((g) => renderArtwork(g, true))}
      </div>
      <motion.div style={{ x }} className="hidden gap-5 px-12 md:flex">
        {gallery.map((g) => renderArtwork(g))}
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:px-12 md:py-28">
      <SectionTitle index="04" title="Experience" />
      <div className="divide-y divide-border">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.08}>
            <div className="grid min-w-0 gap-2 py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,auto)] md:items-baseline">
              <span className="text-[0.625rem] tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.25em]">{e.period}</span>
              <h3 className="min-w-0 font-display text-lg leading-snug tracking-tight sm:text-xl md:text-2xl">{e.role}</h3>
              <span className="min-w-0 text-sm leading-relaxed text-muted-foreground sm:col-start-2 md:col-start-auto">{e.place}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="scroll-mt-16 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <Reveal>
          <p className="text-[0.625rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs sm:tracking-[0.35em]">05 — Contact</p>
          <h2 className="mt-5 max-w-full font-display text-[2rem] font-semibold leading-[1.02] tracking-tight sm:mt-6 sm:text-5xl md:text-[5.5rem] md:leading-[0.95]">
            Let's build something
            <span className="text-primary"> worth scrolling.</span>
          </h2>
          <a
            href="https://wa.me/2347013123287"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-grid max-w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-primary pb-1 text-base text-primary transition-opacity hover:opacity-70 sm:text-lg md:mt-10 md:text-2xl"
          >
            <MessageCircle className="h-5 w-5 shrink-0" /> <span>Message me on WhatsApp</span>
          </a>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 text-sm text-muted-foreground sm:mt-12 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            <a
              href="https://github.com/EemmAanuel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.instagram.com/lordseth20k"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="https://wa.me/2347013123287"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <p className="mt-12 text-xs text-muted-foreground sm:mt-16">
            © {new Date().getFullYear()} Seth Designs. Built with care.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-background px-5 py-3 transition-colors sm:px-6 md:px-12 ${
        solid ? "md:bg-background/80" : "md:border-transparent md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <a href="#" className="min-w-0 truncate font-display text-sm font-semibold tracking-[0.2em] uppercase">
        Seth<span className="text-primary">.</span>
      </a>
      <div className="flex shrink-0 gap-4 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground sm:gap-6 sm:text-xs sm:tracking-[0.2em]">
        <a href="#work" className="hover:text-foreground">Work</a>
        <a href="#about" className="hidden hover:text-foreground sm:inline">About</a>
        <a href="#contact" className="hover:text-foreground">Contact</a>
      </div>
    </nav>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Gallery />
      <Experience />
      <Contact />
    </main>
  );
}
