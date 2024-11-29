import { useTranslation } from "@/app/i18n";
import { HeroSection } from "@/components/marketing/hero-section";
import { CategoryShowcase } from "@/components/marketing/category-showcase";
import { TrendingSection } from "@/components/marketing/trending-section";
import { getAllCategories } from "@/lib/services/category-service";
import { getTrendingTools } from "@/lib/services/tool-service";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { t } = await useTranslation(lang, "common");
  const [categories, tools] = await Promise.all([
    getAllCategories(),
    getTrendingTools()
  ]);

  return (
    <div className="animate-in fade-in duration-500">
      <HeroSection />
      <TrendingSection tools={tools} />
      <CategoryShowcase categories={categories} />
    </div>
  );
}