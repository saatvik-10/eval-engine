import type { EvaluationSample } from './evaluation-sample';
import type { MetricResult } from './metric-result';

export interface EvaluationResult<I, O> {
  sample: EvaluationSample<I, O>;
  prediction: O;
  metricResult: MetricResult[];
  metadata?: Record<string, unknown>;
}
