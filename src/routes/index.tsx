import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seth - Digital Experience Designer" },
      {
        name: "description",
        content:
          "Seth - Digital Experience Designer. Selected product, brand, campaign, and interactive web work.",
      },
      { property: "og:title", content: "Seth - Digital Experience Designer" },
      {
        property: "og:description",
        content: "Selected product, brand, campaign, and interactive web work by Seth.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://my-portfolio-gilt-ten-63.vercel.app/" },
      {
        property: "og:image",
        content: "https://my-portfolio-gilt-ten-63.vercel.app/og-image.svg?v=20261002",
      },
      { property: "og:image:alt", content: "Seth - Digital Experience Designer" },
      { name: "twitter:title", content: "Seth - Digital Experience Designer" },
      {
        name: "twitter:description",
        content: "Selected product, brand, campaign, and interactive web work by Seth.",
      },
      {
        name: "twitter:image",
        content: "https://my-portfolio-gilt-ten-63.vercel.app/og-image.svg?v=20261002",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
