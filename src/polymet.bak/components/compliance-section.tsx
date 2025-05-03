import React from "react";

interface ComplianceItem {
  id: string;
  title: string;
  status: "present" | "missing" | "specified" | "warning";
  info?: string;
}

interface ComplianceSectionProps {
  title: string;
  score: number;
  items: ComplianceItem[];
  className?: string;
}

// Simple implementation of ComplianceItemStatus
function ComplianceItemStatus({ status }: { status: string }) {
  if (status === "missing") {
    return <span className="text-xs font-medium text-red-600 dark:text-red-400">Missing</span>;
  } else if (status === "warning") {
    return <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Warning</span>;
  } else {
    return <span className="text-xs font-medium text-green-600 dark:text-green-400">Present</span>;
  }
}

// Simple implementation of ComplianceItemInfoButton
function ComplianceItemInfoButton({ info, className = "" }: { info: string; className?: string }) {
  return (
    <div className={`relative ${className}`} title={info}>
      <button
        className="w-4 h-4 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-200"
        aria-label="More information"
      >
        i
      </button>
    </div>
  );
}

export default function ComplianceSection({
  title,
  score,
  items,
  className = "",
}: ComplianceSectionProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1 rounded-md text-sm font-medium">
          Score: {score}
        </div>
      </div>
      <div className="p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex items-center">
              <div
                className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                  item.status === "missing"
                    ? "bg-red-100 dark:bg-red-900/30"
                    : item.status === "warning"
                      ? "bg-amber-100 dark:bg-amber-900/30"
                      : "bg-green-100 dark:bg-green-900/30"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.status === "missing"
                      ? "bg-red-600 dark:bg-red-400"
                      : item.status === "warning"
                        ? "bg-amber-600 dark:bg-amber-400"
                        : "bg-green-600 dark:bg-green-400"
                  }`}
                ></div>
              </div>
              <span className="text-sm font-medium flex items-center">
                {item.title}
                {item.info && (
                  <ComplianceItemInfoButton info={item.info} className="ml-2" />
                )}
              </span>
            </div>
            <ComplianceItemStatus status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
} 