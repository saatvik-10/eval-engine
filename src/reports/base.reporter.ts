import type { EvaluationResult } from "../types/evaluation-result";

export interface Reporter<I, O> {
  report(results: EvaluationResult<I, O[]>[]): void;
}