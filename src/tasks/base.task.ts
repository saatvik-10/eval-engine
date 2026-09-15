import type { PromptBuilder } from './prompt-builder';
import type { OutputParser } from './output-parser';

export interface Task<I, O> {
  promptBuilder: PromptBuilder<I>;
  outputParser: OutputParser<O>;
}
