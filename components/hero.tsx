"use client";

import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { TechStack } from "@/components/tech-stack";

export function Hero() {
  const { language } = useLanguage();
  const t = dictionary[language].hero;

  return (
    <section className="min-h-[50vh] flex flex-col justify-start items-center text-center px-4 space-y-10">
      <div className="max-w-3xl space-y-4 relative">
        <div className="absolute inset-0 -m-4 backdrop-blur-sm bg-background/50 rounded-xl -z-[1]" />
        
        <h1 className="text-5xl md:text-6xl font-heading font-bold">{t.greeting} João Davi</h1>
        <p className="text-xl text-primary font-sans">
          {t.description.map((segment, index) => (
            segment.highlight ? (
              <strong key={index}>{segment.text}</strong>
            ) : (
              <span key={index}>{segment.text}</span>
            )
          ))}
        </p>
      </div>
      <TechStack />
    </section>
  );
}