"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Library,
  Settings,
  RefreshCw,
  Tags,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  FileText,
  Folder,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
    submenu: [
      {
        title: "Tools",
        href: "/admin/content/tools",
        icon: Library,
      },
      {
        title: "Categories",
        href: "/admin/content/categories",
        icon: Tags,
      },
      {
        title: "Collections",
        href: "/admin/content/collections",
        icon: Folder,
      },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Sync",
    href: "/admin/sync",
    icon: RefreshCw,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function NavItem({ item, isCollapsed }: { item: SidebarItem; isCollapsed: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  if (item.submenu) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-1"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between",
              isActive && "bg-accent",
              isCollapsed && "justify-center"
            )}
          >
            <div className="flex items-center">
              <Icon className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>{item.title}</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.submenu.map((subitem) => (
            <Button
              key={subitem.href}
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start pl-8",
                pathname === subitem.href && "bg-accent",
                isCollapsed && "justify-center pl-2"
              )}
            >
              <Link href={subitem.href}>
                <subitem.icon className="h-4 w-4 mr-2" />
                {!isCollapsed && <span>{subitem.title}</span>}
              </Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start",
        isActive && "bg-accent",
        isCollapsed && "justify-center"
      )}
    >
      <Link href={item.href}>
        <Icon className="h-4 w-4 mr-2" />
        {!isCollapsed && <span>{item.title}</span>}
      </Link>
    </Button>
  );
}

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-3 py-2">
        {!isCollapsed && (
          <span className="font-semibold">DevTools Hub</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sidebarItems.map((item) => (
            <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}