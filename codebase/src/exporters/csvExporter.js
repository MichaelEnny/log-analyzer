const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

class CSVExporter {
  constructor(config = {}) {
    this.config = config;
    this.csvOptions = config.csv_options || {
      delimiter: ',',
      include_headers: true,
      quote_strings: true
    };
  }

  async export(entries, stats, outputPath) {
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: 'timestamp', title: 'timestamp' },
        { id: 'ip_address', title: 'ip_address' },
        { id: 'method', title: 'method' },
        { id: 'path', title: 'path' },
        { id: 'status_code', title: 'status_code' },
        { id: 'response_time', title: 'response_time' },
        { id: 'user_agent', title: 'user_agent' }
      ]
    });

    const records = entries.map(entry => ({
      timestamp: entry.timestamp,
      ip_address: entry.ip_address,
      method: entry.method,
      path: entry.path,
      status_code: entry.status_code,
      response_time: entry.response_time,
      user_agent: entry.user_agent
    }));

    await csvWriter.writeRecords(records);
  }
}

module.exports = CSVExporter;