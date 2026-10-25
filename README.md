# Evaluation Engine V1

A lightweight, extensible evaluation engine for testing and measuring AI system outputs.

Built from scratch to understand the core architecture behind evaluation frameworks before integrating production-ready tools.

## Overview

The evaluation engine loads and validates test datasets, generates model predictions through configurable providers, evaluates outputs using pluggable metrics, and aggregates results into a report.

```text
JSON Dataset
     ↓
Dataset Loader + Validator
     ↓
Evaluation Runner
     ↓
Task (Prompt Builder + Output Parser)
     ↓
Model Provider
     ↓
Prediction + Execution Metadata
     ↓
Evaluation Metrics
     ↓
Evaluation Results
     ↓
Console Report
```

## Features

- **Dataset loading and validation:** Load evaluation samples from JSON and reject malformed inputs.
- **Modular architecture:** Separate tasks, model providers, metrics, runners, and reporters.
- **Real LLM integration:** Generate predictions using OpenRouter.
- **Pluggable metrics:** Evaluate outputs using exact match, normalized exact match, contains, and semantic similarity.
- **Embedding-based evaluation:** Compare prediction and expected-output embeddings using cosine similarity.
- **Execution metadata:** Preserve model information, latency, and token usage alongside evaluation results.
- **Aggregated reporting:** Summarize sample counts, pass/fail rates, accuracy, average latency, and total token usage.
- **Automated tests:** Test metric behavior, runner orchestration, dataset validation, and reporting using Bun's test runner.

## Architecture

- **Dataset Loader:** Reads evaluation samples from JSON files.
- **Dataset Validator:** Checks dataset structure and required fields before evaluation.
- **Task:** Defines how inputs become prompts and how raw model outputs become predictions.
- **Model Provider:** Abstracts model generation behind a common interface.
- **Evaluation Runner:** Orchestrates prediction generation, output parsing, metric execution, and result collection.
- **Metrics:** Independently score specific properties of model outputs.
- **Evaluation Result:** Stores the sample, prediction, metric results, and execution metadata.
- **Console Reporter:** Aggregates evaluation results into a readable summary.

## Metrics

| Metric | Purpose |
|---|---|
| Exact Match | Checks strict equality between prediction and expected output. |
| Normalized Exact Match | Compares normalized strings to reduce formatting-related mismatches. |
| Contains | Checks whether the prediction contains the expected output. |
| Semantic Similarity | Compares embeddings using cosine similarity and applies a configurable-in-code threshold. |

Each metric produces a score and pass/fail outcome. Metric results remain separate from execution metadata.

## Running the Engine

Install dependencies:

```bash
bun install
```

Configure your OpenRouter API key in `.env`:

```env
OPENROUTER_API_KEY=your_api_key
```

Run the evaluation:

```bash
bun run src/index.ts
```

Run tests:

```bash
bun test
```

## Design Principles

- Keep model providers independent of evaluation logic.
- Keep metrics independent and focused on one evaluation dimension.
- Separate execution metadata from quality scores.
- Validate external data at system boundaries.
- Make the runner generic enough to support different tasks and providers.

## Current Limitations

- The initial task implementation focuses on simple question-answering.
- Semantic similarity relies on embedding quality and a manually chosen threshold.
- The reporter uses the first metric's pass status to determine sample-level pass/fail.
- Cost reporting, advanced metric aggregation, and broader task types can be added in future versions.

## Roadmap

- Add richer task types such as summarization, classification, and structured-output evaluation.
- Improve metric configuration and sample-level pass policies.
- Add cost tracking and more detailed reports.
- Compare custom implementations against established evaluation frameworks.

## Version

`v1.0.0`