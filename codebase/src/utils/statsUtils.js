class StatsUtils {
  static calculatePercentile(sortedValues, percentile) {
    if (sortedValues.length === 0) return 0;
    const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
    return sortedValues[Math.max(0, index)];
  }

  static calculateAverage(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  static calculateMedian(sortedValues) {
    if (sortedValues.length === 0) return 0;
    const mid = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    }
    return sortedValues[mid];
  }

  static calculateStdDev(values) {
    if (values.length === 0) return 0;
    const avg = this.calculateAverage(values);
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = this.calculateAverage(squareDiffs);
    return Math.sqrt(avgSquareDiff);
  }

  static findOutliers(values, threshold = 2) {
    const avg = this.calculateAverage(values);
    const stdDev = this.calculateStdDev(values);
    return values.filter(value => Math.abs(value - avg) > threshold * stdDev);
  }
}

module.exports = StatsUtils;