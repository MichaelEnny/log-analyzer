const fs = require('fs');
const { XMLBuilder } = require('fast-xml-parser');

class XMLExporter {
  constructor(config = {}) {
    this.config = config;
    this.xmlOptions = config.xml_options || {
      root_element: 'logs',
      entry_element: 'entry',
      pretty_print: true,
      include_declaration: true
    };
  }

  async export(entries, stats, outputPath) {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: this.xmlOptions.pretty_print,
      indentBy: '  ',
      suppressEmptyNode: true
    });

    // Build XML structure following the config pattern
    const xmlData = {
      [this.xmlOptions.root_element]: {
        [this.xmlOptions.entry_element]: entries.map(entry => ({
          timestamp: entry.timestamp,
          ip_address: entry.ip_address,
          method: entry.method,
          path: entry.path,
          status_code: entry.status_code,
          response_time: entry.response_time,
          user_agent: entry.user_agent
        }))
      }
    };

    let xmlContent = builder.build(xmlData);

    // Add XML declaration if configured
    if (this.xmlOptions.include_declaration) {
      xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
    }

    fs.writeFileSync(outputPath, xmlContent, 'utf8');
  }
}

module.exports = XMLExporter;