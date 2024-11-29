"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryDataTable } from "@/components/admin/categories/data-table";
import { columns } from "@/components/admin/categories/columns";
import Link from "next/link";
import { LoadingState } from "@/components/admin/shared/loading-state";
import { EmptyState } from "@/components/admin/shared/empty-state";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!categories.length) {
    return (
      <EmptyState
        title="No categories found"
        description="Get started by creating your first category."
        actionLabel="Add Category"
        actionHref="/admin/content/categories/new"
      />
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your tool categories.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/content/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg">
        <CategoryDataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}