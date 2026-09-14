import type { EvaluationResult } from '../types/evaluation-result';
import type { MetricResult } from '../types/metric-result';

export interface Metric<I, O> {
  evaluate(result: EvaluationResult<I, O>): MetricResult;
}
