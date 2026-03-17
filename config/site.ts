// AGENT: 每次建新站只需修改这个文件
export const siteConfig = {
  name: "Garden Tools Hub",               // AGENT: 站点名称（用于 logo、footer、品牌展示）
  title: "Garden Tools Hub – Free Calculators for Soil, Fertilizer & Composting", // AGENT: 首页 <title> 用长版
  domain: "https://gardencalcs.com",  // AGENT: 站点域名（无尾斜杠）
  description: "Free online gardening calculators. Calculate fertilizer NPK dosage, seed spacing, and more for your garden.", // AGENT: 站点描述
  locale: "en",
  twitterHandle: "",              // AGENT: 可选

  // 相关站点（矩阵内链）
  relatedSites: [] as { name: string; url: string; description: string }[],
};
