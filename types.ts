
export interface AuditResult {
  score: number;
  readability: string;
  tone: string;
  keywordsFound: string[];
  suggestions: {
    priority: 'High' | 'Medium' | 'Low';
    title: string;
    description: string;
  }[];
}

export interface KeywordRecommendation {
  keyword: string;
  volume: string;
  difficulty: number;
  intent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';
  trend: 'Up' | 'Down' | 'Stable';
}

export interface OffPageStrategy {
  backlinkIdeas: string[];
  guestPostOpportunities: {
    siteType: string;
    authority: string;
    pitchAngle: string;
  }[];
  socialSignals: string[];
}

export interface TechnicalSEOAudit {
  status: 'Critical' | 'Warning' | 'Good';
  area: string;
  issue: string;
  solution: string;
}

export interface BlogPost {
  title: string;
  content: string;
  metaDescription: string;
  slug: string;
  headings: string[];
}

export interface CompetitorComparison {
  metric: string;
  you: string | number;
  competitor: string | number;
  advantage: 'You' | 'Competitor' | 'Neutral';
  recommendation: string;
}

export enum AppRoute {
  HOME = 'home',
  // Service Pages (Educational/Sales)
  SERVICE_ONPAGE = 'service_onpage',
  SERVICE_OFFPAGE = 'service_offpage',
  SERVICE_TECHNICAL = 'service_technical',
  SERVICE_AI = 'service_ai',
  // Corporate Pages
  ABOUT = 'about',
  TEAM = 'team',
  BLOG = 'blog',
  CONTACT = 'contact',
  FREE_AUDIT_PAGE = 'free_audit_page',
  PRICING = 'pricing',
  CASE_STUDIES = 'case_studies',
  ADMIN = 'admin',
  // AI Tools (Interactive)
  // AI Tools (Interactive)
  TOOL_AUDIT = 'tool_audit',
  TOOL_KEYWORDS = 'tool_keywords',
  TOOL_WRITER = 'tool_writer',
  TOOL_COMPETITOR = 'tool_competitor',
  TOOL_ASSISTANT = 'tool_assistant'
}
