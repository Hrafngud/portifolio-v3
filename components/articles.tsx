'use client';

import { format } from "date-fns";
import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { ptBR } from 'date-fns/locale';
import { Article } from "@/components/types";

export function Articles({ articles }: { articles: Article[] }) {
  const { language } = useLanguage();
  const t = dictionary[language].articles;

  if (!articles?.length) {
    return (
      <section id="articles" className="py-10">
        <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>
        <p className="text-center text-muted-foreground">{t.noArticles}</p>
      </section>
    );
  }

  return (
    <section id="articles" className="py-10">
      <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <ExpandableCard
            key={article.id}
            fullContent={
              <div className="p-6 space-y-4">
                <time className="text-sm text-muted-foreground">
                  {format(
                    new Date(article.created),
                    "MMMM d, yyyy",
                    { locale: language === 'pt' ? ptBR : undefined }
                  )}
                </time>
                <h3 className="text-2xl font-semibold">
                  {language === 'pt' ? article.title_pt : article.title_en}
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  {language === 'pt' ? article.content_pt : article.content_en}
                </div>
              </div>
            }
          >
            <div className="p-6">
              <time className="text-sm text-muted-foreground">
                {format(
                  new Date(article.created),
                  "MMMM d, yyyy",
                  { locale: language === 'pt' ? ptBR : undefined }
                )}
              </time>
              <h3 className="text-xl font-semibold mt-2 mb-4">
                {language === 'pt' ? article.title_pt : article.title_en}
              </h3>
              <p className="text-muted-foreground line-clamp-3">
                {language === 'pt' ? article.content_pt : article.content_en}
              </p>
            </div>
          </ExpandableCard>
        ))}
      </motion.div>
    </section>
  );
}
