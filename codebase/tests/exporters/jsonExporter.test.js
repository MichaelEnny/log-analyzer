const JSONExporter = require('../../src/exporters/jsonExporter');
const LogEntry = require('../../src/models/logEntry');
const fs = require('fs');
const path = require('path');

describe('JSONExporter', () => {
  const testOutputPath = path.join(__dirname, '../temp/test-output.json');

  beforeEach(() => {
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  test.skip('should export log entries with metadata section', async () => {
    // TODO: Enable this test once JSON exporter is complete
    const exporter = new JSONExporter({});
    const entries = [
      new LogEntry({
        timestamp: '2024-01-15T10:30:45Z',
        ip_address: '192.168.1.100',
        method: 'GET',
        path: '/api/users',
        status_code: 200,
        response_time: 45,
        user_agent: 'Mozilla/5.0'
      })
    ];

    const stats = {
      total_requests: 1,
      successful_requests: 1,
      client_errors: 0,
      server_errors: 0,
      avg_response_time_ms: 45.0
    };

    await exporter.export(entries, stats, testOutputPath);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    const data = JSON.parse(content);

    // Verify structure matches README specification
    expect(data).toHaveProperty('metadata');
    expect(data).toHaveProperty('entries');
    expect(data).toHaveProperty('summary');

    // Check metadata section
    expect(data.metadata).toHaveProperty('generated_at');
    expect(data.metadata).toHaveProperty('total_entries');
    expect(data.metadata).toHaveProperty('date_range');
    expect(data.metadata.date_range).toHaveProperty('start');
    expect(data.metadata.date_range).toHaveProperty('end');
  });

  test.skip('should include summary statistics', async () => {
    // TODO: Enable this test once JSON exporter is complete
    const exporter = new JSONExporter({});
    const entries = [
      new LogEntry({
        timestamp: '2024-01-15T10:30:45Z',
        ip_address: '192.168.1.100',
        method: 'GET',
        path: '/api/users',
        status_code: 200,
        response_time: 45
      })
    ];

    const stats = {
      total_requests: 1523,
      successful_requests: 1450,
      client_errors: 58,
      server_errors: 15,
      avg_response_time_ms: 67.3
    };

    await exporter.export(entries, stats, testOutputPath);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    const data = JSON.parse(content);

    // Verify summary section matches README format
    expect(data.summary).toEqual({
      total_requests: 1523,
      successful_requests: 1450,
      client_errors: 58,
      server_errors: 15,
      avg_response_time_ms: 67.3
    });
  });

  test.skip('should use response_time_ms field name in entries', async () => {
    // TODO: Enable this test once JSON exporter is complete
    // Per README spec, JSON format uses response_time_ms not response_time
    const exporter = new JSONExporter({});
    const entries = [
      new LogEntry({
        timestamp: '2024-01-15T10:30:45Z',
        ip_address: '192.168.1.100',
        method: 'GET',
        path: '/api/users',
        status_code: 200,
        response_time: 45
      })
    ];

    await exporter.export(entries, {}, testOutputPath);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    const data = JSON.parse(content);

    // Entries should use response_time_ms per README
    expect(data.entries[0]).toHaveProperty('response_time_ms');
    expect(data.entries[0].response_time_ms).toBe(45);
  });

  test.skip('should apply pretty_print option from config', async () => {
    // TODO: Enable this test once JSON exporter is complete
    const exporter = new JSONExporter({
      json_options: {
        pretty_print: true,
        indent_spaces: 2
      }
    });

    const entries = [
      new LogEntry({
        timestamp: '2024-01-15T10:30:45Z',
        ip_address: '192.168.1.100',
        method: 'GET',
        path: '/api/users',
        status_code: 200,
        response_time: 45
      })
    ];

    await exporter.export(entries, {}, testOutputPath);

    const content = fs.readFileSync(testOutputPath, 'utf8');

    // Should be formatted with indentation
    expect(content).toContain('\n');
    expect(content).toContain('  '); // 2 space indent
  });
});