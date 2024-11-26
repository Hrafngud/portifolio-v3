'use client';

import { 
  FaNodeJs,
  FaDatabase
} from "react-icons/fa";
import { 
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb 
} from "react-icons/si";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { Code2, Smartphone, Cpu, Brain } from 'lucide-react';

export function TechStack() {
  const { language } = useLanguage();
  const t = dictionary[language].techStack;

  const technologies = [
    { 
      name: "Node.js", 
      icon: FaNodeJs,
      color: "text-[#339933]" // Node.js green
    },
    { 
      name: "Next.js", 
      icon: SiNextdotjs,
      color: "text-black dark:text-white" // Next.js adapts to theme
    },
    { 
      name: "Tailwind CSS", 
      icon: SiTailwindcss,
      color: "text-[#06B6D4]" // Tailwind blue
    },
    { 
      name: "MongoDB", 
      icon: SiMongodb,
      color: "text-[#47A248]" // MongoDB green
    },
  ];

  const services = [
    { 
      name: t.services.webDev,
      icon: Code2,
      color: 'text-blue-500'
    },
    { 
      name: t.services.mobileDev,
      icon: Smartphone,
      color: 'text-green-500'
    },
    { 
      name: t.services.automation,
      icon: Cpu,
      color: 'text-purple-500'
    },
    { 
      name: t.services.ai,
      icon: Brain,
      color: 'text-orange-500'
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-center mb-8">{t.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technologies Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{t.technologies}</h3>
          <div className="grid grid-cols-2 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent/10 transition-colors"
                role="listitem"
              >
                <tech.icon className={`w-8 h-8 mb-3 ${tech.color}`} />
                <span className="font-medium text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{t.services.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent/10 transition-colors"
                role="listitem"
              >
                <service.icon className={`w-8 h-8 mb-3 ${service.color}`} />
                <span className="font-medium text-sm text-center">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


