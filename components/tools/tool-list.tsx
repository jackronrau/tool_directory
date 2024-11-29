"use client";

import { useState } from "react";
import { ToolCard } from "./tool-card";
import { Pagination } from "@/components/shared/pagination";

const ITEMS_PER_PAGE = 12;

interface ToolListProps {
  initialTools: Tool[];
  columns?: 2 | 3 | 4;
}

export function ToolList({ initialTools, columns = 3 }: ToolListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialTools.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTools = initialTools.slice(startIndex, endIndex);

  // Dynamic grid columns based on prop
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="space-y-8">
      <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
        {currentTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} href={`/tools/${tool.slug}`} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}