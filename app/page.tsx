import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Articles } from "@/components/articles";
import { getProjects, getArticles } from "@/lib/pocketbase";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Project, Article } from "@/components/types";

export const revalidate = 60; // ISR setup for regenerating the page every 60 seconds

export default async function Home() {
  return (
    <>
      <LoadingScreen />
      <HomeContent />
    </>
  );
}

// Data fetching logic moved to this separate function
async function HomeContent() {
  try {
    const [projectRecords, articleRecords] = await Promise.all([
      getProjects(), // Fetch projects using PocketBase
      getArticles(), // Fetch articles using PocketBase
    ]);

    // Ensure proper type casting
    const projects = projectRecords.map((record) => record as unknown as Project);
    const articles = articleRecords.map((record) => record as unknown as Article);

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
  } catch (error) {
    console.error("Error fetching data for HomeContent:", error);
    return <div>Error loading content. Please try again later.</div>;
  }
}
