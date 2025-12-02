const XMLExporter = require('../../src/exporters/xmlExporter');
const LogEntry = require('../../src/models/logEntry');
const fs = require('fs');
const path = require('path');

describe('XMLExporter', () => {
  const testOutputPath = path.join(__dirname, '../temp/test-output.xml');

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

  test('should export log entries to XML format', async () => {
    const exporter = new XMLExporter({});
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

    expect(fs.existsSync(testOutputPath)).toBe(true);

    const content = fs.readFileSync(testOutputPath, 'utf8');
    expect(content).toContain('<?xml version="1.0"');
    expect(content).toContain('<logs>');
    expect(content).toContain('<entry>');
    expect(content).toContain('<timestamp>2024-01-15T10:30:45Z</timestamp>');
    expect(content).toContain('<ip_address>192.168.1.100</ip_address>');
  });

  test('should include XML declaration when configured', async () => {
    const exporter = new XMLExporter({
      xml_options: { include_declaration: true }
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
    expect(content.startsWith('<?xml version="1.0"')).toBe(true);
  });
});