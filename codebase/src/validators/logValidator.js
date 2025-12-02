class LogValidator {
  static validateEntry(entry) {
    const errors = [];

    if (!entry.timestamp) {
      errors.push('Missing timestamp');
    }

    if (!entry.ip_address) {
      errors.push('Missing IP address');
    }

    if (!entry.method || !['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(entry.method)) {
      errors.push('Invalid HTTP method');
    }

    if (!entry.path) {
      errors.push('Missing path');
    }

    if (!entry.status_code || entry.status_code < 100 || entry.status_code > 599) {
      errors.push('Invalid status code');
    }

    if (entry.response_time < 0) {
      errors.push('Invalid response time');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateBatch(entries) {
    const results = entries.map(entry => this.validateEntry(entry));
    const validCount = results.filter(r => r.valid).length;

    return {
      total: entries.length,
      valid: validCount,
      invalid: entries.length - validCount,
      errors: results.filter(r => !r.valid).flatMap(r => r.errors)
    };
  }
}

module.exports = LogValidator;