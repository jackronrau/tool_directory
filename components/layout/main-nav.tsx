"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

const items = [
  {
    key: "tools",
    href: "/tools",
  },
  {
    key: "collections",
    href: "/collections",
  },
  {
    key: "explore",
    href: "/explore",
  },
  {
    key: "resources",
    href: "/resources",
  },
  {
    key: "community",
    href: "/community",
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex gap-6">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold">DevTools Hub</span>
      </Link>
      <nav className="flex gap-6">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {t(`nav.${item.key}`)}
          </Link>
        ))}
        <Link
          href="/admin"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
            pathname.startsWith("/admin")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          <Shield className="h-4 w-4" />
          Admin
        </Link>
      </nav>
    </div>
  );
}