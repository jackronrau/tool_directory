"use client";

import { AdminHeader } from "@/components/admin/layout/header";
import { AdminSidebar } from "@/components/admin/layout/sidebar";
import { AdminBreadcrumbs } from "@/components/admin/layout/breadcrumbs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <AdminHeader />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container max-w-7xl mx-auto py-4">
              <AdminBreadcrumbs />
            </div>
          </div>
          <div className="container max-w-7xl mx-auto">
            <div className="rounded-lg bg-background">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}