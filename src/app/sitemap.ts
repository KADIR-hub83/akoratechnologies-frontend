import type { MetadataRoute } from "next";

const BASE_URL = "https://akoratechnologies.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: "/",
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/home-page/contact",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },

    // Apne baaki existing public routes yahan add karein:
    { path: "/company/leadership", priority: 0.7, changeFrequency: "monthly" as const },
    // { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    // { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}