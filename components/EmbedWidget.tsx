"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function EmbedWidget({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const embedUrl = `${siteConfig.domain}/tools/${slug}`;
  const code = `<iframe src="${embedUrl}" width="100%" height="500" frameborder="0" title="${slug}"></iframe>`;

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <p className="text-sm font-medium text-gray-700 mb-2">Embed this tool on your site</p>
      <div className="flex gap-2">
        <code className="flex-1 text-xs bg-white border border-gray-200 rounded px-3 py-2 text-gray-600 overflow-x-auto whitespace-nowrap">
          {code}
        </code>
        <button onClick={copy}
          className="px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </section>
  );
}
