import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seth — Digital Experience Designer & Developer in Lagos, Nigeria" },
      {
        name: "description",
        content:
          "Graphic designer, website developer, and software developer in Lagos, Nigeria creating digital experiences that help ideas become visible, accessible, and useful.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Seth — Digital Experience Designer & Developer in Lagos, Nigeria" },
      {
        property: "og:description",
        content:
          "Graphic designer, website developer, and software developer in Lagos, Nigeria creating digital experiences that help ideas become visible, accessible, and useful.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://my-portfolio-gilt-ten-63.vercel.app/" },
      {
        property: "og:image",
        content: "https://my-portfolio-gilt-ten-63.vercel.app/og-image.svg?v=20261002",
      },
      { property: "og:image:alt", content: "Seth — Digital Experience Designer & Developer in Lagos, Nigeria" },
      { name: "twitter:title", content: "Seth — Digital Experience Designer & Developer in Lagos, Nigeria" },
      {
        name: "twitter:description",
        content:
          "Graphic designer, website developer, and software developer in Lagos, Nigeria creating digital experiences that help ideas become visible, accessible, and useful.",
      },
      {
        name: "twitter:image",
        content: "https://my-portfolio-gilt-ten-63.vercel.app/og-image.svg?v=20261002",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://my-portfolio-gilt-ten-63.vercel.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#0b0816]">
      <iframe
        src="/portfolio-film.html"
        title="Seth - Digital Experience Designer"
        className="block h-full w-full border-0"
        allow="accelerometer"
      />
    </main>
  );
}
