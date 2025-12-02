const { DateTime } = require('luxon');

class LogFilter {
  constructor(config = {}) {
    this.config = config;
  }

  apply(entries, options = {}) {
    let filtered = entries;

    if (options.filter) {
      filtered = this.applyFilterExpression(filtered, options.filter);
    }

    if (options.dateRange) {
      filtered = this.applyDateRange(filtered, options.dateRange);
    }

    return filtered;
  }

  applyFilterExpression(entries, expression) {
    // Parse filter expression: "status>=400", "method=GET", etc.
    const parts = expression.match(/(\w+)(>=|<=|>|<|=)(.+)/);
    if (!parts) {
      throw new Error(`Invalid filter expression: ${expression}`);
    }

    const [, field, operator, value] = parts;

    return entries.filter(entry => {
      const entryValue = entry[field];
      const compareValue = isNaN(value) ? value : parseFloat(value);

      switch (operator) {
        case '=':
          return entryValue == compareValue;
        case '>':
          return entryValue > compareValue;
        case '<':
          return entryValue < compareValue;
        case '>=':
          return entryValue >= compareValue;
        case '<=':
          return entryValue <= compareValue;
        default:
          return true;
      }
    });
  }

  applyDateRange(entries, range) {
    const [startStr, endStr] = range.split(':');
    const start = DateTime.fromISO(startStr);
    const end = DateTime.fromISO(endStr);

    return entries.filter(entry => {
      const entryDate = DateTime.fromISO(entry.timestamp);
      return entryDate >= start && entryDate <= end;
    });
  }
}

module.exports = LogFilter;