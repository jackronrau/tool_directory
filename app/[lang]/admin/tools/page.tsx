"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/tools/data-table";
import { columns } from "@/components/admin/tools/columns";
import Link from "next/link";
import { LoadingState } from "@/components/admin/shared/loading-state";
import { EmptyState } from "@/components/admin/shared/empty-state";
import type { Tool } from "@/types";

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch("/api/admin/tools");
        if (!response.ok) throw new Error("Failed to fetch tools");
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!tools.length) {
    return (
      <EmptyState
        title="No tools found"
        description="Get started by creating your first tool."
        actionLabel="Add Tool"
        actionHref="/admin/tools/new"
      />
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your developer tools collection.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tools/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg">
        <DataTable columns={columns} data={tools} />
      </div>
    </div>
  );
}