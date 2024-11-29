import Link from "next/link";
import { TrendingUp, Star, GitFork } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrendingSectionProps {
  tools: {
    id: string;
    name: string;
    description: string;
    slug: string;
    stars: number | null;
    forks: number | null;
    weeklyGrowth: number | null;
  }[];
}

export function TrendingSection({ tools }: TrendingSectionProps) {
  // Sort tools by weekly growth
  const trendingTools = [...tools]
    .filter((tool) => tool.weeklyGrowth !== null)
    .sort((a, b) => (b.weeklyGrowth || 0) - (a.weeklyGrowth || 0))
    .slice(0, 3);

  return (
    <section className="container py-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Trending This Week</h2>
            <p className="text-muted-foreground">
              Tools gaining the most traction this week
            </p>
          </div>
          <Link
            href="/tools?sort=trending"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all trending
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trendingTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1">{tool.name}</CardTitle>
                    {tool.weeklyGrowth && (
                      <Badge variant="secondary">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {tool.weeklyGrowth.toFixed(1)}%
                      </Badge>
                    )}
                  </div>
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