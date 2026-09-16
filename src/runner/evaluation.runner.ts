import type { Metric } from '../metrics/base.metric';
import type { ModelProvider } from '../providers/base.provider';
import type { Task } from '../tasks/base.task';
import type { EvaluationResult } from '../types/evaluation-result';
import type { EvaluationSample } from '../types/evaluation-sample';

export class EvalationRunner<I, O> {
  constructor(
    private task: Task<I, O>,
    private provider: ModelProvider,
    private metrics: Metric<I, O>[],
  ) {}

  async run(
    samples: EvaluationSample<I, O>[],
  ): Promise<EvaluationResult<I, O>[]> {
    const results: EvaluationResult<I, O>[] = [];

    for (const sample of samples) {
      const prompt = this.task.promptBuilder.build(sample.input);
      const response = this.provider.generate(prompt);
      const prediction = this.task.outputParser.parse((await response).output);

      const result: EvaluationResult<I, O> = {
        sample,
        prediction,
        metricResults: [],
      };

      for (const metric of this.metrics) {
        const metricResult = metric.evaluate(result);
        result.metricResults.push(metricResult);
      }

      results.push(result);
    }

    return results;
  }
}
