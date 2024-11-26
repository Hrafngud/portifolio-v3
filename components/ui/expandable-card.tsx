import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardProps {
  children: React.ReactNode;
  fullContent: React.ReactNode;
  className?: string;
}

export function ExpandableCard({ children, fullContent, className }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        "relative",
        isExpanded && "fixed inset-4 z-50 overflow-y-auto bg-background/95 backdrop-blur",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <Card 
          className={cn(
            "h-full transition-colors",
            !isExpanded && "hover:bg-accent/10 cursor-pointer",
            isExpanded && "mx-auto max-w-4xl"
          )}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent/10 bg-background/80 backdrop-blur z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-8"
            >
              {fullContent}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </Card>
      </AnimatePresence>
    </motion.div>
  );
} 