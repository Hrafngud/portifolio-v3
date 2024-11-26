'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { Project } from "./types";

export function Projects({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  const t = dictionary[language].projects;

  if (!projects?.length) {
    return (
      <section id="projects" className="py-10">
        <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>
        <p className="text-center text-muted-foreground">{t.noProjects}</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ExpandableCard
            key={project.id}
            fullContent={
              <div className="p-6 space-y-4">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video relative">
                    <Image
                      src={`http://127.0.0.1:8090/api/files/${project.collectionId}/${project.id}/${project.image}`}
                      alt={language === 'pt' ? project.title_pt : project.title_en}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-semibold mt-6">
                    {language === 'pt' ? project.title_pt : project.title_en}
                  </h3>
                  <p className="text-muted-foreground mt-4">
                    {language === 'pt' ? project.description_pt : project.description_en}
                  </p>
                </div>
              </div>
            }
          >
            <div className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={`http://127.0.0.1:8090/api/files/${project.collectionId}/${project.id}/${project.image}`}
                  alt={language === 'pt' ? project.title_pt : project.title_en}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'pt' ? project.title_pt : project.title_en}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {language === 'pt' ? project.description_pt : project.description_en}
                </p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </motion.div>
    </section>
  );
}