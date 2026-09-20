# Evaluation Engine V0

A lightweight, extensible evaluation engine for testing and measuring AI system outputs.

Built from scratch to understand the core architecture behind evaluation frameworks before integrating production-ready tools.

## Overview

The evaluation engine processes test samples, generates model predictions, evaluates them using metrics, and produces a report.

```text
Dataset
   ↓
Evaluation Runner
   ↓
Task (Prompt Builder + Output Parser)
   ↓
Model Provider
   ↓
Prediction
   ↓
Metrics
   ↓
Evaluation Result
   ↓
Console Report