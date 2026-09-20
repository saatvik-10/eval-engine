import type { Reporter } from './base.reporter';
import type { EvaluationResult } from '../types/evaluation-result';

export class ConsoleReporter implements Reporter<string, string> {
  report(results: EvaluationResult<string, string[]>[]): void {
    const totalSamples = results.length;
    const passedSamples = results.filter(
      (result) => result.metricResults[0]?.score === 1,
    ).length;
    const failedSamples = totalSamples - passedSamples;
    const accuracy = totalSamples > 0 ? passedSamples / totalSamples : 0;

    console.log(`Total Samples: ${totalSamples}`);
    console.log(`Passed: ${passedSamples}`);
    console.log(`Failed: ${failedSamples}`);
    console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`);
  }
}
