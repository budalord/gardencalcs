// AGENT: 每次建新站只需修改这个文件
export const siteConfig = {
  name: "ToolSite",               // AGENT: 站点名称
  domain: "https://example.com",  // AGENT: 站点域名（无尾斜杠）
  description: "Free online tools for everyone.", // AGENT: 站点描述
  locale: "en",
  twitterHandle: "",              // AGENT: 可选

  // 相关站点（矩阵内链）
  relatedSites: [] as { name: string; url: string; description: string }[],
};
