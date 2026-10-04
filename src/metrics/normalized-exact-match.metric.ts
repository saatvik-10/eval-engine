import type { EvaluationResult } from '../types/evaluation-result';
import type { MetricResult } from '../types/metric-result';
import type { Metric } from './base.metric';

function normalize(text: string): string {
  return text.toLowerCase().replace(/\*\*/g, '').trim();
}

export class NormalizedExactMatchMetric implements Metric<string, string> {
  evaluate(result: EvaluationResult<string, string>): MetricResult {
    const predicted = normalize(result.prediction);
    const expected = normalize(result.sample.expectedOutput);

    const score = predicted == expected ? 1 : 0;

    return {
      name: 'normalized_exact_match',
      score,
      passed: score === 1,
    };
  }
}
