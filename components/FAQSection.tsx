"use client";
import { useState } from "react";

interface FAQSectionProps {
  faqs: { q: string; a: string }[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <span className="text-gray-400 ml-2">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="px-4 py-3 text-sm text-gray-600 bg-gray-50 border-t border-gray-200">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
