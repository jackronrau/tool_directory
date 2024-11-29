"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

const menuStructure = {
  tools: "Tools",
  categories: "Categories",
  sync: "Sync",
  settings: "Settings"
};

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [];
  
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Skip language segment
    if (index === 0 && path.length === 2) return;
    
    // Handle admin root
    if (path === 'admin') {
      breadcrumbs.push({
        label: 'Dashboard',
        href: currentPath,
        active: paths.length === (paths[0].length === 2 ? 2 : 1)
      });
      return;
    }

    // Handle known menu items
    if (menuStructure[path as keyof typeof menuStructure]) {
      breadcrumbs.push({
        label: menuStructure[path as keyof typeof menuStructure],
        href: currentPath,
        active: index === paths.length - 1
      });
      return;
    }

    // Handle dynamic segments (like IDs) or other paths
    if (path === 'new') {
      breadcrumbs.push({
        label: 'New',
        href: currentPath,
        active: true
      });
    } else if (path === 'edit') {
      breadcrumbs.push({
        label: 'Edit',
        href: currentPath,
        active: true
      });
    }
  });
  
  return breadcrumbs;
}

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/admin"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={breadcrumb.href}
            className={cn(
              "hover:text-foreground transition-colors",
              breadcrumb.active && "text-foreground font-medium"
            )}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}