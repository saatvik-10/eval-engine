import type { PromptBuilder } from './prompt-builder';
import type { OutputParser } from './output-parser';
import type { Task } from './base.task';

class SimpleQAPromptBuilder implements PromptBuilder<string> {
  build(input: string): string {
    return input;
  }
}

class SimpleQAOutputParser implements OutputParser<string> {
  parse(raw: string): string {
    return raw.trim();
  }
}

export class SimpleQATask implements Task<string, string> {
  promptBuilder: PromptBuilder<string>;
  outputParser: OutputParser<string>;

  constructor() {
    this.promptBuilder = new SimpleQAPromptBuilder();
    this.outputParser = new SimpleQAOutputParser();
  }
}
