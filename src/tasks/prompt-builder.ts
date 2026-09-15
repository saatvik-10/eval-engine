export interface PromptBuilder<I> {
  build(input: I): string;
}
