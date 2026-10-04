import type { EvaluationResult } from '../types/evaluation-result';
import type { MetricResult } from '../types/metric-result';
import type { Metric } from './base.metric';

export class ContainsMetric implements Metric<string, string> {
  evaluate(result: EvaluationResult<string, string>): MetricResult {
    const predicted = result.prediction.toLowerCase();
    const expected = result.sample.expectedOutput.toLowerCase();

    const score = predicted.includes(expected) ? 1 : 0;

    return {
      name: 'contains',
      score,
    };
  }
}
