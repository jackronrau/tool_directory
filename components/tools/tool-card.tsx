"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, GitFork, Scale, ArrowUpRight, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ToolCardProps {
  tool: Tool;
  href: string;
}

const typeConfig = {
  github: {
    color: "border-t-yellow-500",
    bg: "bg-gradient-to-b from-yellow-50 to-transparent dark:from-yellow-950/20",
  },
  resource: {
    color: "border-t-blue-500",
    bg: "bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20",
  },
} as const;

const usageBadgeConfig = {
  free: "bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200/50",
  paid: "bg-purple-50/80 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200/50",
  freemium: "bg-amber-50/80 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200/50",
} as const;

function UsageBadge({ usage }: { usage: ToolUsage }) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "absolute -top-1 -right-2 px-1.5 py-0.25 text-[10px] font-medium border backdrop-blur-sm",
        "shadow-[0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
        usageBadgeConfig[usage]
      )}
    >
      {usage === 'freemium' ? 'Free & Paid' : usage.charAt(0).toUpperCase() + usage.slice(1)}
    </Badge>
  );
}

const defaultImage = "/images/tools/default.svg";

export function ToolCard({ tool, href }: ToolCardProps) {
  const config = typeConfig[tool.type];
  const imageUrl = tool.logoUrl || tool.ogImage;
  const hasMultipleCategories = tool.categories.length > 2;

  return (
    <Link href={href} className="block group">
      <Card className={cn(
        "relative h-full overflow-hidden border-t-[3px] transition-all hover:shadow-lg",
        config.color
      )}>
        {/* Top gradient */}
        <div className={cn(
          "absolute inset-x-0 top-0 h-24",
          config.bg
        )} />
        
        <CardContent className="relative p-5">
          <div className="flex flex-col gap-4">
            {/* Header with Image and Badge */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className={cn(
                  "relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden",
                  "bg-gradient-to-br from-muted/30 to-muted/10",
                  "ring-1 ring-black/5 dark:ring-white/5",
                  "before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-black/5 before:dark:ring-white/5"
                )}>
                  <Image
                    src={imageUrl || defaultImage}
                    alt={tool.name}
                    fill
                    className="object-contain p-2.5 transition-transform group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                </div>
                <UsageBadge usage={tool.usage} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg truncate">{tool.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>

            {/* Categories */}
            {tool.categories && tool.categories.length > 0 && (
              <div className="relative group/scroll">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-2 py-1">
                    {tool.categories.map((category, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-muted/50 text-muted-foreground hover:bg-muted flex-shrink-0"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <ScrollBar 
                    orientation="horizontal" 
                    className="invisible group-hover/scroll:visible" 
                  />
                </ScrollArea>
                {hasMultipleCategories && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-full bg-gradient-to-l from-background to-transparent pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
                  </div>
                )}
              </div>
            )}

            {/* Type-specific content */}
            <div className="space-y-3">
              {tool.type === 'github' && tool.githubData && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{tool.githubData.stars.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <GitFork className="h-4 w-4" />
                    <span>{tool.githubData.forks.toLocaleString()}</span>
                  </div>
                  {tool.githubData.license && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Scale className="h-4 w-4" />
                      <span>{tool.githubData.license}</span>
                    </div>
                  )}
                  {tool.githubData.weeklyGrowth > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      +{tool.githubData.weeklyGrowth.toFixed(1)}% weekly
                    </Badge>
                  )}
                </div>
              )}

              {tool.type === 'resource' && tool.resources && (
                <>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2">
                      {tool.resources.map((resource, index) => (
                        <Badge key={index} variant="outline" className="flex-shrink-0 bg-background">
                          {resource.type}
                        </Badge>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                  </ScrollArea>
                  {tool.monthlyTraffic > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {tool.monthlyTraffic.toLocaleString()} monthly visits
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}