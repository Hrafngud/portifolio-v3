'use client';

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";

export function Navbar() {
  const { language } = useLanguage();
  const t = dictionary[language].navigation;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        
        <nav className="flex-1 ml-8">
          <ul className="flex gap-8">
            <li>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.projects}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('articles')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t.articles}
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Admin
          </Link>
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}