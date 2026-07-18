import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { resolveTool } from "@/config/phase1Overrides";
import ToolLayout from "@/components/ToolLayout";
import { ToolJsonLd } from "@/components/ToolJsonLd";

// 静态导出：预生成所有工具页
export function generateStaticParams() {
  return tools
    .filter((t) => !['fertilizer-calculator', 'compost-calculator'].includes(t.slug))
    .map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const baseTool = tools.find((t) => t.slug === params.slug);
  if (!baseTool) return {};
  const tool = resolveTool(baseTool);

  const url = `${siteConfig.domain}/tools/${tool.slug}`;
  const htmlTitle = tool.htmlTitle ?? tool.metaTitle;
  return {
    title: htmlTitle ? { absolute: htmlTitle } : tool.name,
    description: tool.metaDescription ?? tool.tagline,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.metaTitle ?? `${tool.name} | ${siteConfig.name}`,
      description: tool.metaDescription ?? tool.tagline,
      url,
      type: "website",
    },
  };
}

// AGENT: 在此 import 各工具的交互组件
// import JsonFormatterTool from "@/tools/json-formatter/JsonFormatterTool";
// import Base64Tool from "@/tools/base64/Base64Tool";
import FertilizerCalculator from "@/components/FertilizerCalculator";
import SeedSpacingCalculator from "@/components/SeedSpacingCalculator";
import SoilPHCalculator from "@/components/SoilPHCalculator";
import WateringScheduleCalculator from "@/components/WateringScheduleCalculator";
import CompostCalculator from "@/components/CompostCalculator";

// AGENT: 在此映射 slug → 组件
const toolComponents: Record<string, React.ComponentType> = {
  // "json-formatter": JsonFormatterTool,
  // "base64": Base64Tool,
  "fertilizer-calculator": FertilizerCalculator,
  "seed-spacing-calculator": SeedSpacingCalculator,
  "soil-ph-calculator": SoilPHCalculator,
  "watering-schedule-calculator": WateringScheduleCalculator,
  "compost-calculator": CompostCalculator,
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const baseTool = tools.find((t) => t.slug === params.slug);
  if (!baseTool) notFound();

  const tool = resolveTool(baseTool);
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
