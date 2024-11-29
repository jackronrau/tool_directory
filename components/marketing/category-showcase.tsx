import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryShowcaseProps {
  categories: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
  }[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="container py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold">Browse Categories</h2>
          <p className="text-muted-foreground">
            Explore tools by category to find exactly what you need
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/tools?category=${category.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}