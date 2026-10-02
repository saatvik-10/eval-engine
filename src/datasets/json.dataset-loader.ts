import type { EvaluationSample } from '../types/evaluation-sample';
import type { DatasetLoader } from './dataset-loader';
import { SimpleDatasetValidator } from './dataset-validator';

export class JsonDatasetLoader<I, O> implements DatasetLoader<I, O> {
  constructor(private validator: SimpleDatasetValidator<I, O>) {}

  async load(path: string): Promise<EvaluationSample<I, O>[]> {
    const file = Bun.file(path);

    if (!(await file.exists())) {
      throw new Error(`Dataset file not found: ${path}`);
    }

    const data = await file.json();

    return this.validator.validate(data);
  }
}
