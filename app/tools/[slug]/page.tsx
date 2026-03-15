import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import ToolLayout from "@/components/ToolLayout";
import { ToolJsonLd } from "@/components/ToolJsonLd";

// 静态导出：预生成所有工具页
export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return {};

  const url = `${siteConfig.domain}/tools/${tool.slug}`;
  return {
    title: tool.name,
    description: tool.tagline,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} | ${siteConfig.name}`,
      description: tool.tagline,
      url,
      type: "website",
    },
  };
}

// AGENT: 在此 import 各工具的交互组件
// import JsonFormatterTool from "@/tools/json-formatter/JsonFormatterTool";
// import Base64Tool from "@/tools/base64/Base64Tool";

// AGENT: 在此映射 slug → 组件
const toolComponents: Record<string, React.ComponentType> = {
  // "json-formatter": JsonFormatterTool,
  // "base64": Base64Tool,
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[tool.slug];

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolLayout tool={tool}>
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          // 占位：agent 未实现组件时的提示
          <div className="text-center py-12 text-gray-400 text-sm">
            Tool component not implemented yet.
          </div>
        )}
      </ToolLayout>
    </>
  );
}
