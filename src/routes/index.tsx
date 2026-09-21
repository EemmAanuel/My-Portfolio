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
          "Portfolio of Seth, a digital experience designer crafting interfaces, brand systems and interactive 3D web experiences.",
      },
      { property: "og:title", content: "Seth Designs — Digital Experience Designer" },
      {
        property: "og:description",
        content:
          "Interfaces, brand systems and interactive 3D web experiences. Selected work, process and contact.",
      },
      { property: "og:type", content: "website" },
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
    year: "2025",
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
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Seth Designs — Portfolio 2026
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.92] tracking-tight">
          Digital
          <span className="text-primary"> experience</span>
          <br />
          designer.
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
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
    <div className="mb-12 flex items-baseline gap-5 border-b border-border pb-5">
      <span className="text-xs tracking-[0.3em] text-primary">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionTitle index="01" title="About" />
      <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="font-display text-2xl leading-snug tracking-tight md:text-4xl">
            I help teams turn complicated products into experiences that feel obvious, quick and
            quietly premium.
          </p>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
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
        className="group relative grid gap-6 border-b border-border py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12"
      >
        <span className="text-xs tracking-[0.3em] text-muted-foreground">{p.year}</span>
        <div>
          <h3 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            <span className={hover ? "text-primary transition-colors" : "transition-colors"}>
              {p.name}
            </span>
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.role}</p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
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
      <div className="mt-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
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
            className="h-[420px] w-full border-0 bg-background md:h-[620px]"
          />
        </div>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-12">
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
  return (
    <section id="gallery" className="py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionTitle index="03" title="Graphic studies" />
      </div>
      <motion.div style={{ x }} className="flex gap-5 px-6 md:px-12">
        {gallery.map((g) => (
          <div
            key={g.id}
            className="group relative aspect-[3/4] w-[62vw] shrink-0 overflow-hidden rounded-sm border border-border sm:w-[38vw] lg:w-[22vw]"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm tracking-tight">{g.label}</span>
                <span className="text-xs text-muted-foreground">0{g.id}/08</span>
              </div>
              <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                {g.story}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionTitle index="04" title="Experience" />
      <div className="divide-y divide-border">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.08}>
            <div className="grid gap-2 py-6 md:grid-cols-[180px_1fr_auto] md:items-baseline">
              <span className="text-xs tracking-[0.25em] text-primary">{e.period}</span>
              <h3 className="font-display text-xl tracking-tight md:text-2xl">{e.role}</h3>
              <span className="text-sm text-muted-foreground">{e.place}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">05 — Contact</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
            Let's build something
            <span className="text-primary"> worth scrolling.</span>
          </h2>
          <a
            href="https://wa.me/2347013123287"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 border-b border-primary pb-1 text-lg text-primary transition-opacity hover:opacity-70 md:text-2xl"
          >
            <MessageCircle className="h-5 w-5" /> Message me on WhatsApp
          </a>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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
          <p className="mt-16 text-xs text-muted-foreground">
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
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 transition-colors md:px-12 ${
        solid ? "bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <a href="#" className="font-display text-sm font-semibold tracking-[0.2em] uppercase">
        Seth<span className="text-primary">.</span>
      </a>
      <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
