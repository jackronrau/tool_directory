"use client";

import { Menu, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  {
    title: "Tools",
    href: "/tools",
  },
  {
    title: "Collections",
    href: "/collections",
  },
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Community",
    href: "/community",
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Shield,
  },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="px-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">DevTools Hub</span>
          </Link>
          <nav className="mt-8 flex flex-col gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}