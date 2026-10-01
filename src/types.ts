export const INFO_LENS_SYSTEM_VERSION = "2026.1.0";

export type SourceType = "news" | "article" | "message" | "research" | "url";
export type PriorityLevel = "critical" | "important" | "normal" | "low";
export type UserType = "Student" | "Professional" | "Researcher" | "Entrepreneur" | "Other";
export type ConsumptionStyle = "quick" | "balanced" | "deep";
export type DeliveryMode = "immediate" | "batched" | "chronological";

export interface InformationItem {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  title: string;
  content: string;
  url?: string;
  author?: string;
  publishedAt?: string;
  topics: string[];
  entities: string[];
  events: string[];
  embedding?: number[];
  clusterId?: string;
  importanceScore?: number;
  priority: PriorityLevel;
  summary?: string;
  metadata: Record<string, unknown>;
}

export interface UserProfile {
  name: string;
  userType: UserType;
  interests: Record<string, number>; // topic -> weight 0-100
  entities: Record<string, number>; // entity/person -> weight 0-100
  events: string[]; // tracked event names
  keywords: string[]; // tracked keywords
  deprioritizedTopics: string[]; // topics placed in digest / penalised
  sources: {
    news: boolean;
    articles: boolean;
    messages: boolean;
    research: boolean;
    savedUrls: boolean;
  };
  attention: {
    delivery: DeliveryMode;
    quietHours: {
      enabled: boolean;
      start: string; // "22:00"
      end: string;   // "07:00"
    };
    quietExceptions: {
      critical: boolean;
      important: boolean;
    };
  };
  consumptionStyle: ConsumptionStyle;
  feedbackHistory: Record<string, { useful: boolean; reason?: string; timestamp: string }>;
}

export interface ScoreFactor {
  label: string;
  category: "topic" | "entity" | "event" | "keyword" | "recency" | "corroboration" | "urgency" | "penalty" | "feedback";
  points: number;
  maxPoints: number;
  detail: string;
}

export interface ImportanceReasoning {
  score: number;
  breakdown: ScoreFactor[];
  bulletReasons: string[];
  bypassedQuietHours: boolean;
}

export interface Cluster {
  id: string;
  title: string;
  category: string;
  summary: string;
  quickSummary: string;
  deepSummary: string;
  keyPoints: string[];
  keyEntities: string[];
  events: string[];
  topics: string[];
  importanceScore: number;
  priority: PriorityLevel;
  items: InformationItem[];
  reasoning: ImportanceReasoning;
  sourceCount: number;
  sourcesBreakdown: { name: string; type: SourceType; count: number }[];
  isDigestItem?: boolean;
}

export interface PipelineStageMetric {
  id: string;
  stepNumber: number;
  name: string;
  status: "idle" | "running" | "completed";
  durationMs: number;
  inputCount: number;
  outputCount: number;
  description: string;
  keyInsight: string;
  inspectableData: {
    title: string;
    description: string;
    data: unknown;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "infolens";
  text: string;
  timestamp: string;
  sources?: {
    id: string;
    title: string;
    sourceName: string;
    sourceType: SourceType;
    url?: string;
  }[];
  clusterReferenceId?: string;
}
