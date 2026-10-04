import type { EvaluationResult } from '../types/evaluation-result';
import type { MetricResult } from '../types/metric-result';
import type { Metric } from './base.metric';
import type { EmbeddingProvider } from '../providers/embedding.provider';
import { cosineSimilarity } from './cosine-similarity';

export class SemanticSimilarityMetric implements Metric<string, string> {
  constructor(private embeddingProvider: EmbeddingProvider) {}

  async evaluate(
    result: EvaluationResult<string, string>,
  ): Promise<MetricResult> {
    const predictedEmbedding = await this.embeddingProvider.embed(
      result.prediction,
    );

    const expectedEmbedding = await this.embeddingProvider.embed(
      result.sample.expectedOutput,
    );

    const score = cosineSimilarity(predictedEmbedding, expectedEmbedding);

    return {
      name: 'semantic_similarity',
      score,
    };
  }
}
