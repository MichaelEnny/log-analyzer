const fs = require('fs');
const readline = require('readline');
const { DateTime } = require('luxon');
const LogEntry = require('../models/logEntry');

class LogParser {
  constructor(config = {}) {
    this.config = config;
  }

  async parse(filePath, format = 'apache', options = {}) {
    const entries = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let lineNumber = 0;
    const errors = [];

    for await (const line of rl) {
      lineNumber++;
      try {
        const entry = this.parseLine(line, format);
        if (entry) {
          entries.push(entry);
        }
      } catch (error) {
        if (options.validateOnly) {
          errors.push({ line: lineNumber, error: error.message });
        }
      }
    }

    if (options.validateOnly) {
      return {
        total: lineNumber,
        valid: entries.length,
        errors
      };
    }

    return entries;
  }

  parseLine(line, format) {
    switch (format.toLowerCase()) {
      case 'apache':
        return this.parseApache(line);
      case 'nginx':
        return this.parseNginx(line);
      case 'custom':
        return this.parseCustom(line);
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }

  parseApache(line) {
    // Apache Common Log Format
    // 127.0.0.1 - - [10/Oct/2024:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 2326 45
    const regex = /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) \S+" (\d+) (\d+)(?: (\d+))?/;
    const match = line.match(regex);

    if (!match) {
      throw new Error('Invalid Apache log format');
    }

    const [, ip, dateStr, method, path, status, bytes, responseTime] = match;

    return new LogEntry({
      ip_address: ip,
      timestamp: this.parseApacheDate(dateStr),
      method,
      path,
      status_code: parseInt(status, 10),
      bytes_sent: parseInt(bytes, 10),
      response_time: responseTime ? parseInt(responseTime, 10) : 0,
      user_agent: this.extractUserAgent(line)
    });
  }

  parseNginx(line) {
    // Similar to Apache but slightly different format
    const regex = /^(\S+) - - \[([^\]]+)\] "(\S+) (\S+) \S+" (\d+) (\d+) "([^"]*)" "([^"]*)"/;
    const match = line.match(regex);

    if (!match) {
      throw new Error('Invalid Nginx log format');
    }

    const [, ip, dateStr, method, path, status, bytes, referrer, userAgent] = match;

    return new LogEntry({
      ip_address: ip,
      timestamp: this.parseNginxDate(dateStr),
      method,
      path,
      status_code: parseInt(status, 10),
      bytes_sent: parseInt(bytes, 10),
      referrer,
      user_agent: userAgent
    });
  }

  parseCustom(line) {
    // Custom JSON format
    try {
      const data = JSON.parse(line);
      return new LogEntry(data);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  parseApacheDate(dateStr) {
    // 10/Oct/2024:13:55:36 +0000
    return DateTime.fromFormat(dateStr, 'dd/MMM/yyyy:HH:mm:ss ZZZ').toISO();
  }

  parseNginxDate(dateStr) {
    return DateTime.fromFormat(dateStr, 'dd/MMM/yyyy:HH:mm:ss ZZZ').toISO();
  }

  extractUserAgent(line) {
    const match = line.match(/"([^"]*)"$/);
    return match ? match[1] : 'Unknown';
  }
}

module.exports = LogParser;