import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | Garden Tools Hub",
  description: "Get in touch with Garden Tools Hub — questions, suggestions, or partnership inquiries welcome.",
  alternates: { canonical: `${siteConfig.domain}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question, spotted an error in our data, or interested in a partnership? We&apos;d love
        to hear from you.
      </p>

      <div className="space-y-5">
        <div className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <span className="text-2xl">✉️</span>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Email</p>
            <a href="mailto:contact@gardencalcs.com"
              className="text-green-700 hover:underline text-sm">
              contact@gardencalcs.com
            </a>
            <p className="text-xs text-gray-400 mt-1">We typically respond within 2–3 business days.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <span className="text-2xl">💻</span>
          <div>
            <p className="font-semibold text-gray-900 mb-1">GitHub</p>
            <a href="https://github.com/budalord/gardencalcs"
              target="_blank" rel="noopener noreferrer"
              className="text-green-700 hover:underline text-sm">
              github.com/budalord/gardencalcs
            </a>
            <p className="text-xs text-gray-400 mt-1">Found a bug? Open an issue or submit a pull request.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
