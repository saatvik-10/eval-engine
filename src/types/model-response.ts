export interface ModelResponse {
  output: string;
  metadata: {
    model: string;
    latencyMs: number;
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    cost?: number;
    extra?: Record<string, unknown>;
  };
}
