class LogAggregator {
  constructor(config = {}) {
    this.config = config;
  }

  aggregate(entries) {
    const responseTimes = entries.map(e => e.response_time).filter(rt => rt > 0);
    responseTimes.sort((a, b) => a - b);

    const total = entries.length;
    const successful = entries.filter(e => e.isSuccess()).length;
    const clientErrors = entries.filter(e => e.isClientError()).length;
    const serverErrors = entries.filter(e => e.isServerError()).length;

    return {
      total_requests: total,
      successful_requests: successful,
      client_errors: clientErrors,
      server_errors: serverErrors,
      avg_response_time_ms: this.average(responseTimes),
      min_response_time_ms: Math.min(...responseTimes) || 0,
      max_response_time_ms: Math.max(...responseTimes) || 0,
      p50_response_time_ms: this.percentile(responseTimes, 50),
      p95_response_time_ms: this.percentile(responseTimes, 95),
      p99_response_time_ms: this.percentile(responseTimes, 99),
      status_code_distribution: this.statusCodeDistribution(entries),
      method_distribution: this.methodDistribution(entries),
      top_paths: this.topPaths(entries, 10)
    };
  }

  average(values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  percentile(sortedValues, p) {
    if (sortedValues.length === 0) return 0;
    const index = Math.ceil((p / 100) * sortedValues.length) - 1;
    return sortedValues[Math.max(0, index)];
  }

  statusCodeDistribution(entries) {
    const dist = {};
    entries.forEach(entry => {
      const code = entry.status_code;
      dist[code] = (dist[code] || 0) + 1;
    });
    return dist;
  }

  methodDistribution(entries) {
    const dist = {};
    entries.forEach(entry => {
      const method = entry.method;
      dist[method] = (dist[method] || 0) + 1;
    });
    return dist;
  }

  topPaths(entries, limit) {
    const pathCounts = {};
    entries.forEach(entry => {
      const path = entry.path;
      pathCounts[path] = (pathCounts[path] || 0) + 1;
    });

    return Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([path, count]) => ({ path, count }));
  }
}

module.exports = LogAggregator;