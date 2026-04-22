"use client";
import { useState } from "react";
import type { ToolFAQ } from "@/config/tools";

interface FAQSectionProps {
  faqs: ToolFAQ[];
}

/**
 * Editorial Almanac FAQ accordion.
 * Dashed-top-border rows, serif Q, serif-normal A with tabular/mono links.
 */
export default function FAQSection({ faqs }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-5 mb-6">
        <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] max-w-[80px]" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">
          Frequently asked
        </p>
      </div>
      <div className="divide-y divide-[color-mix(in_oklch,var(--soil)_25%,transparent)] border-t border-b border-[color-mix(in_oklch,var(--soil)_25%,transparent)]">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <h3>
                <button
                  className="w-full text-left py-4 flex justify-between items-center gap-4 hover:text-moss-deep transition-colors duration-fast"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-[17px] leading-[1.4] text-ink">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`font-mono text-[20px] text-soil flex-shrink-0 transition-transform duration-fast ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div
                  className="pb-5 pr-10 font-serif text-[15px] leading-[1.7] text-ink [&_a]:text-moss-deep [&_a]:underline [&_a]:underline-offset-2"
                  dangerouslySetInnerHTML={{ __html: faq.displayHtml ?? faq.a }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
