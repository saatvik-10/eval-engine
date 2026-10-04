import { OpenRouter } from '@openrouter/sdk';
import type { EmbeddingProvider } from './embedding.provider';

export class OpenRouterEmbeddingProvider implements EmbeddingProvider {
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

  async embed(text: string): Promise<number[]> {
    const response = await this.client.embeddings.generate({
      requestBody: {
        model: this.model,
        input: text,
      },
    });

    if (typeof response === 'string') {
      throw new Error('Embedding API returned an unexpected text response');
    }

    const embedding = response.data[0]?.embedding;

    if (!embedding || typeof embedding === 'string') {
      throw new Error('Embedding API returned an invalid embedding');
    }

    return embedding;
  }
}
