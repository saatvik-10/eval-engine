import { describe, test, expect } from 'bun:test';
import { ExactMatchMetric } from '../metrics/exact-match.metric';
import type { EvaluationResult } from '../types/evaluation-result';

describe('ExactMatchMetric', () => {
  const metric = new ExactMatchMetric();

  test('passes when prediction equals expected output', () => {
    const result: EvaluationResult<string, string> = {
      sample: {
        input: 'What is the capital of France?',
        expectedOutput: 'Paris',
      },
      prediction: 'Paris',
      metricResults: [],
    };

    const metricResult = metric.evaluate(result);

    expect(metricResult.score).toBe(1);
    expect(metricResult.passed).toBe(true);
    expect(metricResult.name).toBe('exact_match');
  });

  test('fails when prediction differs from expected output', () => {
    const result: EvaluationResult<string, string> = {
      sample: {
        input: 'What is the capital of France?',
        expectedOutput: 'Paris',
      },
      prediction: 'London',
      metricResults: [],
    };

    const metricResult = metric.evaluate(result);

    expect(metricResult.score).toBe(0);
    expect(metricResult.passed).toBe(false);
    expect(metricResult.name).toBe('exact_match');
  });
});
