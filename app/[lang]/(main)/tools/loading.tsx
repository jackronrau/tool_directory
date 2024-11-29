"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-6 w-[500px]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          {/* Mobile Filter Button */}
          <div className="flex lg:hidden">
            <Skeleton className="ml-auto h-10 w-[100px]" />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-[120px] rounded-full flex-shrink-0" />
            ))}
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[300px] flex-shrink-0">
              <div className="space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Search Bar */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-[180px]" />
              </div>

              {/* Tool Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}