"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  Layout, 
  Database, 
  Terminal, 
  Wrench,
  Bot,
  Globe,
  Shield
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface CategoryTabsProps {
  categories: Category[];
}

const iconMap = {
  "frameworks": Code2,
  "ui-design": Layout,
  "database": Database,
  "devops": Terminal,
  "ai-ml": Bot,
  "web": Globe,
  "security": Shield,
  "default": Wrench,
};

export function CategoryTabs({ categories }: CategoryTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="animate-in slide-in-from-top duration-500">
        <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full bg-background/60 backdrop-blur-sm px-4 py-2.5 hover:bg-muted/80 transition-colors shadow-sm"
          >
            <Wrench className="mr-2 h-4 w-4" />
            All Tools
          </TabsTrigger>
          
          {categories.map((category) => {
            const Icon = iconMap[category.slug as keyof typeof iconMap] || iconMap.default;
            return (
              <TabsTrigger
                key={category.id}
                value={category.slug}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full bg-background/60 backdrop-blur-sm px-4 py-2.5 hover:bg-muted/80 transition-colors shadow-sm"
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
}