"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="container space-y-8 py-12 md:py-24">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.title.start")}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {t("hero.title.highlight")}
          </span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {t("hero.description")}
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/tools">
              {t("hero.cta.browse")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/collections">{t("hero.cta.collections")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}