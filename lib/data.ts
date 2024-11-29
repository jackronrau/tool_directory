import { Tool } from '@/types';

export const mockTools: Tool[] = [
  {
    id: "1",
    type: "github",
    slug: "nextjs",
    name: "Next.js",
    description: "The React Framework for Production. Build full-stack web applications with modern features and optimal performance.",
    websiteUrl: "https://nextjs.org",
    logoUrl: "/images/tools/nextjs.svg",
    ogImage: "/images/tools/nextjs-og.png",
    metaTitle: "Next.js - The React Framework for Production",
    metaDescription: "Build full-stack React applications with Next.js. Features server-side rendering, static site generation, and more.",
    canonicalUrl: "https://nextjs.org",
    contentStatus: "published",
    lastContentSync: new Date("2024-03-20"),
    isActive: true,
    usage: "free",
    categories: ["Web Development", "Frontend", "React", "Full Stack"],
    githubData: {
      repoUrl: "https://github.com/vercel/next.js",
      stars: 115000,
      forks: 24800,
      weeklyGrowth: 2.5,
      license: "MIT",
      lastUpdated: new Date("2024-03-20")
    }
  },
  {
    id: "2",
    type: "github",
    slug: "typescript",
    name: "TypeScript",
    description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
    websiteUrl: "https://www.typescriptlang.org",
    logoUrl: "/images/tools/typescript.svg",
    metaTitle: "TypeScript - JavaScript with syntax for types",
    metaDescription: "TypeScript extends JavaScript by adding types to the language",
    ogImage: "/images/tools/typescript-og.png",
    canonicalUrl: "https://www.typescriptlang.org",
    contentStatus: "published",
    lastContentSync: new Date("2024-03-19"),
    isActive: true,
    usage: "free",
    categories: ["Programming Languages", "JavaScript", "Static Typing"],
    githubData: {
      repoUrl: "https://github.com/microsoft/TypeScript",
      stars: 95000,
      forks: 12000,
      weeklyGrowth: 1.8,
      license: "Apache-2.0",
      lastUpdated: new Date("2024-03-19")
    }
  },
  {
    id: "3",
    type: "resource",
    slug: "mdn-web-docs",
    name: "MDN Web Docs",
    description: "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs.",
    websiteUrl: "https://developer.mozilla.org",
    logoUrl: "/images/tools/mdn.svg",
    metaTitle: "MDN Web Docs - Resources for Developers, by Developers",
    metaDescription: "The MDN Web Docs site provides information about Open Web technologies",
    ogImage: "/images/tools/mdn-og.png",
    canonicalUrl: "https://developer.mozilla.org",
    monthlyTraffic: 150000,
    contentStatus: "published",
    lastContentSync: new Date("2024-03-18"),
    isActive: true,
    usage: "free",
    categories: ["Documentation", "Web Development", "Learning Resources"],
    resources: [
      {
        id: "res_1",
        slug: "javascript-guide",
        type: "guide",
        title: "JavaScript Guide",
        content: "A comprehensive guide to JavaScript for both beginners and advanced developers",
        estimatedReadTime: 45,
        publishedAt: new Date("2024-03-01")
      },
      {
        id: "res_2",
        slug: "web-apis",
        type: "tutorial",
        title: "Web APIs Introduction",
        content: "Learn about the fundamental Web APIs used in modern web development",
        estimatedReadTime: 30,
        publishedAt: new Date("2024-03-15")
      }
    ]
  }
];

export const mockCategories = [
  {
    id: "cat_1",
    slug: "web-development",
    name: "Web Development",
    description: "Tools and resources for web development",
  },
  {
    id: "cat_2",
    slug: "mobile-development",
    name: "Mobile Development",
    description: "Tools for building mobile applications",
  },
  {
    id: "cat_3",
    slug: "devops",
    name: "DevOps",
    description: "Tools for deployment, monitoring, and operations",
  }
];