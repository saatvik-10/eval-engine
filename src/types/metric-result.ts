export interface MetricResult {
  name: string;
  score: number;
  details?: Record<string, unknown>;
}
