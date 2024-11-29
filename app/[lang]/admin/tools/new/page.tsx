"use client";

import { useEffect, useState } from "react";
import { ToolForm } from "@/components/admin/tools/tool-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/admin/shared/loading-state";
import type { Category } from "@/lib/services/category-service";

export default function NewToolPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/admin/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Tool</h1>
        <p className="text-muted-foreground mt-2">
          Add a new developer tool to the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}