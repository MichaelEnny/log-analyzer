# Contributing to LogAnalyzer

Thank you for your interest in contributing to LogAnalyzer!

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Run linter: `npm run lint`

## Project Structure

- `bin/` - CLI entry points
- `src/` - Source code
  - `cli/` - Command line interface logic
  - `parsers/` - Log parsing implementations
  - `filters/` - Filtering logic
  - `aggregators/` - Statistics and aggregation
  - `exporters/` - Output format handlers
  - `models/` - Data models
  - `utils/` - Utility functions
  - `validators/` - Validation logic
  - `formatters/` - Output formatting
- `tests/` - Test suites
- `testdata/` - Test fixtures

## Coding Standards

- Use ES6+ features
- Follow existing code style
- Add tests for new features
- Update documentation as needed

## Adding New Export Formats

When adding a new export format:

1. Create a new exporter class in `src/exporters/`
2. Follow the pattern from existing exporters (CSV, XML)
3. Implement the `export(entries, stats, outputPath)` method
4. Read relevant options from `this.config`
5. Add tests in `tests/exporters/`
6. Update README.md with format specification

For the JSON format specifically, ensure you follow the schema documented in the README for compatibility with downstream analytics tools.

## Testing

- Write unit tests for all new functionality
- Ensure all tests pass before submitting PR
- Aim for >80% code coverage

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Update documentation
5. Submit PR with clear description

## Questions?

Open an issue or reach out to the maintainers.