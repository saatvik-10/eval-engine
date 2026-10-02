import type { EvaluationSample } from '../types/evaluation-sample';

export interface DatasetValidator<I, O> {
  validate(data: unknown): EvaluationSample<I, O>[];
}

export class SimpleDatasetValidator<I, O> implements DatasetValidator<I, O> {
  validate(data: unknown): EvaluationSample<I, O>[] {
    if (!Array.isArray(data)) {
      throw new Error('Dataset must be an array');
    }

    for (const [index, sample] of data.entries()) {
      if (typeof sample !== 'object' || sample === null) {
        throw new Error(`Sample at index ${index} must be an object`);
      }

      if (!('input' in sample)) {
        throw new Error(`Sample at index ${index} is missing "input"`);
      }

      if (!('expectedOutput' in sample)) {
        throw new Error(`Sample at index ${index} is missing "expectedOutput"`);
      }
    }

    return data as EvaluationSample<I, O>[];
  }
}
