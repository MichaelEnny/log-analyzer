const fs = require('fs');
const path = require('path');

class FileUtils {
  static ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
  }

  static isFileReadable(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  static isFileWritable(filePath) {
    const dirname = path.dirname(filePath);
    try {
      fs.accessSync(dirname, fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  static getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size / (1024 * 1024);
  }

  static readJSON(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  }

  static writeJSON(filePath, data, pretty = true) {
    const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

module.exports = FileUtils;