import Link from "next/link";
import Image from "next/image";
import { Star, GitFork, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeaturedToolsProps {
  tools: {
    id: string;
    name: string;
    description: string;
    slug: string;
    logoUrl: string | null;
    stars: number | null;
    forks: number | null;
    weeklyGrowth: number | null;
  }[];
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  return (
    <section className="container py-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Tools</h2>
            <p className="text-muted-foreground">
              Popular and trending developer tools you should know about
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all tools
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  {tool.logoUrl && (
                    <div className="relative h-12 w-12">
                      <Image
                        src={tool.logoUrl}
                        alt={tool.name}
                        fill
                        className="rounded-lg object-contain"
                      />
                    </div>
                  )}
                  <CardTitle className="line-clamp-1">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-4">
                    {tool.stars && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4" />
                        {tool.stars.toLocaleString()}
                      </div>
                    )}
                    {tool.forks && (
                      <div className="flex items-center gap-1 text-sm">
                        <GitFork className="h-4 w-4" />
                        {tool.forks.toLocaleString()}
                      </div>
                    )}
                    {tool.weeklyGrowth && tool.weeklyGrowth > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {tool.weeklyGrowth.toFixed(1)}% weekly
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}