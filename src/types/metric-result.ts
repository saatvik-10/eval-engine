export interface MetricResult {
  name: string;
  score: number;
  passed: boolean;
  details?: Record<string, unknown>;
}
