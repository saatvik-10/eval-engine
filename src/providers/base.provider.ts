import type { ModelResponse } from '../types/model-response';

export interface ModelProvider {
  generate(prompt: string): Promise<ModelResponse>;
}
