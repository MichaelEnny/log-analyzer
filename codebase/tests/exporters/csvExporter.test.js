const CSVExporter = require('../../src/exporters/csvExporter');
const LogEntry = require('../../src/models/logEntry');
const fs = require('fs');
const path = require('path');

describe('CSVExporter', () => {
  const testOutputPath = path.join(__dirname, '../temp/test-output.csv');

  beforeEach(() => {
    // Clean up test output
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  afterEach(() => {
    // Clean up test output
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  test('should export log entries to CSV format', async () => {
    const exporter = new CSVExporter({});
    const entries = [
      new LogEntry({
        timestamp: '2024-01-15T10:30:45Z',
        ip_address: '192.168.1.100',
        method: 'GET',
        path: '/api/users',
        status_code: 200,
        response_time: 45,
        user_agent: 'Mozilla/5.0'
      }),
      new LogEntry({
        timestamp: '2024-01-15T10:31:12Z',
        ip_address: '192.168.1.101',
        method: 'POST',
        path: '/api/posts',
        status_code: 201,
        response_time: 89,
        user_agent: 'Chrome/120.0'
      })
    ];

    await exporter.export(entries, {}, testOutputPath);

    expect(fs.existsSync(testOutputPath)).toBe(true);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    expect(content).toContain('timestamp,ip_address,method,path,status_code');
    expect(content).toContain('192.168.1.100');
    expect(content).toContain('GET');
  });

  test('should include all required CSV columns', async () => {
    const exporter = new CSVExporter({});
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

    await exporter.export(entries, {}, testOutputPath);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    const headers = content.split('\n')[0];

    expect(headers).toContain('timestamp');
    expect(headers).toContain('ip_address');
    expect(headers).toContain('method');
    expect(headers).toContain('path');
    expect(headers).toContain('status_code');
    expect(headers).toContain('response_time');
    expect(headers).toContain('user_agent');
  });
});