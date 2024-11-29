import { db } from './index';
import { tools, categories, toolsToCategories, githubData, resources } from './schema';

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await db.delete(toolsToCategories);
    await db.delete(githubData);
    await db.delete(resources);
    await db.delete(tools);
    await db.delete(categories);

    // Insert categories
    const insertedCategories = await db.insert(categories).values([
      {
        id: 'cat_1',
        slug: 'web-development',
        name: 'Web Development',
        description: 'Tools and frameworks for building web applications',
        displayOrder: 1
      },
      {
        id: 'cat_2',
        slug: 'mobile-development',
        name: 'Mobile Development',
        description: 'Tools for building mobile applications',
        displayOrder: 2
      },
      {
        id: 'cat_3',
        slug: 'devops',
        name: 'DevOps',
        description: 'Tools for deployment, monitoring, and operations',
        displayOrder: 3
      },
      {
        id: 'cat_4',
        slug: 'design',
        name: 'Design',
        description: 'Tools for UI/UX design and prototyping',
        displayOrder: 4
      }
    ]).returning();

    // Insert tools
    const toolsData = [
      {
        id: 'tool_1',
        slug: 'nextjs',
        name: 'Next.js',
        description: 'The React Framework for Production. Build full-stack web applications with modern features and optimal performance.',
        websiteUrl: 'https://nextjs.org',
        logoUrl: '/images/tools/nextjs.svg',
        type: 'github',
        usage: 'free',
        contentStatus: 'published'
      },
      {
        id: 'tool_2',
        slug: 'typescript',
        name: 'TypeScript',
        description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
        websiteUrl: 'https://www.typescriptlang.org',
        logoUrl: '/images/tools/typescript.svg',
        type: 'github',
        usage: 'free',
        contentStatus: 'published'
      },
      {
        id: 'tool_3',
        slug: 'mdn-web-docs',
        name: 'MDN Web Docs',
        description: 'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs.',
        websiteUrl: 'https://developer.mozilla.org',
        logoUrl: '/images/tools/mdn.svg',
        type: 'resource',
        usage: 'free',
        contentStatus: 'published',
        monthlyTraffic: 150000
      }
    ];

    const insertedTools = await db.insert(tools).values(toolsData).returning();

    // Insert GitHub data
    await db.insert(githubData).values([
      {
        id: 'gh_1',
        toolId: 'tool_1',
        repoUrl: 'https://github.com/vercel/next.js',
        stars: 115000,
        forks: 24800,
        license: 'MIT',
        weeklyGrowth: 2.5
      },
      {
        id: 'gh_2',
        toolId: 'tool_2',
        repoUrl: 'https://github.com/microsoft/TypeScript',
        stars: 95000,
        forks: 12000,
        license: 'Apache-2.0',
        weeklyGrowth: 1.8
      }
    ]);

    // Insert resources
    await db.insert(resources).values([
      {
        id: 'res_1',
        slug: 'javascript-guide',
        toolId: 'tool_3',
        type: 'guide',
        title: 'JavaScript Guide',
        content: 'A comprehensive guide to JavaScript for both beginners and advanced developers',
        estimatedReadTime: 45,
        publishedAt: new Date('2024-03-01').getTime()
      },
      {
        id: 'res_2',
        slug: 'web-apis',
        toolId: 'tool_3',
        type: 'tutorial',
        title: 'Web APIs Introduction',
        content: 'Learn about the fundamental Web APIs used in modern web development',
        estimatedReadTime: 30,
        publishedAt: new Date('2024-03-15').getTime()
      }
    ]);

    // Link tools to categories
    const toolCategoryLinks = [
      { toolId: 'tool_1', categoryId: 'cat_1' },
      { toolId: 'tool_1', categoryId: 'cat_3' },
      { toolId: 'tool_2', categoryId: 'cat_1' },
      { toolId: 'tool_3', categoryId: 'cat_1' }
    ];

    await db.insert(toolsToCategories).values(toolCategoryLinks);

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed().catch((error) => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});