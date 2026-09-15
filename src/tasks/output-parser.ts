export interface OutputParser<O> {
  parse(raw: string): O;
}
