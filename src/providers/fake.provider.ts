import type { ModelResponse } from '../types/model-response';
import type { ModelProvider } from './base.provider';

export class FakeModelProvider implements ModelProvider {
  private responses: Map<string, string>;

  constructor(responses: Record<string, string>) {
    this.responses = new Map(Object.entries(responses));
  }

  async generate(prompt: string): Promise<ModelResponse> {
    const output = this.responses.get(prompt);

    if (output === undefined) {
      throw new Error(`No fake response configured for prompt: ${prompt}`);
    }

    return {
      output,
      metadata: {
        model: 'fake-model',
        latencyMs: 0,
      },
    };
  }
}
