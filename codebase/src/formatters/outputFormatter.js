const chalk = require('chalk');

class OutputFormatter {
  static formatSuccess(message) {
    return chalk.green(`✓ ${message}`);
  }

  static formatError(message) {
    return chalk.red(`✗ ${message}`);
  }

  static formatWarning(message) {
    return chalk.yellow(`⚠ ${message}`);
  }

  static formatInfo(message) {
    return chalk.blue(`ℹ ${message}`);
  }

  static formatTable(headers, rows) {
    const colWidths = headers.map((h, i) => {
      const maxContentWidth = Math.max(...rows.map(r => String(r[i]).length));
      return Math.max(h.length, maxContentWidth);
    });

    const separator = colWidths.map(w => '-'.repeat(w + 2)).join('+');
    const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join(' | ');
    const dataRows = rows.map(row =>
      row.map((cell, i) => String(cell).padEnd(colWidths[i])).join(' | ')
    );

    return [
      separator,
      headerRow,
      separator,
      ...dataRows,
      separator
    ].join('\n');
  }

  static formatProgress(current, total, message = '') {
    const percentage = Math.floor((current / total) * 100);
    const barLength = 40;
    const filled = Math.floor((current / total) * barLength);
    const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

    return `${bar} ${percentage}% ${message}`;
  }
}

module.exports = OutputFormatter;