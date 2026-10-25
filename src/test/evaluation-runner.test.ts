import { describe, test, expect } from 'bun:test';
import { EvaluationRunner } from '../runner/evaluation.runner';
import { ExactMatchMetric } from '../metrics/exact-match.metric';
import { SimpleQATask } from '../tasks/simple-qa.task';
import { FakeModelProvider } from '../providers/fake.provider';

describe('EvaluationRunner', () => {
  const task = new SimpleQATask();
  const metric = new ExactMatchMetric();
  const provider = new FakeModelProvider({
    'What is the capital of France?': 'Paris',
    'What is 2 + 2?': '4',
  });

  describe('when prediction equals expected output', () => {
    test('returns prediction, attaches metric result, and preserves metadata', async () => {
      const runner = new EvaluationRunner(task, provider, [metric]);
      const samples: import('../types/evaluation-sample').EvaluationSample<
        string,
        string
      >[] = [
        {
          input: 'What is the capital of France?',
          expectedOutput: 'Paris',
        },
      ];

      const results = await runner.run(samples);

      expect(results).toHaveLength(1);
      const result = results[0];

      expect(result?.prediction).toBe('Paris');
      expect(result?.metricResults).toHaveLength(1);
      expect(result?.metricResults[0]?.name).toBe('exact_match');
      expect(result?.metricResults[0]?.score).toBe(1);
      expect(result?.metricResults[0]?.passed).toBe(true);
      expect(result?.metadata).toEqual({
        model: 'fake-model',
        latencyMs: 0,
      });
    });
  });

  describe('when prediction differs from expected output', () => {
    test('returns prediction, attaches metric result with score 0, and preserves metadata', async () => {
      const runner = new EvaluationRunner(task, provider, [metric]);
      const samples: import('../types/evaluation-sample').EvaluationSample<
        string,
        string
      >[] = [
        {
          input: 'What is the capital of France?',
          expectedOutput: 'London',
        },
      ];

      const results = await runner.run(samples);

      const result = results[0];

      expect(result?.prediction).toBe('Paris');
      expect(result?.metricResults).toHaveLength(1);
      expect(result?.metricResults[0]?.name).toBe('exact_match');
      expect(result?.metricResults[0]?.score).toBe(0);
      expect(result?.metricResults[0]?.passed).toBe(false);
      expect(result?.metadata).toEqual({
        model: 'fake-model',
        latencyMs: 0,
      });
    });
  });
});
