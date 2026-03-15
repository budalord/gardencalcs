import { type Tool } from "@/config/tools";
import { siteConfig } from "@/config/site";

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const toolUrl = `${siteConfig.domain}/tools/${tool.slug}`;

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const howTo = tool.howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.name}`,
    step: tool.howToSteps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  } : null;

  const faqPage = tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  } : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.domain}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
      {howTo && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />}
      {faqPage && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
