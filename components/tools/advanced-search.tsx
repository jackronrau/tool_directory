"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function AdvancedSearch() {
  const [starsRange, setStarsRange] = useState([0]);

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-left duration-500">
      <div className="space-y-4">
        <h3 className="font-semibold">Advanced Filters</h3>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="type" className="border rounded-lg">
            <AccordionTrigger className="px-4">Tool Type</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {[
                  { id: 'github', label: 'Open Source (GitHub)' },
                  { id: 'resource', label: 'Learning Resources' },
                  { id: 'website', label: 'Web Tools' },
                  { id: 'api', label: 'APIs & Services' }
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-3">
                    <Checkbox id={id} className="rounded-md" />
                    <Label htmlFor={id} className="text-sm">{label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="features" className="border rounded-lg">
            <AccordionTrigger className="px-4">Features</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {[
                  'Documentation Available',
                  'Active Community',
                  'Enterprise Support',
                  'Free Tier Available'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Checkbox id={feature} className="rounded-md" />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="popularity" className="border rounded-lg">
            <AccordionTrigger className="px-4">Popularity</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm">Minimum GitHub Stars</Label>
                  <Slider
                    value={starsRange}
                    onValueChange={setStarsRange}
                    max={50000}
                    step={1000}
                    className="mt-6"
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    {starsRange[0].toLocaleString()}+ stars
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="trending" className="rounded-md" />
                    <Label htmlFor="trending" className="text-sm">Trending this week</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="popular" className="rounded-md" />
                    <Label htmlFor="popular" className="text-sm">Popular (10k+ stars)</Label>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button className="w-full rounded-lg animate-in fade-in duration-300">Apply Filters</Button>
    </div>
  );
}