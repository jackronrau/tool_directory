"use client";

import { useState, useEffect } from "react";
import { mockTools, mockCategories } from "@/lib/data";
import { ToolList } from "@/components/tools/tool-list";
import { ToolSearch } from "@/components/tools/tool-search";
import { CategoryTabs } from "@/components/tools/category-tabs";
import { AdvancedSearch } from "@/components/tools/advanced-search";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Tool } from "@/types";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [filteredTools, setFilteredTools] = useState<Tool[]>(mockTools);

  useEffect(() => {
    let filtered = [...mockTools];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(tool => 
        tool.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return ((b.githubData?.weeklyGrowth || 0) - (a.githubData?.weeklyGrowth || 0));
        case "recent":
          return new Date(b.lastContentSync).getTime() - new Date(a.lastContentSync).getTime();
        case "views":
          return ((b.monthlyTraffic || 0) - (a.monthlyTraffic || 0));
        default:
          return ((b.githubData?.stars || 0) - (a.githubData?.stars || 0));
      }
    });

    setFilteredTools(filtered);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
            <p className="text-muted-foreground text-lg">
              Browse our curated collection of development tools and resources.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          {/* Mobile Filter Button */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <AdvancedSearch />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Category Tabs - Scrollable on Mobile */}
          <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="scrollbar-none overflow-x-auto">
              <div className="min-w-full">
                <CategoryTabs categories={mockCategories} />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[300px] flex-shrink-0">
              <div className="sticky top-8">
                <AdvancedSearch />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-6">
              <ToolSearch 
                categories={mockCategories}
                onCategoryChange={setSelectedCategory}
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
              />
              <ToolList 
                initialTools={filteredTools} 
                columns={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}