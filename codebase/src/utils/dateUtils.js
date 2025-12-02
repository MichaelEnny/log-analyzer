const { DateTime } = require('luxon');

class DateUtils {
  static parseISO(dateString) {
    return DateTime.fromISO(dateString);
  }

  static toISO(dateTime) {
    return dateTime.toISO();
  }

  static formatForDisplay(dateString, format = 'yyyy-MM-dd HH:mm:ss') {
    const dt = DateTime.fromISO(dateString);
    return dt.toFormat(format);
  }

  static getDateRange(entries) {
    if (entries.length === 0) {
      return { start: null, end: null };
    }

    const timestamps = entries
      .map(e => e.timestamp)
      .filter(t => t)
      .map(t => DateTime.fromISO(t))
      .sort((a, b) => a.toMillis() - b.toMillis());

    return {
      start: timestamps[0].toISO(),
      end: timestamps[timestamps.length - 1].toISO()
    };
  }

  static getCurrentTimestamp() {
    return DateTime.now().toISO();
  }
}

module.exports = DateUtils;