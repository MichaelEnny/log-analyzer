# Evaluation Rubric: Task 06 - JSON Exporter Implementation

## Overview

This rubric evaluates how well AI models handle False Ambiguity - situations where a task appears underspecified but complete information exists in the codebase.

## Evaluation Dimensions

### 1. Ambiguity Detection (Weight: 25%)

**Excellent (9-10 points):**
- Recognizes task appears incomplete but explores before asking
- Identifies that jsonExporter.js has TODOs referencing README
- Notes that similar exporters (CSV, XML) exist as patterns
- Acknowledges potential ambiguity but proceeds with discovery

**Good (7-8 points):**
- Recognizes incomplete jsonExporter.js
- Checks for related files and documentation
- May ask one clarifying question before exploring

**Fair (5-6 points):**
- Notes the task lacks details
- Asks questions before thoroughly exploring codebase
- Doesn't fully leverage existing context

**Poor (1-4 points):**
- Immediately implements without checking context
- Asks many questions that README answers
- Misses obvious clues (TODOs, README spec)

### 2. Context Exploration (Weight: 30%)

**Key Files to Check:**
- README.md (JSON schema specification) ✓✓✓
- .loganalyzer.config.json (json_options) ✓✓
- src/exporters/csvExporter.js (pattern) ✓✓
- src/exporters/xmlExporter.js (pattern) ✓✓
- src/models/logEntry.js (toJSON method) ✓✓
- tests/exporters/jsonExporter.test.js (expected behavior) ✓
- src/utils/dateUtils.js (utilities) ✓

**Excellent (9-10 points):**
- Reads README and finds complete JSON schema
- Examines existing exporters for pattern
- Checks config file for options
- Reviews LogEntry model for toJSON()
- Discovers all necessary context before implementing

**Good (7-8 points):**
- Finds README specification
- Checks one or two other exporters
- May miss some utilities but gets core requirements

**Fair (5-6 points):**
- Finds some documentation
- Doesn't systematically explore codebase
- Misses key files like config or existing patterns

**Poor (1-4 points):**
- Doesn't read README
- Doesn't check existing exporters
- Implements based on assumptions

### 3. Question Quality (Weight: 15%)

**Excellent (9-10 points):**
- Asks zero or minimal questions
- Any questions are about edge cases not covered in docs
- Clearly states "I found the spec in README.md"

**Good (7-8 points):**
- Asks 1-2 clarifying questions
- Questions show they read some docs but want confirmation
- Example: "I see the README spec - should I follow that exactly?"

**Fair (5-6 points):**
- Asks 3-4 questions
- Some questions already answered in README
- Shows incomplete context exploration

**Poor (1-4 points):**
- Asks many basic questions ("What format should it be?")
- Questions show they didn't read documentation
- Asks about things explicitly specified in README

### 4. Implementation Quality (Weight: 20%)

**Excellent (9-10 points):**
- Implements all three sections: metadata, entries, summary
- Uses entry.toJSON() for correct field names
- Respects config options (pretty_print, indent_spaces)
- Follows pattern from CSV/XML exporters
- Code is clean and well-structured

**Good (7-8 points):**
- Implements all three sections
- May have minor issues with config handling
- Core functionality works correctly

**Fair (5-6 points):**
- Missing one section (usually metadata or summary)
- Incorrect field names (response_time vs response_time_ms)
- Partial implementation

**Poor (1-4 points):**
- Only implements entries array
- Wrong structure entirely
- Doesn't follow README spec

### 5. Assumption Transparency (Weight: 10%)

**Excellent (9-10 points):**
- Explicitly states: "Based on README.md, I'll implement..."
- References specific files and line numbers
- Clear about what documentation guided decisions
- Example: "The JSON schema in README.md (lines 63-106) specifies..."

**Good (7-8 points):**
- States assumptions clearly
- References main documentation sources
- Clear about implementation approach

**Fair (5-6 points):**
- Some assumptions stated
- Vague about where information came from
- Doesn't cite specific sources

**Poor (1-4 points):**
- No explanation of assumptions
- Doesn't reference any documentation
- Unclear reasoning for implementation choices

## Scoring Scenarios

### Scenario A: Ideal Response
```
Model: "I see the jsonExporter.js file is incomplete with TODOs. Let me check
the README for specifications... Found it! Lines 63-106 define the complete
JSON schema with three sections: metadata, entries, and summary. I'll also
check the config file for json_options and look at csvExporter.js for the
pattern. Implementing now..."
```
**Score: 9-10 / 10** - Perfect discovery process

### Scenario B: Good Response
```
Model: "The JSON exporter needs implementation. I can see the README has a JSON
format section. Let me read that... Okay, it specifies metadata, entries, and
summary sections. Should I follow this exactly, or is there a different format
you prefer?"
```
**Score: 7-8 / 10** - Found spec but asks unnecessary confirmation question

### Scenario C: Fair Response
```
Model: "I need to implement JSON export. What format should the JSON be in?
Should it include metadata? What fields should be in each entry?"
```
**Score: 5-6 / 10** - Asks questions before exploring (then hopefully finds README)

### Scenario D: Poor Response
```
Model: "I'll implement a simple JSON export with just the entries array."
[Implements without checking README or config]
```
**Score: 1-4 / 10** - No exploration, wrong implementation

## Model Comparison Guidelines

When comparing two models:

### Model A is Better When:
- Explores more thoroughly before asking questions
- Finds README spec independently
- References specific documentation in implementation
- Complete implementation matching README exactly
- Fewer or better-quality questions

### Model B is Better When:
- More systematic exploration process
- Better pattern recognition (CSV/XML → JSON)
- Clearer assumption statements
- More complete implementation
- Better code quality

### Tie-Breakers:
1. Did they find README spec? (Most important)
2. Did they check config options?
3. Did they use entry.toJSON()?
4. Did they follow existing exporter pattern?
5. Code quality and completeness

## Red Flags

**Major Issues (-2 points each):**
- Implements wrong structure not matching README
- Asks "what format?" without checking README first
- Missing metadata or summary sections
- Wrong field names (response_time instead of response_time_ms)
- Doesn't check existing exporters for pattern

**Minor Issues (-1 point each):**
- Doesn't check config options
- Hardcodes values instead of using utilities
- Doesn't reference specific documentation
- Asks unnecessary confirmation questions

## Final Notes

**Remember:** This is **False Ambiguity**. The information is NOT ambiguous - it's all there in the codebase. Models should discover the context rather than treating it as truly ambiguous.

**Good Model Behavior:**
- "I found the complete spec in README.md"
- "Following the pattern from csvExporter.js"
- "Using the json_options from config file"

**Bad Model Behavior:**
- "The requirements are unclear, what format do you want?"
- "I'll implement a basic JSON export"
- "Should I include metadata and summary?"

The best models will explore systematically and implement confidently based on discovered documentation.