class LogEntry {
  constructor(data = {}) {
    this.timestamp = data.timestamp || null;
    this.ip_address = data.ip_address || data.ipAddress || null;
    this.method = data.method || null;
    this.path = data.path || null;
    this.status_code = data.status_code || data.statusCode || null;
    this.response_time = data.response_time || data.responseTime || 0;
    this.user_agent = data.user_agent || data.userAgent || null;
    this.referrer = data.referrer || null;
    this.bytes_sent = data.bytes_sent || data.bytesSent || 0;
  }

  isSuccess() {
    return this.status_code >= 200 && this.status_code < 300;
  }

  isClientError() {
    return this.status_code >= 400 && this.status_code < 500;
  }

  isServerError() {
    return this.status_code >= 500 && this.status_code < 600;
  }

  toObject() {
    return {
      timestamp: this.timestamp,
      ip_address: this.ip_address,
      method: this.method,
      path: this.path,
      status_code: this.status_code,
      response_time: this.response_time,
      user_agent: this.user_agent,
      referrer: this.referrer,
      bytes_sent: this.bytes_sent
    };
  }

  // For JSON export - response_time should be response_time_ms
  toJSON() {
    return {
      timestamp: this.timestamp,
      ip_address: this.ip_address,
      method: this.method,
      path: this.path,
      status_code: this.status_code,
      response_time_ms: this.response_time, // Note: JSON format uses _ms suffix
      user_agent: this.user_agent
    };
  }
}

module.exports = LogEntry;