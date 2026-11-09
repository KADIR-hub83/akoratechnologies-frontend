import type { MetadataRoute } from "next";

const BASE_URL = "https://akoratechnologies.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/company/about`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/company/leadership`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/company/careers`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/company/case-studies`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/home-page/contact`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources/webinars`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}