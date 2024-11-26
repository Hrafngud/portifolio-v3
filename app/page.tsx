import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Articles } from "@/components/articles";
import { getProjects, getArticles } from "@/lib/pocketbase";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Project, Article } from "@/components/types";

export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <LoadingScreen />
      <HomeContent />
    </>
  );
}

// Move the data fetching to a separate component
async function HomeContent() {
  const [projectRecords, articleRecords] = await Promise.all([
    getProjects(),
    getArticles()
  ]);

  const projects = projectRecords.map(record => record as unknown as Project);
  const articles = articleRecords.map(record => record as unknown as Article);

  return (
    <div className="space-y-2 pt-6">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects projects={projects} />
      </Suspense>
      <Suspense fallback={<div>Loading articles...</div>}>
        <Articles articles={articles} />
      </Suspense>
    </div>
  );
}