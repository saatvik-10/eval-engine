import type { EvaluationResult } from '../types/evaluation-result';
import type { MetricResult } from '../types/metric-result';
import type { Metric } from './base.metric';

export class ExactMatchMetric implements Metric<string, string> {
  evaluate(result: EvaluationResult<string, string>): MetricResult {
    const predicted = result.prediction;
    const expected = result.sample.expectedOutput;

    const score = predicted == expected ? 1 : 0;

    return {
      name: 'exact_match',
      score,
    };
  }
}
