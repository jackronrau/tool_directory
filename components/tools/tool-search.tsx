"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolSearchProps {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  onCategoryChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

export function ToolSearch({ 
  categories,
  onCategoryChange,
  onSearchChange,
  onSortChange 
}: ToolSearchProps) {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          className="pl-9"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue="popular" onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="recent">Recently Added</SelectItem>
          <SelectItem value="updated">Recently Updated</SelectItem>
          <SelectItem value="views">Most Viewed</SelectItem>
          <SelectItem value="likes">Most Liked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}