export interface ReportData {
  reportMetadata: ReportMetadata;
  aggregatedMetrics: AggregatedMetrics;
  agentPerformance: AgentPerformance;
  applicationUsage: ApplicationUsage;
  businessProcessAnalysis: BusinessProcessAnalysis;
  synthesis: Synthesis;
}

export interface ReportMetadata {
  reportId: string;
  generationDate: string;
  totalCallsAnalyzed: number;
}

export interface AggregatedMetrics {
  averageHandlingTime: {
    overallAverage: string;
    calls: Call[];
  };
  averageAfterCallWork: {
    overallAverage: string;
    calls: CallWork[];
  };
}

export interface Call {
  callId: string;
  agentId: string;
  agentName: string;
  issueHandleTime: string;
}

export interface CallWork {
  callId: string;
  agentId: string;
  agentName: string;
  afterCallWorkTime: string;
}

export interface AgentPerformance {
  mostProductiveAgents: ProductiveAgent[];
  agentLeaderboard: LeaderboardAgent[];
}

export interface ProductiveAgent {
  agentId: string;
  agentName: string;
  justification: string;
  metrics: {
    averageIssueHandleTime: string;
    averageAfterCallWorkTime: string;
    qualitativeRating: string;
  };
}

export interface LeaderboardAgent {
  agentId: string;
  agentName: string;
  totalCalls: number;
  averageIssueHandleTime: string;
  averageAfterCallWorkTime: string;
}

export interface ApplicationUsage {
  mostUsedApplications: Application[];
  applicationBreakdown: ApplicationBreakdown[];
}

export interface Application {
  applicationName: string;
  totalActiveTime: string;
  usageCount: number;
}

export interface ApplicationBreakdown {
  applicationName: string;
  totalActiveTime: string;
  usageByAgent: AgentUsage[];
}

export interface AgentUsage {
  agentId: string;
  agentName: string;
  activeTime: string;
}

export interface BusinessProcessAnalysis {
  recurringRoutines: RecurringRoutine[];
}

export interface RecurringRoutine {
  routineLabel: string;
  patternSummary: string;
  totalOccurrences: number;
  agents: RoutineAgent[];
  mostEfficientAgent: {
    agentId: string;
    agentName: string;
  };
}

export interface RoutineAgent {
  agentId: string;
  agentName: string;
  efficiency: string;
  handleTime: string;
  justification: string;
}

export interface Synthesis {
  commonAnomalies: Anomaly[];
  bestPractices: BestPractice[];
  idleTimeHotspots: IdleTimeHotspot[];
  strategicInsights: StrategicInsight[];
}

export interface Anomaly {
  anomaly: string;
  agentsAffected: string[];
  potentialImpact: string;
}

export interface BestPractice {
  practice: string;
  agentsExhibiting: string[];
  recommendation: string;
}

export interface IdleTimeHotspot {
  task: string;
  averageIdleTime: string;
  possibleCauses: string[];
}

export interface StrategicInsight {
  insightId: string;
  description: string;
}

