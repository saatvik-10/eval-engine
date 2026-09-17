import { simpleQADataset } from './datasets/simple-qa.dataset';
import { ExactMatchMetric } from './metrics/exact-match.metric';
import { FakeModelProvider } from './providers/fake.provider';
import { EvaluationRunner } from './runner/evaluation.runner';
import { SimpleQATask } from './tasks/simple-qa.task';

const task = new SimpleQATask();

const provider = new FakeModelProvider({
  'WHAT IS 2 + 2 ?': '4',
  'WHO IS THE GREATEST FOOTBALL PLAYER OF ALL TIME ?': 'PENDU',
});

const metric = [new ExactMatchMetric()];

const runner = new EvaluationRunner(task, provider, metric);
const results = await runner.run(simpleQADataset);

console.log(JSON.stringify(results, null, 2));
