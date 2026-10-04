import { OpenRouterProvider } from './providers/openrouter.provider';
import { EvaluationRunner } from './runner/evaluation.runner';
import { SimpleQATask } from './tasks/simple-qa.task';
import { ConsoleReporter } from './reports/console.reporter';
import { JsonDatasetLoader } from './datasets/json.dataset-loader';
import { SimpleDatasetValidator } from './datasets/dataset-validator';
import { NormalizedExactMatchMetric } from './metrics/normalized-exact-match.metric';
import { ContainsMetric } from "./metrics/contains.metric";

const task = new SimpleQATask();

const provider = new OpenRouterProvider(
  "openrouter/free"
);

const metric = [new NormalizedExactMatchMetric()];
const metrics = [new ContainsMetric()];

const runner = new EvaluationRunner(task, provider, metrics);
const validator = new SimpleDatasetValidator<string, string>();
const loader = new JsonDatasetLoader<string, string>(validator);

const dataset = await loader.load('./src/datasets/simple-qa.json');
const results = await runner.run(dataset);

const reporter = new ConsoleReporter();

reporter.report(results);

console.log(JSON.stringify(results, null, 2));
