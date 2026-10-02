import { ExactMatchMetric } from './metrics/exact-match.metric';
import { FakeModelProvider } from './providers/fake.provider';
import { EvaluationRunner } from './runner/evaluation.runner';
import { SimpleQATask } from './tasks/simple-qa.task';
import { ConsoleReporter } from './reports/console.reporter';
import { JsonDatasetLoader } from './datasets/json.dataset-loader';
import { SimpleDatasetValidator } from './datasets/dataset-validator';

const task = new SimpleQATask();

const provider = new FakeModelProvider({
  'WHAT IS 2 + 2 ?': '4',
  'WHO IS THE GREATEST FOOTBALL PLAYER OF ALL TIME ?': 'PENDU',
});

const metric = [new ExactMatchMetric()];

const runner = new EvaluationRunner(task, provider, metric);
const validator = new SimpleDatasetValidator<string, string>();
const loader = new JsonDatasetLoader<string, string>(validator);

const dataset = await loader.load('./src/datasets/simple-qa.json');
const results = await runner.run(dataset);

const reporter = new ConsoleReporter();

reporter.report(results);

console.log(JSON.stringify(results, null, 2));
