import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Garden Tools Hub – Free Gardening Calculators",
  description: "Learn about Garden Tools Hub — a free collection of online gardening calculators built to help home gardeners make data-driven planting decisions.",
  alternates: { canonical: `${siteConfig.domain}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Garden Tools Hub</h1>

      <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
        <p>
          Garden Tools Hub is a free collection of online calculators designed to help home gardeners
          make better, data-driven decisions — from calculating fertilizer dosage to finding the right
          soil pH for their crops.
        </p>

        <p>
          The goal is simple: take the guesswork out of gardening. Whether you&apos;re a first-time
          grower or a seasoned backyard farmer, Garden Tools Hub provides the numbers you need without
          requiring an account, a subscription, or sitting through ads.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Our Data Sources</h2>
        <p>
          All calculation formulas and reference data are based on publicly available agricultural
          extension resources from leading university programs, including Penn State Extension,
          Clemson Cooperative Extension, Oregon State University Extension, and Cornell Cooperative
          Extension. Where multiple sources differ, Garden Tools Hub uses the most widely cited
          recommendation.
        </p>
        <p>
          We review and update our data periodically. If you spot an error or have a suggestion for
          improvement, please reach out via the <a href="/contact" className="text-green-700 hover:underline">Contact page</a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Free, Forever</h2>
        <p>
          Garden Tools Hub is and will remain free to use. All calculations run entirely in your
          browser — no data is sent to any server. There are no accounts, no tracking, and no
          paywalls.
        </p>

        <p>
          Developers and bloggers are welcome to embed any tool on their own sites using the embed
          widget available on each tool page.
        </p>
      </div>
    </div>
  );
}
