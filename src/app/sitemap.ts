import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/services",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/contact",
      lastModified: new Date(),
    },
  ];
}