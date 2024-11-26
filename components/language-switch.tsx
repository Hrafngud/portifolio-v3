'use client';

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";

export function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline"
      className="min-w-[140px]"
    >
      {dictionary[language].languageSwitch}
    </Button>
  );
}