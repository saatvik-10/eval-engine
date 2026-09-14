export interface EvaluationSample<I, O> {
  input: I;
  expectedOutput: O;
  metadata?: Record<string, unknown>;
}
