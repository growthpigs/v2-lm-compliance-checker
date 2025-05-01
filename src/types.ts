export interface ScanResult {
  url: string;
  status: 'processing' | 'completed' | 'failed';
  complianceScore?: number;
  issues?: ScanIssue[];
  jurisdiction?: string | null;
  summary?: {
    jurisdictionNote?: string | null;
    recommendations: string[];
  };
  screenshot?: string;
  timestamp: string;
  error?: string;
}

export interface ScanIssue {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  legalReference?: string;
  penalty?: string;
} 