import { describe, test, expect } from 'bun:test';
import { ConsoleReporter } from '../reports/console.reporter';
import type { EvaluationResult } from '../types/evaluation-result';

const makeResult = (
  overrides: Partial<EvaluationResult<string, string>> = {},
): EvaluationResult<string, string> => ({
  sample: {
    input: 'test',
    expectedOutput: 'answer',
  },
  prediction: 'answer',
  metricResults: [{ name: 'exact_match', score: 1, passed: true }],
  metadata: { latencyMs: 100, totalTokens: 5 },
  ...overrides,
});

describe('ConsoleReporter', () => {
  const reporter = new ConsoleReporter();

  describe('with results that have metrics and metadata', () => {
    test('reports correct totals, pass/fail counts, and accuracy', () => {
      const results: EvaluationResult<string, string>[] = [
        makeResult({
          prediction: 'answer',
          metadata: { latencyMs: 100, totalTokens: 5 },
        }),
        makeResult({
          prediction: 'wrong',
          metadata: { latencyMs: 200, totalTokens: 3 },
          metricResults: [{ name: 'exact_match', score: 0, passed: false }],
        }),
        makeResult({
          prediction: 'answer',
          metadata: { latencyMs: 150, totalTokens: 4 },
        }),
      ];

      let logOutput = '';
      const originalLog = console.log;
      console.log = (msg: string) => {
        logOutput += msg + '\n';
      };

      reporter.report(results);
      console.log = originalLog;

      expect(logOutput).toContain('Total Samples: 3');
      expect(logOutput).toContain('Passed: 2');
      expect(logOutput).toContain('Failed: 1');
      expect(logOutput).toContain('Accuracy: 66.67%');
    });

    test('reports average latency and total token usage', () => {
      const results: EvaluationResult<string, string>[] = [
        makeResult({ metadata: { latencyMs: 100, totalTokens: 5 } }),
        makeResult({ metadata: { latencyMs: 200, totalTokens: 3 } }),
        makeResult({ metadata: { latencyMs: 150, totalTokens: 4 } }),
      ];

      let logOutput = '';
      const originalLog = console.log;
      console.log = (msg: string) => {
        logOutput += msg + '\n';
      };

      reporter.report(results);
      console.log = originalLog;

      expect(logOutput).toContain('Average Latency: 150.00 ms');
      expect(logOutput).toContain('Total Tokens Used: 12');
    });
  });

  describe('with empty dataset', () => {
    test('handles empty results without NaN or Infinity', () => {
      const results: EvaluationResult<string, string>[] = [];

      let logOutput = '';
      const originalLog = console.log;
      console.log = (msg: string) => {
        logOutput += msg + '\n';
      };

      reporter.report(results);
      console.log = originalLog;

      expect(logOutput).toContain('Total Samples: 0');
      expect(logOutput).toContain('Passed: 0');
      expect(logOutput).toContain('Failed: 0');
      expect(logOutput).toContain('Accuracy: 0.00%');
      expect(logOutput).toContain('Average Latency: 0.00 ms');
      expect(logOutput).toContain('Total Tokens Used: 0');
    });
  });

  describe('with results missing metadata', () => {
    test('handles missing metadata without crashing', () => {
      const results: EvaluationResult<string, string>[] = [
        {
          sample: { input: 'test', expectedOutput: 'answer' },
          prediction: 'answer',
          metricResults: [{ name: 'exact_match', score: 1, passed: true }],
          metadata: undefined,
        },
        {
          sample: { input: 'test2', expectedOutput: 'answer2' },
          prediction: 'answer2',
          metricResults: [{ name: 'exact_match', score: 0, passed: false }],
        },
      ];

      let logOutput = '';
      const originalLog = console.log;
      console.log = (msg: string) => {
        logOutput += msg + '\n';
      };

      reporter.report(results);
      console.log = originalLog;

      expect(logOutput).toContain('Total Samples: 2');
      expect(logOutput).toContain('Passed: 1');
      expect(logOutput).toContain('Failed: 1');
      expect(logOutput).toContain('Accuracy: 50.00%');
    });
  });
});
