import React from "react";
import { Button } from "../../components/ui/button";

interface GetFreeInstructionsSectionProps {
  onFixProblems?: () => void;
  className?: string;
}

export default function GetFreeInstructionsSection({
  onFixProblems = () => {},
  className = "",
}: GetFreeInstructionsSectionProps) {
  return (
    <div
      className={`bg-green-50 dark:bg-green-900/20 rounded-lg p-5 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-2">Get Free Instructions</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Get clear, step-by-step guidance on how to fix your compliance issues
        instantly. No strings attached - access all solutions immediately
        without registration.
      </p>
      <Button
        onClick={onFixProblems}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Fix These Problems 
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Button>
    </div>
  );
} 