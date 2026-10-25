import { describe, test, expect } from 'bun:test';
import { SimpleDatasetValidator } from '../datasets/dataset-validator';

describe('SimpleDatasetValidator', () => {
  const validator = new SimpleDatasetValidator();

  test('accepts a valid dataset', () => {
    const data = [
      { input: 'What is 2 + 2?', expectedOutput: '4' },
      { input: 'What is the capital of France?', expectedOutput: 'Paris' },
    ];

    const result = validator.validate(data);

    expect(result).toHaveLength(2);
    expect(result[0]?.input).toBe('What is 2 + 2?');
    expect(result[0]?.expectedOutput).toBe('4');
    expect(result[1]?.input).toBe('What is the capital of France?');
    expect(result[1]?.expectedOutput).toBe('Paris');
  });

  test('rejects a non-array input', () => {
    expect(() => validator.validate('not an array')).toThrow(
      'Dataset must be an array',
    );
    expect(() => validator.validate(123)).toThrow('Dataset must be an array');
    expect(() => validator.validate({ key: 'value' })).toThrow(
      'Dataset must be an array',
    );
    expect(() => validator.validate(null)).toThrow('Dataset must be an array');
    expect(() => validator.validate(undefined)).toThrow(
      'Dataset must be an array',
    );
  });

  test("rejects a sample that isn't an object", () => {
    expect(() => validator.validate([1, 2, 3])).toThrow(
      'Sample at index 0 must be an object',
    );
    expect(() => validator.validate(['string'])).toThrow(
      'Sample at index 0 must be an object',
    );
    expect(() => validator.validate([null])).toThrow(
      'Sample at index 0 must be an object',
    );
    expect(() => validator.validate([true])).toThrow(
      'Sample at index 0 must be an object',
    );
  });

  test('rejects a sample missing input', () => {
    expect(() => validator.validate([{ expectedOutput: '4' }])).toThrow(
      'Sample at index 0 is missing "input"',
    );
    expect(() =>
      validator.validate([{ input: 'test', expectedOutput: '4' }]),
    ).not.toThrow();
  });

  test('rejects a sample missing expectedOutput', () => {
    expect(() => validator.validate([{ input: 'test' }])).toThrow(
      'Sample at index 0 is missing "expectedOutput"',
    );
    expect(() => validator.validate([{ expectedOutput: '4' }])).toThrow(
      'Sample at index 0 is missing "input"',
    );
  });
});
