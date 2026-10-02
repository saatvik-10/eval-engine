import type { EvaluationSample } from '../types/evaluation-sample';
import type { DatasetLoader } from './dataset-loader';

export class JsonDatasetLoader<I, O> implements DatasetLoader<I, O> {
  async load(path: string): Promise<EvaluationSample<I, O>[]> {
    const file = Bun.file(path);

    if (!(await file.exists())) {
      throw new Error(`Dataset file not found: ${path}`);
    }

    const data = await file.json();

    return data as EvaluationSample<I, O>[];
  }
}
