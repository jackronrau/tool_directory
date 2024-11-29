import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/services/tool-service";
import { Star, GitFork, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
            <p className="text-xl text-muted-foreground">{tool.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {tool.type === 'github' && tool.githubData && (
              <>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span className="font-medium">{tool.githubData.stars.toLocaleString()}</span>
                  <span className="text-muted-foreground">stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="h-5 w-5" />
                  <span className="font-medium">{tool.githubData.forks.toLocaleString()}</span>
                  <span className="text-muted-foreground">forks</span>
                </div>
                {tool.githubData.weeklyGrowth > 0 && (
                  <Badge variant="secondary" className="h-fit">
                    +{tool.githubData.weeklyGrowth.toFixed(1)}% this week
                  </Badge>
                )}
              </>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Quick guide to get started with {tool.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm">
                  {tool.name === "Next.js"
                    ? "npx create-next-app@latest"
                    : tool.name === "TailwindCSS"
                    ? "npm install -D tailwindcss"
                    : "npm install"}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tool.websiteUrl && (
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  asChild
                >
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website
                    </div>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tool.lastContentSync.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}