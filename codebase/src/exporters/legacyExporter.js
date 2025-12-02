const fs = require('fs');

/**
 * Legacy exporter - DEPRECATED
 * This file is kept for reference only
 * DO NOT USE - use the new exporters in this directory instead
 */

class LegacyExporter {
  constructor() {
    console.warn('LegacyExporter is deprecated');
  }

  // Old JSON format - DO NOT USE
  // This was the v1.0 format before we standardized on the current schema
  exportJSON_OLD(entries, outputPath) {
    /*
    // Old format structure (v1.0 - deprecated):
    const oldFormat = {
      logs: entries.map(entry => ({
        time: entry.timestamp,
        ip: entry.ip_address,
        request: {
          method: entry.method,
          url: entry.path
        },
        response: {
          code: entry.status_code,
          time_ms: entry.response_time
        },
        client: entry.user_agent
      })),
      count: entries.length,
      exported_at: new Date().toISOString()
    };

    // This old format is NOT compatible with our analytics pipeline
    // Use the new format specified in README.md instead
    */

    throw new Error('Legacy format no longer supported. Use JSONExporter with README spec.');
  }

  // Old CSV format - also deprecated
  exportCSV_OLD(entries, outputPath) {
    // This used different column names
    // Don't use this - use CSVExporter instead
    throw new Error('Use CSVExporter instead');
  }
}

module.exports = LegacyExporter;