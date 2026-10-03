import { OpenRouter } from '@openrouter/sdk';
import type { ModelProvider } from './base.provider';
import type { ModelResponse } from '../types/model-response';

export class OpenRouterProvider implements ModelProvider {
  private client: OpenRouter;
  private model: string;

  constructor(model: string) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set!');
    }

    this.client = new OpenRouter({
      apiKey,
    });

    this.model = model;
  }

  async generate(prompt: string): Promise<ModelResponse> {
    const start = performance.now();

    const response = await this.client.chat.send({
      chatRequest: {
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
      },
    });

    if (!('choices' in response)) {
      throw new Error('Expected a non-streaming response');
    }

    const latencyMs = performance.now() - start;

    const content = response.choices[0]?.message.content;

    const output =
      typeof content === 'string'
        ? content
        : content
            ?.map((item) =>
              item.type === 'text' && 'text' in item ? item.text : '',
            )
            .join('');

    if (!output) {
      throw new Error('Model returned an empty response');
    }

    return {
      output,
      metadata: {
        model: this.model,
        latencyMs,
        inputTokens: response.usage?.promptTokens,
        outputTokens: response.usage?.completionTokens,
        totalTokens: response.usage?.totalTokens,
      },
    };
  }
}
