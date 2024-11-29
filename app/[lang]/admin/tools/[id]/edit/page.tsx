"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolEditForm } from "@/components/admin/tools/tool-edit-form";
import { LoadingState } from "@/components/admin/shared/loading-state";
import type { Tool } from "@/types";
import type { Category } from "@/lib/services/category-service";

interface EditToolPageProps {
  params: {
    id: string;
  };
}

export default function EditToolPage({ params }: EditToolPageProps) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [toolResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/admin/tools/${params.id}`),
          fetch('/api/admin/categories')
        ]);

        if (!toolResponse.ok) {
          if (toolResponse.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch tool");
        }

        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const [toolData, categoriesData] = await Promise.all([
          toolResponse.json(),
          categoriesResponse.json()
        ]);

        setTool(toolData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!tool) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tool</h1>
        <p className="text-muted-foreground mt-2">
          Update tool information and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolEditForm tool={tool} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}