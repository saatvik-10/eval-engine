import type { EvaluationSample } from '../types/evaluation-sample';

export interface DatasetLoader<I, O> {
  load(path: string): Promise<EvaluationSample<I, O>[]>;
}
