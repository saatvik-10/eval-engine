import type { EvaluationSample } from '../types/evaluation-sample';

export const simpleQADataset: EvaluationSample<string, string>[] = [
  {
    input: 'WHAT IS 2 + 2 ?',
    expectedOutput: '4',
  },
  {
    input: 'WHO IS THE GREATEST FOOTBALL PLAYER OF ALL TIME ?',
    expectedOutput: 'LIONEL MESSI',
  },
];
