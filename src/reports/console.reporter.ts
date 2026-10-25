import type { Reporter } from './base.reporter';
import type { EvaluationResult } from '../types/evaluation-result';

export class ConsoleReporter implements Reporter<string, string> {
  report(results: EvaluationResult<string, string>[]): void {
    let latency;
    let tokens;

    const totalSamples = results.length;
    const passedSamples = results.filter(
      (result) => result.metricResults[0]?.passed,
    ).length;
    const failedSamples = totalSamples - passedSamples;
    const accuracy = totalSamples > 0 ? passedSamples / totalSamples : 0;
    const totalLatency = results.reduce(
      (sum, result) => sum + (Number(result.metadata?.latencyMs) || 0),
      0,
    );
    const totalTokens = results.reduce(
      (sum, result) => sum + (Number(result.metadata?.totalTokens) || 0),
      0,
    );

    const averageLatency = totalSamples > 0 ? totalLatency / totalSamples : 0;

    console.log(`Total Samples: ${totalSamples}`);
    console.log(`Passed: ${passedSamples}`);
    console.log(`Failed: ${failedSamples}`);
    console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`);
    console.log(`Average Latency: ${averageLatency.toFixed(2)} ms`);
    console.log(`Total Tokens Used: ${totalTokens}`);
  }
}
