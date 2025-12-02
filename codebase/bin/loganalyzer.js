#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const AnalyzerCLI = require('../src/cli/analyzerCLI');
const packageJson = require('../package.json');

const program = new Command();

program
  .name('loganalyzer')
  .description('High-performance CLI tool for server log analysis')
  .version(packageJson.version);

program
  .command('analyze')
  .description('Analyze server logs')
  .requiredOption('-i, --input <file>', 'Input log file path')
  .option('-o, --output <file>', 'Output file path')
  .option('-f, --format <format>', 'Log format (apache, nginx, custom)', 'apache')
  .option('--format-output <format>', 'Output format (csv, xml, json)', 'csv')
  .option('--filter <expression>', 'Filter expression')
  .option('--date-range <range>', 'Date range (start:end)')
  .option('-v, --verbose', 'Verbose output', false)
  .action(async (options) => {
    try {
      // Validate input file
      if (!fs.existsSync(options.input)) {
        console.error(chalk.red(`Error: Input file not found: ${options.input}`));
        process.exit(1);
      }

      // Load config
      const configPath = path.join(process.cwd(), '.loganalyzer.config.json');
      let config = {};
      if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (options.verbose) {
          console.log(chalk.blue('Loaded configuration from .loganalyzer.config.json'));
        }
      }

      // Create CLI instance and run analysis
      const cli = new AnalyzerCLI(config);
      await cli.analyze(options);

      console.log(chalk.green('Analysis completed successfully!'));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate log file format')
  .requiredOption('-i, --input <file>', 'Input log file path')
  .option('-f, --format <format>', 'Expected log format', 'apache')
  .action(async (options) => {
    try {
      console.log(chalk.blue(`Validating ${options.input}...`));
      const cli = new AnalyzerCLI({});
      const result = await cli.validate(options);

      if (result.valid) {
        console.log(chalk.green('Validation passed!'));
        console.log(`Total lines: ${result.totalLines}`);
        console.log(`Valid lines: ${result.validLines}`);
      } else {
        console.log(chalk.yellow('Validation failed!'));
        console.log(`Errors: ${result.errors.length}`);
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}