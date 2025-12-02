# LogAnalyzer - Server Log Analysis CLI Tool

A high-performance command-line tool for analyzing and processing server logs built with Node.js.

## Features

- **Multiple log format support:** Apache, Nginx, custom formats
- **Filtering:** By date range, status code, IP address, user agent
- **Aggregation:** Request counts, error rates, response time percentiles
- **Export formats:** CSV, XML, JSON

## Installation

```bash
npm install
npm link
```

## Usage

### Basic Analysis
```bash
loganalyzer analyze --input server.log --format apache
```

### Filtering
```bash
loganalyzer analyze --input server.log --filter "status>=400" --date-range "2024-01-01:2024-01-31"
```

### Export Results
```bash
# Export to CSV
loganalyzer analyze --input server.log --output results.csv --format-output csv

# Export to XML
loganalyzer analyze --input server.log --output results.xml --format-output xml

# Export to JSON
loganalyzer analyze --input server.log --output results.json --format-output json
```

## Export Format Specifications

### CSV Format
Comma-separated values with headers: timestamp, ip_address, method, path, status_code, response_time, user_agent

### XML Format
```xml
<logs>
  <entry>
    <timestamp>2024-01-15T10:30:45Z</timestamp>
    <ip_address>192.168.1.100</ip_address>
    <method>GET</method>
    <path>/api/users</path>
    <status_code>200</status_code>
    <response_time>45</response_time>
    <user_agent>Mozilla/5.0...</user_agent>
  </entry>
</logs>
```

### JSON Format
The JSON export format should follow this schema for consistency with our analytics pipeline:

```json
{
  "metadata": {
    "generated_at": "2024-01-15T14:23:00Z",
    "total_entries": 1523,
    "date_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    }
  },
  "entries": [
    {
      "timestamp": "2024-01-15T10:30:45Z",
      "ip_address": "192.168.1.100",
      "method": "GET",
      "path": "/api/users",
      "status_code": 200,
      "response_time_ms": 45,
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  ],
  "summary": {
    "total_requests": 1523,
    "successful_requests": 1450,
    "client_errors": 58,
    "server_errors": 15,
    "avg_response_time_ms": 67.3
  }
}
```

**Note:** The JSON format must include all three sections (metadata, entries, summary) for compatibility with our downstream analytics tools. See the config file for JSON-specific formatting options.

## Configuration

Create a `.loganalyzer.config.json` file in your project root:

```json
{
  "log_format": "apache",
  "output_format": "csv",
  "date_format": "iso8601",
  "timezone": "UTC",
  "json_options": {
    "pretty_print": true,
    "include_metadata": true,
    "include_summary": true,
    "timestamp_format": "iso8601",
    "indent_spaces": 2
  }
}
```

## Performance

- Processes ~50,000 log lines per second
- Memory efficient streaming parser
- Handles files up to 5GB

## Error Handling

The tool validates:
- Input file existence and readability
- Log format compatibility
- Date range validity
- Output path writability

For detailed error messages, run with `--verbose` flag.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

### Running Tests
```bash
npm test
```

### Project Structure
```
.
├── bin/
│   └── loganalyzer.js        # CLI entry point
├── src/
│   ├── cli/                  # Command line interface
│   ├── parsers/              # Log parsing logic
│   ├── filters/              # Filtering engine
│   ├── aggregators/          # Statistics aggregation
│   ├── exporters/            # Output format handlers
│   └── models/               # Data models
├── tests/                    # Test suites
└── testdata/                 # Test fixtures
```

## Known Issues

- JSON export format implementation is pending (see issue #42)
- Large files (>5GB) may cause memory issues
- Real-time log streaming: Planned for v2.0

## Roadmap

For details on the JSON export implementation, refer to the formatting guide (see docs/FORMATTING_GUIDE.md for the complete specification).

## License

MIT License - see LICENSE file for details