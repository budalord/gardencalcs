import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Garden Tools Hub",
  description: "Garden Tools Hub privacy policy — we do not collect personal information, use tracking cookies, or send your data to any server.",
  alternates: { canonical: `${siteConfig.domain}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">No Personal Data Collected</h2>
          <p>
            Garden Tools Hub does not require an account or login. We do not collect, store, or
            process any personally identifiable information (PII) such as your name, email address,
            or location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">No Tracking Cookies</h2>
          <p>
            This site does not use cookies to track your browsing behavior. If analytics are added
            in the future, this policy will be updated before any tracking begins.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Client-Side Calculations</h2>
          <p>
            All calculator inputs and results are processed entirely within your browser. No form
            data, calculation inputs, or results are transmitted to Garden Tools Hub servers or any
            third party.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Embedded Tools</h2>
          <p>
            Garden Tools Hub tools may be embedded on third-party websites via an iframe widget.
            When a tool is embedded, Garden Tools Hub does not track the embedding site, the
            referring URL, or the end user&apos;s identity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">External Links</h2>
          <p>
            This site may contain links to external websites (e.g., university extension resources).
            Garden Tools Hub is not responsible for the privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy, please visit our{" "}
            <a href="/contact" className="text-green-700 hover:underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
