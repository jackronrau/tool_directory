import { ToolCard } from "./tool-card";

const PLACEHOLDER_TOOLS = [
  {
    id: "1",
    name: "Next.js",
    description: "The React Framework for Production",
    category: "Framework",
    stars: 12000,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "TailwindCSS",
    description: "A utility-first CSS framework",
    category: "CSS",
    stars: 8000,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "TypeScript",
    description: "JavaScript with syntax for types",
    category: "Language",
    stars: 10000,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2800&auto=format&fit=crop",
  },
];

export function ToolGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PLACEHOLDER_TOOLS.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}