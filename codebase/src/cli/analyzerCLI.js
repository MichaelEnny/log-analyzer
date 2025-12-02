const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const LogParser = require('../parsers/logParser');
const LogFilter = require('../filters/logFilter');
const LogAggregator = require('../aggregators/logAggregator');
const CSVExporter = require('../exporters/csvExporter');
const XMLExporter = require('../exporters/xmlExporter');
const JSONExporter = require('../exporters/jsonExporter');

class AnalyzerCLI {
  constructor(config = {}) {
    this.config = config;
    this.parser = new LogParser(config);
    this.filter = new LogFilter(config);
    this.aggregator = new LogAggregator(config);
  }

  async analyze(options) {
    const { input, output, format, formatOutput, filter, dateRange, verbose } = options;

    if (verbose) {
      console.log(chalk.blue(`Analyzing ${input}...`));
      console.log(chalk.blue(`Log format: ${format}`));
      console.log(chalk.blue(`Output format: ${formatOutput}`));
    }

    // Parse logs
    const entries = await this.parser.parse(input, format);
    if (verbose) {
      console.log(chalk.blue(`Parsed ${entries.length} log entries`));
    }

    // Apply filters
    let filteredEntries = entries;
    if (filter || dateRange) {
      filteredEntries = this.filter.apply(entries, { filter, dateRange });
      if (verbose) {
        console.log(chalk.blue(`Filtered to ${filteredEntries.length} entries`));
      }
    }

    // Generate statistics
    const stats = this.aggregator.aggregate(filteredEntries);

    // Export results
    if (output) {
      await this.export(filteredEntries, stats, output, formatOutput, verbose);
    } else {
      // Display summary to console
      this.displaySummary(stats);
    }
  }

  async export(entries, stats, outputPath, format, verbose) {
    let exporter;

    switch (format.toLowerCase()) {
      case 'csv':
        exporter = new CSVExporter(this.config);
        break;
      case 'xml':
        exporter = new XMLExporter(this.config);
        break;
      case 'json':
        exporter = new JSONExporter(this.config);
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    await exporter.export(entries, stats, outputPath);

    if (verbose) {
      console.log(chalk.green(`Results exported to ${outputPath}`));
    }
  }

  displaySummary(stats) {
    console.log(chalk.bold('\n=== Analysis Summary ==='));
    console.log(`Total Requests: ${stats.total_requests}`);
    console.log(`Successful (2xx): ${stats.successful_requests}`);
    console.log(`Client Errors (4xx): ${stats.client_errors}`);
    console.log(`Server Errors (5xx): ${stats.server_errors}`);
    console.log(`Average Response Time: ${stats.avg_response_time_ms.toFixed(2)}ms`);
    console.log(`Min Response Time: ${stats.min_response_time_ms}ms`);
    console.log(`Max Response Time: ${stats.max_response_time_ms}ms`);
    console.log(`P50 Response Time: ${stats.p50_response_time_ms}ms`);
    console.log(`P95 Response Time: ${stats.p95_response_time_ms}ms`);
    console.log(`P99 Response Time: ${stats.p99_response_time_ms}ms`);
  }

  async validate(options) {
    const { input, format } = options;
    const entries = await this.parser.parse(input, format, { validateOnly: true });

    const totalLines = entries.total || 0;
    const validLines = entries.valid || 0;
    const errors = entries.errors || [];

    return {
      valid: errors.length === 0,
      totalLines,
      validLines,
      errors
    };
  }
}

module.exports = AnalyzerCLI;