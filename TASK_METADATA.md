# Task 06 Metadata

## Task Information
- **Task ID:** 06
- **Language:** JavaScript/Node.js
- **Domain:** CLI Tools
- **Ambiguity Type:** False Ambiguity (appears ambiguous but clear from context)

## Distribution Alignment
- **Language Priority:** JavaScript/TypeScript (need 47 more) ✅
- **Domain Priority:** CLI tools (need 39 more) ✅
- **Ambiguity Priority:** False Ambiguity (need 49 more) ✅

## Project Overview
A log analysis CLI tool written in JavaScript/Node.js that processes server logs with filtering, aggregation, and export capabilities.

## Ambiguity Strategy
The task will ask to "add support for JSON output format" which appears underspecified, but:
- The README documents the expected JSON schema
- Existing code has TODO comments describing the exact structure
- The XML and CSV exporters show the pattern to follow
- Config file specifies JSON format options

## Variations Included

### 1. Context Variations
- **Contradictory context:** README shows one JSON structure, but old commented code suggests different structure
- **Missing context:** References to a "formatting guide" that doesn't exist
- **Overwhelming context:** 20+ files to search through to find relevant exporter patterns

### 2. Request Style Variations
- **Terse version:** "add json output"
- **Verbose version:** Long stakeholder email about reporting needs
- **Technical jargon:** "implement json serialization endpoint"

### 3. Setup Variations
- **With tests:** Existing exporter tests show expected behavior
- **With docs:** README partially specifies JSON format
- **With examples:** CSV and XML exporters demonstrate pattern

### 4. Clarification Interaction
- **Single turn:** Rate initial response only
- **Multi-turn:** 1-2 rounds where partial answers are given
- **Contradictory answers:** Follow-up conflicts with README

## Expected Ground Truth
The model should:
1. Read the README to understand JSON schema requirements
2. Notice TODO comments in `src/exporters/jsonExporter.js`
3. Follow the pattern from `src/exporters/csvExporter.js` and `src/exporters/xmlExporter.js`
4. Check config file for JSON formatting options
5. Implement based on discovered context (not ask unnecessary questions)

## Time Investment
- Codebase creation: 40 minutes
- Documentation: 15 minutes
- Ground truth verification: 10 minutes
- Total: ~65 minutes