import { CategoryShowcase } from "@/components/features/category-showcase";
import { TrendingSection } from "@/components/features/trending-section";
import { getAllCategories } from "@/lib/services/category-service";
import { getTrendingTools } from "@/lib/services/tool-service";

export default async function ExplorePage() {
  const [categories, trendingTools] = await Promise.all([
    getAllCategories(),
    getTrendingTools()
  ]);

  return (
    <div className="container py-8 space-y-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Explore Developer Tools</h1>
        <p className="text-muted-foreground text-lg">
          Discover trending tools and popular categories to enhance your development workflow.
        </p>
      </section>
      
      <TrendingSection tools={trendingTools} />
      <CategoryShowcase categories={categories} />
    </div>
  );
}