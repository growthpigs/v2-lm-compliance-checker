import React from "react";
import { Button } from "../../components/ui/button";

interface RequiredActionItemProps {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  onGetHelp?: () => void;
  className?: string;
}

export default function RequiredActionItem({
  title,
  description,
  severity,
  onGetHelp = () => {},
  className = "",
}: RequiredActionItemProps) {
  // Define styling based on severity
  const getSeverityConfig = () => {
    switch (severity) {
      case "high":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ),
          borderColor: "border-l-red-600 dark:border-l-red-500",
        };
      case "medium":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          ),
          borderColor: "border-l-amber-600 dark:border-l-amber-500",
        };
      case "low":
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ),
          borderColor: "border-l-blue-600 dark:border-l-blue-500",
        };
    }
  };

  const { icon, borderColor } = getSeverityConfig();

  return (
    <div
      className={`flex items-start p-4 border-l-4 bg-white dark:bg-gray-800 rounded-md shadow-sm ${borderColor} ${className}`}
    >
      <div className="mr-4">{icon}</div>
      <div className="flex-1">
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onGetHelp}
        className="whitespace-nowrap ml-4"
      >
        Get help
      </Button>
    </div>
  );
} 